# Interactive Spanning Trees

> **2026/10/17** (Work in progress)

## How to connect a network

Graph theory is a beautiful part of math to look at, so I made a tool to visualize them and some algorithms that I've been studying.

> You are given some cities (**nodes**) and you want to connect them with the minimum amount of roads (**edges**)

If you try to solve the problem, you end up building a graph that doesn't have any redundant paths, no cycles, i.e. a **tree**. It's a bit reductive, but for small networks like wiring up internet in an appartment building, something like a tree is ideal.

We call a tree that connects all the nodes in a graph, a **spanning tree**

---

With a mouse you can move the selected nodes, delete or add by double clicking, and there's a physics simulation you can pause that "relaxes" the graph.

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

Kruskal's algorithm starts building a bunch of different trees (a forest), and as long as the new edge that gets added doesn't form a cycle, it gets added to the edges of our final spanning tree.

I'm still working on visualizing Prim's algorithm so I'll update the article in due time.

> Xorad, 2026/10/17
> 
<!-- ---

<div style="position:relative;padding-bottom:56.25%;">
    <iframe
        style="width:100%;height:100%;position:absolute;left:0px;top:0px;"
        src="media/graphTheory/simpleGraphViewer/prim.html">
    </iframe>
</div> -->
