import React, { useState, useEffect } from 'react';
import doWhile from './data/doWhile.json';
import whileLoop from './data/whileLoop.json';
import ifElse from './data/ifElse.json';
import loop from './data/loop.json';
import InstructionViewer from './components/InstructionViewer';
import RegisterPanel from './components/RegisterPanel';
import ControlPanel from './components/ControlPanel';
import './styles/App.css';

const loopOptions = {
  'Do-While Loop': doWhile,
  'While Loop': whileLoop,
  'If-Else': ifElse,
  'Math Loop': loop
};

function App() {
  const [selectedLoop, setSelectedLoop] = useState('Do-While Loop');
  const [instructions, setInstructions] = useState(loopOptions[selectedLoop]);
  const [step, setStep] = useState(0);
  const [registers, setRegisters] = useState({
    r0: 0, r1: 0, r2: 0, r3: 0, r4: 0, r5: 0, r6: 0
  });
  const [history, setHistory] = useState([]);

  useEffect(() => {
    setInstructions(loopOptions[selectedLoop]);
    setStep(0);
    setRegisters({ r0: 0, r1: 0, r2: 0, r3: 0, r4: 0, r5: 0, r6: 0 });
    setHistory([]);
  }, [selectedLoop]);

  const stepForward = () => {
    if (step >= instructions.length) return;

    const inst = instructions[step];
    const newRegs = { ...registers };

    setHistory(prev => [...prev, { step, registers: { ...registers } }]);

    switch (inst.line) {
      // Do-While
      case 'mov r2, #0': newRegs.r2 = 0; break;
      case 'mov r3, #4': newRegs.r3 = 4; break;
      case 'add r2, r2, r3': newRegs.r2 += newRegs.r3; break;
      case 'sub r3, r3, #1': newRegs.r3 -= 1; break;
      case 'bne do_top':
        if (newRegs.r3 !== 0) {
          setStep(2);
          setRegisters(newRegs);
          return;
        }
        break;

      // While Loop
      case 'mov r4, #0': newRegs.r4 = 0; break;
      case 'mov r5, #1': newRegs.r5 = 1; break;
      case 'mov r6, #0': newRegs.r6 = 0; break;
      case 'cmp r4, #17': break;
      case 'bge done':
        if (newRegs.r4 > 17) return;
        break;
      case 'add r4, r4, r5': newRegs.r4 += newRegs.r5; break;
      case 'add r6, r6, #1': newRegs.r6 += 1; break;
      case 'bal test':
        setStep(3);
        setRegisters(newRegs);
        return;

      // If-Else
      case 'mov r0, #1': newRegs.r0 = 1; break;
      case 'mov r1, #2': newRegs.r1 = 2; break;
      case 'mov r2, #3': newRegs.r2 = 3; break;
      case 'cmp r0, r1': break;
      case 'bne else_part':
        if (newRegs.r0 !== newRegs.r1) {
          setStep(6);
          setRegisters(newRegs);
          return;
        }
        break;
      case 'mov r2, #1': newRegs.r2 = 1; break;
      case 'bal end_if':
        setStep(8);
        setRegisters(newRegs);
        return;

      // Math Loop 
      case 'sub r0, r5, #1': newRegs.r0 = newRegs.r5 - 1; break;
      case 'sub r1, r5, #7': newRegs.r1 = newRegs.r5 - 7; break;
      case 'mul r0, r0, r1': newRegs.r0 = newRegs.r0 * newRegs.r1; break;
      case 'mul r1, r5, r5': newRegs.r1 = newRegs.r5 * newRegs.r5; break;
      case 'sub r0, r0, r1': newRegs.r0 = newRegs.r0 - newRegs.r1; break;
      case 'mov r3, r0': newRegs.r3 = newRegs.r0; break;
      case 'add r5, r5, #1': newRegs.r5 += 1; break;
      case 'cmp r5, #10': break;
      case 'ble loop':
        if (newRegs.r5 <= 10) {
          setStep(1);
          setRegisters(newRegs);
          return;
        }
        break;

      default: break;
    }

    setRegisters(newRegs);
    setStep(step + 1);
  };

  const stepBackward = () => {
    if (history.length === 0) return;

    const previous = history[history.length - 1];
    setStep(previous.step);
    setRegisters(previous.registers);
    setHistory(history.slice(0, -1));
  };

  return (
    <div className="app">
      <h1>🧠 ARM Assembly Visualizer</h1>

      <div className="dropdown">
        <label htmlFor="loopSelect">Choose a loop: </label>
        <select
          id="loopSelect"
          value={selectedLoop}
          onChange={(e) => setSelectedLoop(e.target.value)}
        >
          {Object.keys(loopOptions).map((loopName) => (
            <option key={loopName} value={loopName}>
              {loopName}
            </option>
          ))}
        </select>
      </div>

      <div className="layout">
        <InstructionViewer instructions={instructions} current={step} />
        <RegisterPanel registers={registers} />
      </div>

      <ControlPanel stepForward={stepForward} stepBackward={stepBackward} />
    </div>
  );
}

export default App;
