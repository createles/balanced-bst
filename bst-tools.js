class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }


}

class Tree {
  constructor(array) {
    if (!array || array.length === 0) {
      this.root = null;
    } else {
      this.root = buildTree(array);
    } 
  }

  insert(value) {
    this.root = insertRecur(this.root, value);
  }

  deleteItem(value) {
    this.root = deleteRecur(this.root, value);
  }

  find(value) {
    let currentNode = this.root;

    // Loop until value is either found or not found
    while (currentNode !== null) {
      if (currentNode.data === value) {
        console.log(`Value ${value} found in tree.`);
        return currentNode;
      }

      if (value < currentNode.value) {
        currentNode = currentNode.left;
      } else {
        currentNode = currentNode.right;
      }
    }

    console.log(`Value ${value} not found in tree.`);
    return null;
  }

  levelOrderForEach(callback) {
    if (!callback) throw new Error("No callback function provided. Operation cancelled."); // throw error when missing callback fn
    if (this.root === null) return; // immediately return if null tree

    let q = []; // define array to hold queued items
    q.push(this.root); // add first node (root element)

    // while the queue is not empty,
    while (q.length !== 0) {
      const currentNode = q.shift(); // hold node, remove from queue

      callback(currentNode); // apply callback fn to node

      if (currentNode.left) { // if node has left child, add to queue
        q.push(currentNode.left);
      }
      
      if (currentNode.right) { // if node has right child, add to queue
        q.push(currentNode.right);
      }
    }
  }

  inOrderForEach(callback) {
    if (!callback) throw new Error("No callback function provided. Operation cancelled."); // throw error when missing callback fn

    inorderRecur(this.root, callback);
  }

  preOrderForEach(callback) {
    if (!callback) throw new Error("No callback function provided. Operation cancelled."); // throw error when missing callback fn

    preOrderRecur(this.root, callback);
  }

  postOrderForEach(callback) {
    if (!callback) throw new Error("No callback function provided. Operation cancelled."); // throw error when missing callback fn

    postOrderRecur(this.root, callback);
  }

  height(value) {
    let foundNode = this.find(value);

    if (foundNode === null) return null;

    return calculateHeight(foundNode);
  }

  depth(value) {
    return calculateDepth(this.root, value);
  }

  isBalanced() {
    if (this.root === null) return true;

    return checkBalanceRecur(this.root);
  }

  rebalance() {
    if (this.root === null) return null;

    // get new sorted array
    const sortedArray = rebalanceRecur(this.root);

    this.root = buildTree(sortedArray);
  }
}

function buildTree(array) {
  const workingArray = filterDupesAndSort(array);

  return arrayToBSTRecur(workingArray, 0, workingArray.length - 1);
}


function filterDupesAndSort(array) {
  const uniqueElements = new Set(array); // create a Set from array (removes duplicates)
  const sortedUniqueArray = Array.from(uniqueElements).sort((a, b) => a - b); // sort in ascending order

  return sortedUniqueArray;
}

/* Secondary option: filter() + indexOf()
function filterDupes(array) {
  return array.filter((item, index) => array.indexOf(item) === index); 
  
  // this filters out duplicates because indexOf only returns the index of the FIRST FOUND //
}

const unsortedUniqueArray = filterDupes(array);
const sortedUniqueArray = unsortedUniqueArray.sort((a,b) => a - b);
*/

function arrayToBSTRecur(arr, start, end) {
  if (start > end) return null; // if start is greater than end, 

  let mid = start + Math.floor((end - start) / 2); // find middle element
  let root = new Node(arr[mid]); // this is the root for this subtree

  // now, look for the left and right branches

  root.left = arrayToBSTRecur(arr, start, mid - 1); // same start (first element),
  // end is one element before root

  root.right = arrayToBSTRecur(arr, mid + 1, end);
  // start is one element ahead, end is last element
  
  return root;
}

function insertRecur(currentNode, value) {
  if (currentNode === null) return new Node(value); // checks if slot is empty and inserts new node if it is

  // if currentNode.data is the same as the insert value, just return the currentNode
  if (currentNode.data === value) {
    console.log(`Existing value ${value} found in the tree. Cancelling insertion.`)
    return currentNode;
  }

  // go left if lesser, right if greater
  if (value < currentNode.data) {
    currentNode.left = insertRecur(currentNode.left, value);
  } else {
    currentNode.right = insertRecur(currentNode.right, value);
  }

  return currentNode; // return currentNode to re-acquaint the tree links
}


