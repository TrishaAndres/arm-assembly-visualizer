import React from 'react';

export default function ControlPanel({ stepForward, stepBackward }) {
    return (
      <div className="panel" style={{ textAlign: 'center' }}>
        <button onClick={stepBackward} style={{ marginRight: '10px' }}>⏮ Step Back</button>
        <button onClick={stepForward}>▶️ Step Forward</button>
      </div>
    );
  }
  