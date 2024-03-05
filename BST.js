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
        this.root = this.recursion(sortedArray, 0, sortedArray.length - 1)
        return this.root
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
                                console.log("entrou aqui");
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
}

const teste = new Tree([5,4,2,3,7,1,6]);
teste.insert(8);
teste.deletItem(6);
console.log(teste);
