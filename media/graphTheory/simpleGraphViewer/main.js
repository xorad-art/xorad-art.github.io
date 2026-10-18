// Graph Editor V1
// Xorad 2026/10

DRAWING_SCALE = 1.0;
RESIZING_SCALE = 1.0;
EDGE_COLOR = null;

ENABLE_SIMULATION = true;

var selectedNode = null;
var draggingNode = null;
var selectedEdge = null;
var draggingEdge = null;
var dragOffset = {x:0,y:0};
var initialMousePos = {x:0,y:0};
var nextNodeId = null;
var simulationRunning = false;
var physicsRunning = true;

var tenthsOfSec = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  nextNodeId = nodes.length;
  for (node of nodes) {
    node.vx = 0;
    node.vy = 0;
  }
  for (edge of edges) {
    edge.highlight = false;
  }
  setInterval(() => tenthsOfSec++,100);

  if (EDGE_COLOR) {
    EDGE_COLOR = color(EDGE_COLOR.r, EDGE_COLOR.g, EDGE_COLOR.b);
  } else if (!ENABLE_SIMULATION) {
    EDGE_COLOR = color(188, 189, 208); // text-color;
  } else {
    EDGE_COLOR = color(53, 58, 74); // bg-light-color but higher value;
  }
  
  
  if (ENABLE_SIMULATION && ENABLE_PHYSICS) {
    playButton = createButton("▶ Run");
    playButton.position(15, 15);
    playButton.mousePressed(toggleSimulation);
    pinButton = createButton("Pin");
    pinButton.position(15, 45);
    pinButton.mousePressed(togglePhysicsSimulation);
  } else if (ENABLE_SIMULATION) {
    playButton = createButton("▶ Run");
    playButton.position(15, 15);
    playButton.mousePressed(toggleSimulation);
  } else if (ENABLE_PHYSICS) {
    pinButton = createButton("Pin");
    pinButton.position(15, 15);
    pinButton.mousePressed(togglePhysicsSimulation);
  }
}

function draw() {
  background(22, 25, 35); // bg-color

  if (ENABLE_PHYSICS && physicsRunning) {
    runPhysicsSimulation();
  }
  if (simulationRunning) {
    runSimulationStep();
  }
  
  const center = getGraphCenter();
  push();
  // Translate to the final viewing position
  translate(
    width / 2 ,
    height / 2
  );
  scale(DRAWING_SCALE * RESIZING_SCALE);
  translate(-center.x, -center.y);

  drawEdges();
  drawNodes();
  pop();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  if (windowWidth < 900) {
    RESIZING_SCALE = max(windowWidth/900, 0.25)
  }
}

function getGraphCenter() {
  if (nodes.length === 0) {
    return { x: 0, y: 0 };
  }

  let minX = Infinity;
  let maxX = -Infinity;
  let minY = Infinity;
  let maxY = -Infinity;

  for (const node of nodes) {
    minX = Math.min(minX, node.x);
    maxX = Math.max(maxX, node.x);
    minY = Math.min(minY, node.y);
    maxY = Math.max(maxY, node.y);
  }

  return {
    x: (minX + maxX) / 2,
    y: (minY + maxY) / 2
  };
}

function screenToGraph(x, y) {
  const center = getGraphCenter();

  return {
    x: (x - width / 2) / (DRAWING_SCALE * RESIZING_SCALE) + center.x,
    y: (y - height / 2) / (DRAWING_SCALE * RESIZING_SCALE) + center.y
  };
}

function graphToScreen(x, y) {
  const center = getGraphCenter();

  return {
    x: ((x - center.x) * (DRAWING_SCALE * RESIZING_SCALE)) + width / 2,
    y: ((y - center.y) * (DRAWING_SCALE * RESIZING_SCALE)) + height / 2
  };
}

WRITE_WEIGHTS = false;
function drawEdges() {
  for (const edge of edges) {
    var u = getNode(edge.u);
    var v = getNode(edge.v);

    var thickness = 2;
    if (WRITE_WEIGHTS) {
      thickness = pow(edge.weight,0.7)
    }
    if (edge === selectedEdge) {
      stroke(255, 221, 85); // accent-color
      strokeWeight(thickness + 3);
    } else if (edge.highlight) {
      stroke(100,255,128);
      strokeWeight(thickness + 2);
    } else {
      // stroke(188, 189, 208); // text-color
      stroke(EDGE_COLOR);
      strokeWeight(thickness + 1);
    }

    line(
      u.x,
      u.y,
      v.x,
      v.y
    );

    if (WRITE_WEIGHTS) {
      const x = (u.x + v.x) / 2;
      const y = (u.y + v.y) / 2;
      const slope = round(atan(-(v.y-u.y)/(v.x-u.x)),2)
  
      noStroke();
      fill(255);
      textSize(14);
      textAlign(CENTER, CENTER);
      displacement = createVector(0,15+thickness/2).rotate(-slope)
      text(edge.weight, x-displacement.x, y-displacement.y);
    }
    
  }
}

function drawNodes() {
  const CIRCLE_RADIUS = 40
  for (const node of nodes) {
    if (node === selectedNode) {
      stroke(255, 221, 85); // accent-color
      strokeWeight(4);
    } else {
      stroke(188, 189, 208); // text-color
      strokeWeight(2);
    }
    fill(42, 46, 59) // bg-color-light

    circle(
      node.x,
      node.y,
      CIRCLE_RADIUS
    );

    noStroke();

    fill(255);

    textAlign(CENTER, CENTER);
    textSize(15);

    text(
      node.id,
      node.x,
      node.y
    );
  }
}

function getNodeAtScreenPosition(x,y) {
  const MAX_DISTANCE = 22
  let closestNode = null;
  let closestNodeDistance = Infinity;

  for (const node of nodes) {
    const pos = graphToScreen(
      node.x,
      node.y
    );

    const d = dist(x,y,pos.x,pos.y);

    if (
      d < MAX_DISTANCE &&
      d < closestNodeDistance
    ) {
      closestNode = node;
      closestNodeDistance = d;
    }
  }
  
  return closestNode;
}

function getEdgeAtScreenPosition(x,y) {
  const MAX_DISTANCE = 22
  let closestEdge = null;
  let closestEdgeDistance = Infinity;

  for (const edge of edges) {
    const u = getNode(edge.u);
    const v = getNode(edge.v);
    const pu = graphToScreen(u.x, u.y);
    const pv = graphToScreen(v.x, v.y);

    const d = pointToSegmentDistance(x,y,pu.x,pu.y,pv.x,pv.y);

    if (
      d < MAX_DISTANCE &&
      d < closestEdgeDistance
    ) {
      closestEdge = edge;
      closestEdgeDistance = d;
    }
  }
  
  return closestEdge;
}

function pointToSegmentDistance(px,py,ax,ay,bx,by) {
  const dx = bx - ax;
  const dy = by - ay;

  const lengthSquared =
    dx * dx + dy * dy;

  if (lengthSquared === 0) {
    return dist(px, py, ax, ay);
  }

  let t =
    ((px - ax) * dx +
     (py - ay) * dy) /
    lengthSquared;

  t = constrain(t, 0, 1);

  const closestX = ax + t * dx;
  const closestY = ay + t * dy;

  return dist(
    px,
    py,
    closestX,
    closestY
  );
}