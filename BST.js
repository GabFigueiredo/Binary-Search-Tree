// import {BreadthTraversal, DepthTraversal} from  "./Traversal.js"

class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

class Tree {
    constructor(array) {
        this.root = this.buildTree(array);
    }

    buildTree(array) {
        const sortedArray = array.sort((x,y) => x - y);
        this.root = this.recursion(sortedArray, 0, sortedArray.length - 1);
        return this.root;
    }

    recursion(array, start, end) {
        if(start > end) {
            return null;
        }

        const mid = Math.floor((start+end) / 2);

        const newNode = new Node(array[mid]);

        newNode.left = this.recursion(array, start, mid - 1);
        newNode.right = this.recursion(array, mid + 1, end);

        return newNode;
    }

    insert(value) {
        function troughArray(node, value) {

            const newNode = new Node(value);

            if (value < node.data) {
                if (node.left !== null) {
                    return troughArray(node.left, value);
                } else {
                    node.left = newNode;
                }

            } else if (value > node.data) {
                if(node.right !== null) {
                    return troughArray(node.right, value);
                } else {
                    node.right = newNode;
                }
            }
        }
        
        troughArray(this.root, value)
        return true;
    }

    deletItem(value) {
        const Father = this.findParent(value);
        const findValue = this.find(value);
        function recursiveDelet(node, value) {
            if (findValue) {
                if (!node) { // Base Case
                    return;
                }
                if(node.data === value) { 
                    if (!node.left && !node.right) { // Single Leaf Case
                        if (Father.left === node) {
                            Father.left = null;
                        } else {
                            Father.right = null;
                        }
                    }
                    
                    if ((node.right && !node.left) || (node.left && !node.right)) { // One Child Case
                        if(node.left) {
                            if (Father.left === node) {
                                Father.left = node.left;
                            } else {
                                Father.right = node.left;
                            }
                        } else {
                            if (Father.left === node) {
                                Father.left = node.right;
                            } else {
                                Father.right = node.right;
                            }
                        }
                    }
                    
                    if (node.right && node.left) { // Children case
                        const Son = node.right;
                        if (node.right.left) {
                            const GrandChild = node.right.left;
                            GrandChild.right = Son;
                            if (Father.left === node) {
                                Father.left = GrandChild;
                            } else {
                                Father.right = GrandChild;
                            }
                        } else {
                            if (Father.left === node) {
                                Son.left = node.left;
                                Father.left = Son;
                            } else {
                                Father.right = Son;
                            }
                        }
                    }

                } else {
                    return recursiveDelet(node.left, value), recursiveDelet(node.right, value);
                }
                 
            } else {
                return "Value not found";
            }        
            }
            return recursiveDelet(this.root, value);
        }

        findParent(value) {
            function parent(node, value) {
                if (!node) {
                    return null;
                }
                if ((node.left && node.left.data === value) || (node.right && node.right.data === value)) {
                    return node;
                }
                const parentInLeft = parent(node.left, value);
                const parentInRight = parent(node.right, value);

                return parentInLeft || parentInRight;
            }
            return parent(this.root, value);
        }

    find(value) {
        function findNode(node, value) {
            if(!node) {
                return;
            }

            if (node.data === value) {
                return node;
            }

            const leftSide = findNode(node.left, value);
            const rightSide = findNode(node.right, value);

            return leftSide || rightSide;
        }
        return findNode(this.root, value);
    }

    levelOrder(callback) {
        return callback;
    }
    
    DepthTraversal(callback) {
        return callback;
    }

    Height(value) {
        function recursiveHeight(node, value) {
            if (!node) {
                return;
            }
            
            if (node.data === value) {
                return 1
            }

            if ((node.left && !node.right) || (!node.left && node.right)) {
                if (node.left) {
                    let valueLeft = recursiveHeight(node.left, value);
                    return valueLeft + 1; 
                } else if (node.right) {
                    let valueLeft = recursiveHeight(node.right, value);
                    return valueLeft + 1; 
                }
            }

            if (node.left && node.right) {
                let leftValue = recursiveHeight(node.left, value);
                let rightValue = recursiveHeight(node.right, value);
                if (rightValue > leftValue) {
                    return rightValue + 1;
                } else if (leftValue > rightValue) {
                    return leftValue + 1;
                } else {
                    return rightValue + 1;
                }
            }
        }
        return recursiveHeight(this.root, value);
    }

    Depth(value) {
        return this.Height(value) - 1;
    }

    isBalanced() {
        function subtreeHeight(node) {
            if (!node) {
                return;
            }
            
            if (!node.left && !node.right) {
                return 1
            }

            if ((node.left && !node.right) || (!node.left && node.right)) {
                if (node.left) {
                    let valueLeft = subtreeHeight(node.left);
                    return valueLeft + 1; 
                } else if (node.right) {
                    let valueLeft = subtreeHeight(node.right);
                    return valueLeft + 1; 
                }
            }

            if (node.left && node.right) {
                let leftValue = subtreeHeight(node.left);
                let rightValue = subtreeHeight(node.right);
                if (rightValue > leftValue) {
                    return rightValue + 1;
                } else if (leftValue > rightValue) {
                    return leftValue + 1;
                } else {
                    return rightValue + 1;
                }
            }
        }

        const leftSide = subtreeHeight(this.root.left);
        const rightSide = subtreeHeight(this.root.right);
        
        if (leftSide > rightSide) {
            return (leftSide - rightSide) <= 1;
            
        } else if (rightSide > leftSide) {
            return (rightSide - leftSide) <= 1;
        } else {
            return false;
        }
    }

    rebalance() {
        function Depth(node, result = []) {
            if (!node) {
                return;
            }

            Depth(node.left, result);
            Depth(node.right, result);
            result.push(node.data);
            return result;
        }
        return this.buildTree(Depth(this.root));
    }    
}
