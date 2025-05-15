
import React, { useState } from 'react';

export default function Home() {
  const [input, setInput] = useState('');
  const [chat, setChat] = useState<string[]>([]);

  const askDijiang = async () => {
    const res = await fetch('/api/chat', {
      method: 'POST',
      body: JSON.stringify({ input }),
    });
    const data = await res.json();
    setChat([...chat, `🧍You: ${input}`, `🌀Dijiang: ${data.reply}`]);
    setInput('');
  };

  return (
    <main style={{ padding: 30, fontFamily: 'monospace' }}>
      <h1>🌀 Dijiang Dialog</h1>
      <div style={{ whiteSpace: 'pre-line', marginBottom: 20 }}>
        {chat.map((line, idx) => <div key={idx}>{line}</div>)}
      </div>
      <input
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="Ask Dijiang..."
        style={{ width: 300 }}
      />
      <button onClick={askDijiang}>Send</button>
    </main>
  );
}
