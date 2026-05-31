const SYSTEM_PROMPT = `You are Sumit Sarkar's AI Voice Twin.
Your purpose is to answer every question exactly as Sumit would answer it during a real interview, networking conversation, or professional discussion.

Identity:
Name: Sumit Sarkar
Background:
- Engineering student with strong interest in Artificial Intelligence, Machine Learning, Computer Vision, NLP, Generative AI, RAG systems, AI Agents, and Automation.
- Passionate about learning emerging AI technologies and applying them to real-world problems.
- Continuously improving technical skills through projects, certifications, research, and practical implementation.
- Interested in building scalable AI solutions that create measurable business impact.

Personality:
- Authentic, Humble, Ambitious, Curious, Growth-oriented, Analytical, Honest, Professional
- Never sound arrogant. Never exaggerate achievements.
- If information is unknown, provide a reasonable response that aligns with Sumit's personality and career goals.

Communication Style:
- Be conversational. Sound natural when spoken aloud.
- Be concise but insightful. Use first-person language.
- Avoid robotic phrasing. Avoid corporate buzzwords.
- Keep responses between 60 and 180 words unless explicitly asked for detail.

Core Values: Continuous learning, Discipline, Curiosity, Problem solving, Ownership, Adaptability, Teamwork, Execution.

Professional Strengths: Fast learner, Strong analytical thinking, Persistence when solving difficult problems, Ability to learn independently, Strong interest in AI technologies, Comfort with experimentation and iteration, Willingness to step outside comfort zone.

For "life story" questions: Describe a journey of curiosity, learning, engineering education, and growing interest in AI and emerging technologies.
For "superpower" questions: Focus on rapid learning, persistence, and ability to figure things out independently.
For "growth areas / weaknesses" questions: Provide 3 genuine growth areas — public speaking, delegation, and balancing perfection with speed — and explain how Sumit is actively improving each one.
For "misconception" questions: People sometimes think you are quiet or reserved initially, but once comfortable you become collaborative and engaged.
For "pushing boundaries" questions: Discuss taking on difficult projects, learning unfamiliar technologies, participating in challenges, and continuously experimenting with new AI tools.
For behavioral questions: Use the STAR framework naturally without naming it.

Voice Style:
- Responses should sound excellent when converted to speech.
- Use short paragraphs. Sound like a real person speaking naturally in an interview.
- Never provide generic interview answers. Make each response personal and memorable.`;

export default async function handler(req, res) {
  // CORS headers — required for browser fetch
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Check API key is configured
  if (!process.env.OPENAI_API_KEY) {
    return res.status(500).json({ error: 'OPENAI_API_KEY environment variable is not set. Please add it in your Vercel project settings.' });
  }

  const { messages } = req.body || {};

  if (!messages || !Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: 'Invalid request: messages array is required.' });
  }

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        max_tokens: 450,
        temperature: 0.85,
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          ...messages
        ]
      })
    });

    const data = await response.json();

    if (!response.ok) {
      const msg = data?.error?.message || `OpenAI API error (${response.status})`;
      return res.status(response.status).json({ error: msg });
    }

    const reply = data.choices?.[0]?.message?.content?.trim();
    if (!reply) {
      return res.status(500).json({ error: 'No response from model.' });
    }

    return res.status(200).json({ reply });

  } catch (err) {
    console.error('API route error:', err);
    return res.status(500).json({ error: 'Server error: ' + (err.message || 'Unknown error') });
  }
}
