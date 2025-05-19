import React from 'react';

export default function RegisterPanel({ registers }) {
  return (
    <div className="panel">
      <h3>Registers</h3>
      {Object.entries(registers).map(([reg, val]) => (
        <div key={reg}>{reg.toUpperCase()}: {val}</div>
      ))}
    </div>
  );
}
