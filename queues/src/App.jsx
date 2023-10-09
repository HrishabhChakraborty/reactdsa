import React, { useState } from 'react';

class Queue {
    constructor() {
        this.items = [];
        this.length = 0;
    }

    enqueue(item) {
        this.items[this.length] = item;
        this.length++;
    }

    dequeue() {
        if (this.isEmpty()) return null;
        const dequeued = this.items[0];
        for (let i = 0; i < this.length - 1; i++) {
            this.items[i] = this.items[i + 1];
        }
        this.length--;
        return dequeued;
    }

    front() {
        return this.isEmpty() ? null : this.items[0];
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
    const [queue, setQueue] = useState(new Queue());
    const [inputValue, setInputValue] = useState('');

    const handleEnqueue = () => {
        if (!inputValue.trim()) return; // Return immediately if inputValue is empty or whitespace
        const newQueue = new Queue();
        Object.assign(newQueue, queue);
        newQueue.enqueue(inputValue);
        setQueue(newQueue);
        setInputValue('');
    };

    const handleDequeue = () => {
        const newQueue = new Queue();
        Object.assign(newQueue, queue);
        newQueue.dequeue();
        setQueue(newQueue);
    };

    return (
        <div>
            <div>
                <input 
                    type="text" 
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                />
                <button onClick={handleEnqueue} disabled={!inputValue.trim()}>Enqueue</button> {/* Disable button if inputValue is empty or whitespace */}
                <button onClick={handleDequeue} disabled={queue.isEmpty()}>Dequeue</button>
                <div>Front of Queue: {queue.front()}</div>
            </div>
            <div style={{ display: 'flex', marginTop: '20px' }}>
                {queue.toArray().map((item, index) => (
                    <div key={index} style={{ border: '1px solid black', padding: '10px', marginRight: '10px' }}>
                        {item}
                    </div>
                ))}
            </div>
        </div>
    );
}


export default App;
