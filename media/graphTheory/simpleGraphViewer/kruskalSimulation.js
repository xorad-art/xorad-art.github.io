// tenthsOfSec;

var simCouter = tenthsOfSec;
var chosenEdges = [];
var iteration = 0;
var simSpeed = 1;
var graphChanges = 1;

var gallerFischerForest = {};
function initSimulation() {
    graphChanges = 0;
    iteration = 0;
    edges.sort((a,b) => a.weight - b.weight); // Sort by weight
    gallerFischerForest = {}
    for (node of nodes) {
        // initialize the tree
        gallerFischerForest[node.id] = null;
    }
    selectedEdge = null;
    chosenEdges = [];
    for (edge of edges) {
        edge.highlight = false;
    }
}

function runSimulationStep() {
    // Speed of visualization
    if (simCouter === tenthsOfSec) {return;}
    simCouter = tenthsOfSec;
    if (simCouter % floor(10-min(simSpeed, 9)) !== 0) {return;}
    simSpeed += 0.1;


    if (graphChanges>0) {
        // Handle changes
        console.warn("Unimplemented handling changes in the graph");
        initSimulation();
    }

    if (chosenEdges.length == nodes.length - 1) {
        toggleSimulation();
        selectedEdge = null;
        return;
    }

    selectedEdge = edges[iteration]
    if (joinTrees(selectedEdge.u,selectedEdge.v)) {
        selectedEdge.highlight = true;
        chosenEdges.push(selectedEdge);
    }

    iteration += 1;
}


function joinTrees(uID,vID) {
    let uTree = findParentTree(uID)
    let vTree = findParentTree(vID)

    if (uTree !== vTree){
        if (uTree < vTree) {gallerFischerForest[vTree] = uTree;} 
        else {gallerFischerForest[uTree] = vTree;}
        return true;
    }
    return false;
}

function findParentTree(ID) {
    current = ID;
    nodeParent = gallerFischerForest[ID];
    chain = [];
    while (nodeParent !== null) {
        chain.push(current);
        current = nodeParent;
        nodeParent = gallerFischerForest[current];
    }
    for (nodeID of chain) {
        gallerFischerForest[nodeID] = current;
    }
    return current;
}