function mousePressed() {
  const graphPosition = screenToGraph(mouseX,mouseY);
  initialMousePos.x = graphPosition.x
  initialMousePos.y = graphPosition.y
  
  const newNode = getNodeAtScreenPosition(mouseX,mouseY);
  if (newNode){
    if (selectedNode && (selectedNode !== newNode)) {
      const edge = getEdge(selectedNode.id,newNode.id)
      if (edge) {
        selectedEdge = edge;
      } else {
        const newe = newEdge(selectedNode.id, newNode.id)
        edges.push(newe);
        selectedEdge = newe;
        draggingEdge = newe
        graphChanges += 1;
      }
      selectedNode = null;
      return false;
    }
    selectedNode = newNode;
    draggingNode = newNode;
    selectedEdge = null;
    graphChanges += 1;
    return false;
  }
  draggingNode = null;
  selectedNode = null;

  selectedEdge = getEdgeAtScreenPosition(mouseX,mouseY);
  if (selectedEdge) {
    draggingEdge = selectedEdge;
  }
  return false;
}

function mouseDragged() {
  if (!draggingNode && !draggingEdge) {
    return;
  }

  const position =
    screenToGraph(
      mouseX,
      mouseY
    );

  if (draggingNode) {
    draggingNode.x = round((initialMousePos.x + position.x*3)/4);
    draggingNode.y =round((initialMousePos.y + position.y*3)/4);
    return;
  }
  if (draggingEdge) {
    u = getNode(draggingEdge.u)
    v = getNode(draggingEdge.v)
    d = pointToSegmentDistance(position.x,position.y,u.x,u.y,v.x,v.y)
    draggingEdge.weight = round(pow((d)/10,2));
    graphChanges += 1;
  }

  return;
}
  
function mouseReleased() {
  draggingNode = null;
  draggingEdge = null;
}

function doubleClicked() {
  if (mouseX <60 && mouseY<70){
    return; // Don't want to handle double clicks on the UI corner
  }
  graphChanges += 1;
  const edge = getEdgeAtScreenPosition(mouseX,mouseY);
  const node = getNodeAtScreenPosition(mouseX,mouseY);
  if (edge && !node) {
    edges = edges.filter(e => e !== edge);
    selectedEdge = null;
    return;
  }
  if (node) {
    deleteNode(node.id)
    return;
  }
  
  const position =screenToGraph(mouseX,mouseY);

  const newn = newNode(position.x,position.y);
  nodes.push(newn);
  selectedNode = newn;

  return false;
}

function toggleSimulation() {
  simulationRunning = !simulationRunning;
  simSpeed = 1;
  if (simulationRunning) {
    playButton.html("⏸ Pause");
  } else {
    playButton.html("▶ Run");
  }
}

function togglePhysicsSimulation() {
  physicsRunning = !physicsRunning;
  if (physicsRunning) {
    pinButton.html("Pin");
  } else {
    pinButton.html("Unpin");
  }
}