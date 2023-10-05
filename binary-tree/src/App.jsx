import React, { useState } from 'react';

// TreeNode class
class TreeNode {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

// BinaryTree class
class BinaryTree {
    constructor() {
        this.root = null;
    }

    insert(data) {
        const newNode = new TreeNode(data);
        if (!this.root) {
            this.root = newNode;
            return;
        }
        let current = this.root;
        while (true) {
            if (data < current.data) {
                if (!current.left) {
                    current.left = newNode;
                    return;
                }
                current = current.left;
            } else if (data > current.data) {
                if (!current.right) {
                    current.right = newNode;
                    return;
                }
                current = current.right;
            } else {
                // Assume duplicates are not allowed
                return;
            }
        }
    }

    delete(data) {
        this.root = this._deleteRecursive(this.root, data);
    }

    _deleteRecursive(root, data) {
        if (!root) return null;

        if (data < root.data) {
            root.left = this._deleteRecursive(root.left, data);
        } else if (data > root.data) {
            root.right = this._deleteRecursive(root.right, data);
        } else {
            if (!root.left && !root.right) {
                return null; // Removing the leaf node
            }
        }
        return root;
    }
}

// React components

const TreeNodeComponent = ({ node }) => {
    if (!node) return null;
    return (
        <div style={{ textAlign: 'center' }}>
            <div>{node.data}</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', maxWidth: '200px', margin: '0 auto' }}>
                <div>
                    {'/'}
              <TreeNodeComponent node={node.left} />
              </div>
                   
              <div>
              {'\\'}
                <TreeNodeComponent node={node.right} /> 
                </div>
            </div>
        </div>
    );
};

const BinaryTreeVisualizer = () => {
    const [tree, setTree] = useState(new BinaryTree());
    const [nodeValue, setNodeValue] = useState('');
    const [version, setVersion] = useState(0);

    const handleInsert = () => {
        tree.insert(nodeValue);
        setVersion(prevVersion => prevVersion + 1); // Increment version to trigger a re-render.
        setNodeValue('');
    };
    
    const handleDelete = () => {
        tree.delete(nodeValue);
        setVersion(prevVersion => prevVersion + 1); // Increment version to trigger a re-render.
        setNodeValue('');
    };
    
    

    return (
        <div>
            <div>
                <input 
                    type="text" 
                    value={nodeValue}
                    onChange={(e) => setNodeValue(e.target.value)}
                />
                <button onClick={handleInsert}>Insert Node</button>
                <button onClick={handleDelete}>Delete Node</button>
            </div>
            <TreeNodeComponent node={tree.root} />
        </div>
    );
}

export default BinaryTreeVisualizer;
