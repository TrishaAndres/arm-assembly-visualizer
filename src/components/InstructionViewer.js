import React from 'react';

export default function InstructionViewer({ instructions, current }) {
  return (
    <div className="panel">
      <h3>Instructions</h3>
      <ol>
        {instructions.map((inst, idx) => (
          <li
            key={idx}
            style={{
              background: idx === current ? '#dbeafe' : 'transparent',
              fontWeight: idx === current ? 'bold' : 'normal'
            }}
          >
            {inst.line}
          </li>
        ))}
      </ol>
    </div>
  );
}
