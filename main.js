import { Tree } from "./bst-tools.js";

function getRandomTreeSize() {
  return Math.floor(Math.random() * (51 - 1) + 1);
}

function getRandomElement() {
  return Math.floor(Math.random() * 101);
}

function generateArray() {
  let treeSize = getRandomTreeSize();
  let counter = 0;
  let array = [];
  while (counter !== treeSize) {
    array.push(getRandomElement());
    counter++;
  }
  return array;
}

let sampleArray = generateArray();
console.log("-- GENERATING SAMPLE ARRAY --");
console.log(sampleArray);
let sampleTree = new Tree(sampleArray);

console.log("-- CHECKING IF TREE IS BALANCED --");
console.log(sampleTree.isBalanced());

let levelOrderArray = [];
let preOrderArray = [];
let inorderArray = [];
let postOrderArray = [];

console.log("-- Level Ordered --")
sampleTree.levelOrderForEach(node => levelOrderArray.push(node.data));
console.log(levelOrderArray);

console.log("-- Pre Ordered --")
sampleTree.preOrderForEach(node => preOrderArray.push(node.data))
console.log(preOrderArray);

console.log("-- Inordered --")
sampleTree.inOrderForEach(node => inorderArray.push(node.data))
console.log(inorderArray);

console.log("-- Post Ordered --")
sampleTree.postOrderForEach(node => postOrderArray.push(node.data))
console.log(postOrderArray);

sampleTree.insert(200);
sampleTree.insert(125);
sampleTree.insert(189);

console.log("-- UNBALANCING TREE.. --");
console.log(sampleTree.isBalanced());
sampleTree.rebalance();
console.log("-- RE-BALANCING TREE.. --");
console.log(sampleTree.isBalanced());

let newLevelOrderArray = [];
let newPreOrderArray = [];
let newInorderArray = [];
let newPostOrderArray = [];

console.log("-- Level Ordered: Rebalanced --")
sampleTree.levelOrderForEach(node => newLevelOrderArray.push(node.data));
console.log(newLevelOrderArray);4

console.log("-- Pre Ordered: Rebalanced --")
sampleTree.preOrderForEach(node => newPreOrderArray.push(node.data))
console.log(newPreOrderArray);

console.log("-- Inordered: Rebalanced --")
sampleTree.inOrderForEach(node => newInorderArray.push(node.data))
console.log(newInorderArray);

console.log("-- Post Ordered: Rebalanced --")
sampleTree.postOrderForEach(node => newPostOrderArray.push(node.data))
console.log(newPostOrderArray);

