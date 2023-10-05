import { useState } from 'react';

// Node class
class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}

// LinkedList class
class LinkedList {
    constructor() {
        this.head = null;
    }

    append(data) {
        const newNode = new Node(data);
        if (!this.head) {
            this.head = newNode;
            return;
        }
        let current = this.head;
        while (current.next) {
            current = current.next;
        }
        current.next = newNode;
    }

    toArray() {
        const arr = [];
        let current = this.head;
        while (current) {
            arr.push(current.data);
            current = current.next;
        }
        return arr;
    }

    delete(data) {
        if (!this.head) return;

        if (this.head.data === data) {
            this.head = this.head.next;
            return;
        }

        let current = this.head;
        while (current.next && current.next.data !== data) {
            current = current.next;
        }

        if (!current.next) return;

        current.next = current.next.next;
    }
}

const initialList = new LinkedList();

const ListNode = ({ value }) => (
    <div style={{ display: 'flex', alignItems: 'center' }}>
        <div style={{ border: '1px solid black', padding: '10px', marginRight: '10px' }}>
            {value}
        </div>
        <div style={{ marginRight: '10px' }}>-{'>'}</div>
    </div>
);

const LinkedListVisualizer = () => {
    const [list, setList] = useState(initialList);
    const [inputValue, setInputValue] = useState('');
    const [deleteValue, setDeleteValue] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        addNode();
    };

    const handleDelete = (e) => {
        e.preventDefault();
        deleteNode();
    };

    const addNode = () => {
        setList(prevList => {
            const updatedList = new LinkedList();
            const items = prevList.toArray();
            for (const item of items) {
                updatedList.append(item);
            }
            updatedList.append(inputValue);
            return updatedList;
        });
        setInputValue('');
    };

    const deleteNode = () => {
        setList(prevList => {
            const updatedList = new LinkedList();
            const items = prevList.toArray();
            for (const item of items) {
                updatedList.append(item);
            }
            updatedList.delete(deleteValue);
            return updatedList;
        });
        setDeleteValue('');
    };

    return (
        <div>
            <div>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Insert Node Value"
                    />
                    <button type="submit">Add Node</button>
                </form>
                <br/>
                <form onSubmit={handleDelete}>
                    <input
                        type="text"
                        value={deleteValue}
                        onChange={(e) => setDeleteValue(e.target.value)}
                        placeholder="Delete Node by Value"
                    />
                    <button type="submit">Delete Node</button>
                </form>
                <br/>
            </div>
            <div style={{ display: 'flex' }}>
                {list.toArray().map((value, index) => (
                    <ListNode key={index} value={value} />
                ))}
            </div>
        </div>
    );
}

export default LinkedListVisualizer;
