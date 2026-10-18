var nodes = [{"id":0,"x":0,"y":0}];
var edges = []

function getNode(id) {
  return nodes.find(node => node.id === id)
}

function getEdgesOfNode(id){
    return edges.filter(edge => edge.u == id || edge.v == id)
}

function getEdge(uID, vID) {
  return edges.find(edge =>
    (edge.u === uID && edge.v == vID) ||
    (edge.u === vID && edge.v == uID)
  );
}

function newNode(x,y) {
  return {id: nextNodeId++,x: round(x),y: round(y), vx:0,vy:0};
}

function newEdge(uID,vID) {
  return {u:uID,v:vID,weight:1,highlight:false};
}

function deleteNode(id) {
  nodes = nodes.filter(node => node.id !== id);
  edges = edges.filter(edge => edge.u !== id && edge.v !== id);
  selectedNode = null;
  draggingNode = null;
  selectedEdge = null;
  draggingEdge = null;
}

function printGraph() {
  var str = "nodes = [";
  for (node of nodes) {
    str += `{"id":${node.id},"x":${round(node.x)},"y":${round(node.y)}},`;
  }
  str += "];\n";
  str += "edges = [";
  for (edge of edges) {
    str += `{"u":${edge.u},"v":${edge.v},"weight":${edge.weight}},`;
  }
  str += "];";
  console.log(str);
}