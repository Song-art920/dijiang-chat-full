
import type { NextApiRequest, NextApiResponse } from 'next';
import { getPrompt } from '../../utils/prompt';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const body = JSON.parse(req.body);
  const messages = getPrompt(body.input);

  const completion = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages,
    }),
  });

  const result = await completion.json();
  res.status(200).json({ reply: result.choices[0].message.content });
}
