
ENABLE_PHYSICS = true;

const REPULSION = 1000;
const SPRING_STRENGTH = 0.003;
const SPRING_LENGTH = 150;
const DAMPING = 0.8;

function runPhysicsSimulation() {
  forces = []
  for (node of nodes) {
    forces.push({id:node.id, fx:0, fy:0})
  }
  // Node Repulsion
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i+1; j < nodes.length; j++){
      const u = nodes[i];
      const v = nodes[j];

      var dx = u.x - v.x;
      var dy = u.y - v.y;
      var distSqrd = pow(max(dx*dx + dy*dy,1),1);
      var d = sqrt(distSqrd);
      if (d > 200){continue}
      const force = REPULSION/ distSqrd;
      const fx = force * dx / d;
      const fy = force * dy / d;
      forces[i].fx += fx;
      forces[i].fy += fy;
      forces[j].fx -= fx;
      forces[j].fy -= fy;
    }
  }
  // Edge springs
  for (const edge of edges) {
    const u = getNode(edge.u);
    const uf = forces.find(node => node.id === edge.u);
    const v = getNode(edge.v);
    const vf = forces.find(node => node.id === edge.v);

    var dx = u.x - v.x;
    var dy = u.y - v.y;

    var d = max(sqrt(dx*dx + dy*dy),1);

    const displacement = d - SPRING_LENGTH;
    const force = (SPRING_STRENGTH * displacement);

    const fx = force * dx / d;
    const fy = force * dy / d;

    uf.fx -= fx;
    uf.fy -= fy;

    vf.fx += fx;
    vf.fy += fy;
  }

  // Integrate
  for (let i = 0; i < nodes.length; i++) {

    nodes[i].vx += forces[i].fx;
    nodes[i].vy += forces[i].fy;

    nodes[i].vx *= DAMPING;
    nodes[i].vy *= DAMPING;
    if ((nodes[i].vx * nodes[i].vx + nodes[i].vy * nodes[i].vy) < 0.03){
      continue
    }

    nodes[i].x = (nodes[i].x * 0.999) + nodes[i].vx;
    nodes[i].y = (nodes[i].y * 0.999) + nodes[i].vy;
  }
}