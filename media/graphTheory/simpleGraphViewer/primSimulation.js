// tenthsOfSec;

var simCouter = tenthsOfSec;
var chosenEdges = [];
var iteration = 0;
var simSpeed = 1;
var graphChanges = 1;
function initSimulation() {
    graphChanges = 0;
    iteration = 1;
    for (edge of edges) {
        edge.highlight = false;
    }
    let startEdge = floor(Math.random()*edges.length)
    selectedEdge = edges[startEdge];
    selectedEdge.highlight = true;
    chosenEdges.push(selectedEdge);


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

    // selectedEdge = edges[iteration]
    // if (joinTrees(selectedEdge.u,selectedEdge.v)) {
    //     selectedEdge.highlight = true;
    //     chosenEdges.push(selectedEdge);
    // }

    // console.log(gallerFischerForest)
    iteration += 1;
}