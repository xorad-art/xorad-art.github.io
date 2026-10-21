# Interactive Spanning Trees

> **2026/10/17** WORK IN PROGRESS

## How to connect a network

Graph theory is a beautiful part of math, over the last couple of days I've been making a tool with [p5.js](https://p5js.org/) to visualize graphs and some algorithms that I've been studying.

If you know the puzzle about the *sever bridges of Köninsberg*, let's set up a different question

> You are given some cities (**nodes**) and you want to connect them with the minimum amount of roads (**edges**)

If you try to solve the problem, you end up building a set of nodes and edges, that doesn't have any redundant paths, no cycles, that's called a **tree**. It can be reductive when in a city you need some redundancy if a road breaks down, but for small networks like wiring up internet in an appartment building, something like a tree graph is ideal.

We call a tree that connects all the nodes in a graph, a **spanning tree** (and uses the existing edges of the original graph, i.e. a subgraph of it)

---

With a mouse you can:
- **move** the selected nodes
- **delete** or **add** by *double clicking*

There's a physics simulation you can press that "relaxes" the graph.

<div style="position:relative;padding-bottom:56.25%;">
    <iframe
        style="width:100%;height:100%;position:absolute;left:0px;top:0px;"
        src="media/graphTheory/simpleGraphViewer/">
    </iframe>
</div>

For both of the algorithms that I want to go over we need *weighted graphs* so I needed to add more editable features to the graph viewer

---

## Kruskal's Algorithm

Press **Run**

<div style="position:relative;padding-bottom:56.25%;">
    <iframe
        style="width:100%;height:100%;position:absolute;left:0px;top:0px;"
        src="media/graphTheory/simpleGraphViewer/kruskal.html">
    </iframe>
</div>

[Kruskal's algorithm](https://en.wikipedia.org/wiki/Kruskal's_algorithm) starts with building a bunch of different trees (a forest), with the *cheapest* edges in the graph, as long as the new edge doesn't form a cycle, it gets added to the edges of our final spanning tree.

Checking for "not forming a cycle" is the interesting part of the algorithm, and the key is ~~using~~ making from scratch a [disjoint-set data structure](https://en.wikipedia.org/wiki/Kruskal's_algorithm)


### Galler-Fischer Trees

I had a good idea for optimizing checking whether or not two vertices are part of the same group, but I was outdone by [this 1964 paper](https://dl.acm.org/doi/10.1145/364099.364331 "An improved equivalence algorithm") I refused to look at the pseudocode until I had written my own version.


## Prim's Algorithm

I'm still working on visualizing Prim's algorithm so I'll update the article in due time.

<!-- <div style="position:relative;padding-bottom:56.25%;">
    <iframe
        style="width:100%;height:100%;position:absolute;left:0px;top:0px;"
        src="media/graphTheory/simpleGraphViewer/prim.html">
    </iframe>
</div> -->

> Xorad, 2026/10/21