function deleteRecur(currentNode, value) {
  // check if tree has nodes
  if (currentNode === null) {
    console.log(`Value ${value} not found in tree.`)
    return null;
  }

  if (value < currentNode.data) {
    currentNode.left = deleteRecur(currentNode.left, value);

  } else if (value > currentNode.data) {
    currentNode.right = deleteRecur(currentNode.right, value);

  // if value and currentNode.data match, determine case for deletion
  } else {
    if (currentNode.left === null && currentNode.right === null) { // node is a leaf node, return null
      console.log(`Value ${value} deleted from tree.`);
      return null;
    }

    // if node has 1 child, set replace the node with it's child node
    if (currentNode.left === null) {
      console.log(`Value ${value} deleted from tree.`);
      return currentNode.right;
    } else if (currentNode.right === null) {
      console.log(`Value ${value} deleted from tree.`);
      return currentNode.left;
    }

    // for nodes with 2 children, use
    // helper function to find inorder successor
    let successor = findSuccessor(currentNode.right);

    // replace the node's data with successors
    currentNode.data = successor.data;

    // find the original successor node, delete it by setting it to null recursively
    currentNode.right = deleteRecur(currentNode.right, successor.data);
  }

  return currentNode;
}

function findSuccessor(node) {
  while (node.left !== null) {
    node = node.left;
  }

  return node;
}

// (root) -> (left) -> (right) order
function preOrderRecur(currentNode, callback) {
  if (currentNode === null) return; // return if node is null

  callback(currentNode);
  preOrderRecur(currentNode.left, callback);
  preOrderRecur(currentNode.right, callback);
}

// (left) -> (root) -> (right) order
function inorderRecur(currentNode, callback) {
  if (currentNode === null) return;

  inorderRecur(currentNode.left, callback);
  callback(currentNode);
  inorderRecur(currentNode.right, callback);
}

// (left) -> (right) -> (root) order
function postOrderRecur(currentNode, callback) {
  if (currentNode === null) return;

  postOrderRecur(currentNode.left, callback);
  postOrderRecur(currentNode.right, callback);
  callback(currentNode);
}

function calculateHeight(currentNode) {
  if (currentNode === null) return -1; /* if a null node, set height for prev node
  to -1, so that calculation leads to 0 height for leaf nodes */

  const leftHeight = calculateHeight(currentNode.left) // get height of left branch
  const rightHeight = calculateHeight(currentNode.right) // get height of right branch
  return 1 + (Math.max(leftHeight, rightHeight)); /* add 1 to the total height of the longest
  branch and return it */
}

function calculateDepth(root, value) {
  let depth = 0;
  let currentNode = root;
  
  // loop until value is found or not found
  while (currentNode !== null) {
    if (currentNode.data === value) return depth; /* if found,
    return sum of depth */

    // if not found, take step down, increment depth
    if (value < currentNode.data) {
      currentNode = currentNode.left; // proceed left
    } else {
      currentNode = currentNode.right; // proceed right
    }
    depth++; // increment for every level of node until found
  }

  return null; // if we reach the end with no matches, return null
}

function checkBalanceRecur(currentNode) {
  if (currentNode === null) return true; // empty trees/nodes
  // are balanced

  const leftHeight = calculateHeight(currentNode.left)
  const rightHeight = calculateHeight(currentNode.right)

  // base case; not balanced
  if (Math.abs(leftHeight - rightHeight) > 1) return false;

  // if it is balanced, we checked the left and right subtrees
  return checkBalanceRecur(currentNode.left) 
  && checkBalanceRecur(currentNode.right);
}

function rebalanceRecur(currentNode) {
  if (currentNode === null) { // if node is null, return empty
    return [];                // array
  } 

  // Recursively get array values from left and right tree
  const leftArray = rebalanceRecur(currentNode.left);
  const rightArray = rebalanceRecur(currentNode.right);

  /* Use inorder traversal method (in this case lowest to highest)
  to efficiently populate the new array to be built
  (left-value (lowest) + center value (higher) + right-value (highest) */ 
  return leftArray.concat(currentNode.value, rightArray);

}
/* RECURSIVE approach to find(value)
 function findRecur(currentNode, value) {
   if (currentNode === null) {
     console.log(`Value ${value} not found in tree.`);
     return null;
   }

   if (value === currentNode.data) {
     return currentNode;
   }

   if (value < currentNode.data) {
     return findRecur(currentNode.left, value);
   } else {
     return findRecur(currentNode.right, value);
   }

 }
*/

/*
let sampleArr = [10, 11, 12, 11, 9, 6, 9];

const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  }
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
  }
};

prettyPrint(buildTree(sampleArr)); 
*/

export {Tree}