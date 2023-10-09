import React, { useState } from 'react';

class Stack {
  constructor() {
    this.items = [];
    this.length = 0;
  }

  Push(item) {
    this.items[this.length] = item;
    this.length++;
  }

  Pop() {
    if (this.isEmpty()) return null;
    const Popd = this.items[0];
    for (let i = this.length - 1; i > 0; i--) {
      this.items[i + 1] = this.items[i];
    }
    this.length--;
    return Popd;
  }

  top() {
    return this.isEmpty() ? null : this.items[this.length - 1];
  }

  isEmpty() {
    return this.length === 0;
  }

  toArray() {
    let result = [];
    for (let i = 0; i < this.length; i++) {
      result.push(this.items[i]);
    }
    return result;
  }
}

const App = () => {
  const [stack, setStack] = useState(new Stack());
  const [inputValue, setInputValue] = useState('');

  const handlePush = () => {
    if (!inputValue.trim()) return; // Return immediately if inputValue is empty or whitespace
    const newStack = new Stack();
    Object.assign(newStack, stack);
    newStack.Push(inputValue);
    setStack(newStack);
    setInputValue('');
  };

  const handlePop = () => {
    const newStack = new Stack();
    Object.assign(newStack, stack);
    newStack.Pop();
    setStack(newStack);
  };

  return (
    <div>
      <div>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button onClick={handlePush} disabled={!inputValue.trim()}>Push</button> {/* Disable button if inputValue is empty or whitespace */}
        <button onClick={handlePop} disabled={stack.isEmpty()}>Pop</button>
        <div>Top of Stack: {stack.top()}</div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column-reverse', marginTop: '20px' }}>
        {stack.toArray().map((item, index) => (
          <div key={index} style={{ border: '1px solid black', padding: '10px', marginBottom: '10px' }}>
            {item}
          </div>
        ))}
      </div>

    </div>
  );
}


export default App;
