# Projective Geometry

**2025/11/29**

## An Extension of Euclidean Space

Projective Geometry is the study of *geometric configurations* under *projective transformations*, that is to say, the study of distributions of points, lines, and planes when transformed by perspective or projections. 

> That is basically every single 3D object shown on a screen.

![A 3D model with a camera](/media/projectiveGeoIntro/Opossum-blender.webp)

*Projective transformations* are vital to make any picture of a 3d object drawn in a flat canvas. Mathematically, there's a lot of powerful theorems that are very flexible because they work with any perspective, no matter which angle you see the figure there are characteristics that are kept constant, that are **invariant**.

This has been a recent fixation of mine because [projective geometric algebra](https://en.wikipedia.org/wiki/Plane-based_geometric_algebra) (not projective geometry, but a framework to use it) was the only type of [geometric algebra](https://en.wikipedia.org/wiki/Geometric_algebra), I could actually understand. I'm not getting into Lorentzian manifolds any time soon but, [I can draw](art/recent.md), projecting things into planes is *my* thing. Also, this was originally done as a freshman's final presentation for one of my classes so I'll try to be succinct.

## Ceva's Theorem and Menelaus' Theorem

Starting from a theorem that is extremely useful in Euclidean geometry, Ceva's Theorem states that for a triangle $\triangle ABC$, three cevians (line segments from a vertex to the opposite side) $AP$, $BQ$, $CR$ will be **concurrent** at a single point if and only if these ratios of [directed line segments](https://en.wikipedia.org/wiki/Line_segment#Directed_line_segment) multiply to $1$

$$\frac{AR}{RB} \cdot \frac{BP}{PC} \cdot \frac{CQ}{QA} = 1$$

This theorem will tell you whether 3 lines meet, giving relatively short proofs for the existence of the many notable points of a triangle like the [circumcenter](https://en.wikipedia.org/wiki/Circumcircle), [incenter](https://en.wikipedia.org/wiki/Incenter) or [orthocenter](https://en.wikipedia.org/wiki/Orthocenter), just based on where those lines intersect the opposite side of that same triangle.

Along with it, there's a very similar theorem that instead of concurrency talks about **collinearity**. Menelaus' Theorem that states that any transversal line of a triangle $\triangle ABC$ that crosses $BC$, $AC$, $AB$ at points $P$, $Q$, $S$ are collinear if and only if:

$$\frac{AS}{SB} \cdot \frac{BP}{PC} \cdot \frac{CQ}{QA} = -1$$

> Change the current slide using the **arrow keys** or by **swiping**
<div style="position:relative;padding-bottom:56.25%;">
    <iframe
        style="width:100%;height:100%;position:absolute;left:0px;top:0px;"
        frameborder="0"
        width="100%"
        height="100%"
        allow="autoplay"
        src="media/projectiveGeoIntro/Cevas-theorem.html">
    </iframe>
</div>

Given the particular configuration shown here, with a little algebra, most of the terms cancel out to see that if the point $R$ divides the segment $AB$ in the ratio $\frac{AR}{RB}$ the point $S$ divides $AB$ in $-\frac{AR}{RB}$:
$$\frac{AR}{RB}=-\frac{AS}{SB}$$

This construction, I know it by the name of "internal/external division" but I've also heard it as the construction for [harmonic conjugates](https://en.wikipedia.org/wiki/Projective_harmonic_conjugate), I will not go into detail about harmonic conjugates *yet* but the four points $(A,B;C,D)$ form a "harmonic range"

### Where this breaks down

In the euclidean plane lines don't always intersect, this wonderful internal/external division theorem fails completely when $\frac{AR}{RB} = 1$ ($R$ is the middle point), because it makes parallel lines:

> Feel free to skip this proof, this is only here because I forgot to animate it in the slide.
>
> From the internal-external division theorem we have $\frac{AR}{RB} = -\frac{AS}{SB}$, so given $\frac{AR}{RB} = 1$
>
> $\Rightarrow \frac{AS}{SB}=-1$
>
> $\Leftrightarrow AS=-SB$
>
> $\Leftrightarrow AS+SB=0$
>
> However $AS+SB=AB$, this would imply $AB=0$, which is impossible for distinct points $A$ and $B$, therefore no finite point $S$ satisfies $\frac{AS}{SB}=-1$.

Parallelism means there is no external division if $QP$ doesn't meet $AB$, so in this and many cases:

> **Parallel lines create exceptions**

That's part of the reasoning for making an addition to the Euclidean plane.

## The Projective Plane

So, just for the sake of argument, let's say that lines are never parallel, let's forgo that limitation and declare that in the same way that:

1. *Two distinct points always determine a unique line*.
2. *Two distinct lines always determine a unique point*.

We start treating points and lines in a more similar fashion which will turn out to be useful later.

This extra points made by meeting parallel lines makes us go from the Euclidean plane $\mathbb{R}^2$ with all the usual points and lines, to the Projective plane $\mathbb{P}^2$. The result of this extension is that all parallel lines that go in the same direction converge to the same point infinitely far away, and all the different directions go do infinitely many points at "infinity".

From there we can consider a new line, made by all of those points **the line at infinity**, it has a weird shape, topologically, all of the opposite pairs of points are connected.

<div style="position:relative;padding-bottom:56.25%;">
    <iframe
        style="width:100%;height:100%;position:absolute;left:0px;top:0px;"
        frameborder="0"
        width="100%"
        height="100%"
        allow="autoplay"
        src="media/projectiveGeoIntro/Proj-plane.html">
    </iframe>
</div>

This isn't really that much of a stretch, when we construct euclidean 3D space $\mathbb{R}^3$ we add an extra direction, and in a way, $\mathbb{R}^3$ and $\mathbb{P}^2$ are extremely similar, 

> They are both of dimension 3.

You can imagine the line at infinity like any other line, but as orthogonal to the other two directions. Inside the projective plane you can use [homogeneous coordinates](https://en.wikipedia.org/wiki/Homogeneous_coordinates) to represent points infinitely far away with finite coordinates, they are worth it's own article. But I want to keep things [synthetic](https://en.wikipedia.org/wiki/Synthetic_geometry), no coordinates for now, but if you ever came across projection matrices in 3D [like this one](https://learnopengl.com/Getting-Started/Camera) and wondered why are they 4x4 that's the reason:

<div>
$$
LookAt =
\begin{bmatrix}
R_x & R_y & R_z & 0 \\
U_x & U_y & U_z & 0 \\
D_x & D_y & D_z & 0 \\
0   & 0   & 0   & 1
\end{bmatrix}
*
\begin{bmatrix}
1 & 0 & 0 & -P_x \\
0 & 1 & 0 & -P_y \\
0 & 0 & 1 & -P_z \\
0 & 0 & 0 & 1
\end{bmatrix}
$$
</div>


They are using coordinates for a Projective Space, which needs an extra direction.

### Projective Spaces

The projective plane $\mathbb{P}^2$ is by no means the only one, [projective spaces](https://en.wikipedia.org/wiki/Projective_space) can be constructed in any dimension $n$. In general we could define any projective space like this one $\mathbb{P}^n$, with our line at infinity being a sphere of the dimension of that space, made out of pairs of [antipodal points](https://en.wikipedia.org/wiki/Antipodal_points). 

There's also finite projective spaces with a finite amount of points, or even spaces where [Desargues' Theorem](https://en.wikipedia.org/wiki/Desargues%27s_theorem) does not hold

## Perspectivities

Historically, the mathematical operations for perspective arose from a need to make drawings in a more *systematic* way. If you consider the origin of perspective your eye, or, the point from which a painting is viewed, you can draw lines from your eye to the objects in the scene to project them to the canvas.

Perspective in this context is very similar to that, we transform objects on one line to another line, or more specifically one subspace to another subspace.

<div style="position:relative;padding-bottom:56.25%;">
    <iframe
        style="width:100%;height:100%;position:absolute;left:0px;top:0px;"
        frameborder="0"
        width="100%"
        height="100%"
        allow="autoplay"
        src="media/projectiveGeoIntro/Perspective.html">
    </iframe>
</div>

### Invariants

Even if angles or distances get distorted and changed over a perspective, we can list a few things that are preserved

1. Incidence: If a point lays over a line, its projection also lays on the projected line

2. Collinearity: If multiple points are collinear, they will continue to be in their projection.

3. All conics are projectively equivalent, Circles, Ellipses, Parabolas, Hyperbolas, you can transform one into another through perspective.

4. Cross Ratio: $(A,B;C,D)=\frac{AC}{AD}\cdot\frac{BD}{BC}$ 

If this last one looks like the notation for a harmonic range, it's because it is. A harmonic range can be defined through the cross ratio when $(A,B;C,D)=-1$, and so, they keep that property over perspective.

It's not difficult to see that if we make perspectivities one after the other, the result is not another perspectivity, it's something that still preserves all of those invariants but we can't give it a single origin for the transformation. So we need a more general term.

## Projectivities

Projective transformations (also called projectivities or [homographies](https://en.wikipedia.org/wiki/Homography)) are the most general transformations of a projective space that preserve incidence.

### The Fundamental Theorem of Projective Geometry
Consists of three related properties of projective transformations

1. A projective [frame](https://en.wikipedia.org/wiki/Homography#Projective_frame_and_coordinates) determines a unique transformation.

> Once you decide what happens to a frame; a minimal configuration for a few points, everything else is forced.

2. All incidence-preserving maps are projective transformations.

> That means that our combined perspectivities one after the other, are projective transformations.

3. Every projective map can be built from perspectivities.

> You can make any projection from a finite number of perspectivities (in projective planes of dimension 2 or higher)

<div style="position:relative;padding-bottom:56.25%;">
    <iframe
        style="width:100%;height:100%;position:absolute;left:0px;top:0px;"
        frameborder="0"
        width="100%"
        height="100%"
        allow="autoplay"
        src="media/projectiveGeoIntro/Transforms.html">
    </iframe>
</div>

Projectivities are a generalization that includes:

- Translations
- Rotations
- Scalings
- Shears
- Projections
- Mappings that send finite points to infinity (and vice versa)

I could not use a drawing program that didn't have all of these (Though I can forgive not having mappings from my canvas to infinity). Projective transformations can warp shapes drastically, but they never break the fundamental incidence structure of the plane. Two lines still intersect — even if that intersection point ends up at infinity.

## Brianchon's Theorem and Pascal's Theorem

To exemplify one last thing, I want to go over another pair of related theorems

### Brianchon’s Theorem

Brianchon’s Theorem describes a hexagon circumscribed around a conic. If six lines are tangent to a conic and form a circumscribed hexagon, then the lines joining opposite vertices are **concurrent**.

Let the tangent hexagon have vertices $ABCDEF$. The diagonals from opposite vertices $AD$, $BE$, $CF$ meet at a single point.

<div style="position:relative;padding-bottom:56.25%;">
    <iframe
        style="width:100%;height:100%;position:absolute;left:0px;top:0px;"
        frameborder="0"
        width="100%"
        height="100%"
        allow="autoplay"
        src="media/projectiveGeoIntro/Pascals-theorem.html">
    </iframe>
</div>

### Pascal’s Theorem

Pascal's Theorem describes a hexagon inscribed in a conic. If six points lie on a conic and form a hexagon, then the three intersection points of opposite sides are **collinear**.

Given a hexagon $ABCDEF$ on a conic, $AE$ meets $BD$ at $P$, $BF$ meets $EC$ at $Q$, $CD$ meets $AF$ at $R$. Then $P$,$Q$,$R$ are collinear.

They are so similar, it's almost like you could exchange point for line and concurrency with collinearity, and the things is that **we can exchange concurrency with collinearity** and the theorem will still hold.

## Projective Duality

The fact that Ceva's and Menelaus' or Brianchon's and Pascal's look alike is not a coincidence. They are, in essence, the same theorem viewed through two complementary perspectives of projective space. Treating lines and points in such similar ways gives us the [projective duals](https://en.wikipedia.org/wiki/Duality_(projective_geometry)) for both configurations and theorems, by swapping:

- Point $\leftrightarrow$ Line

- Collinearity $\leftrightarrow$ Concurrency

- Join of two points $\leftrightarrow$ Intersection of two lines

We can transform a concurrency problem into a collinearity problem, a configuration of lines can be seen as the points that those lines intersect at. Ceva's and Menelaus' theorems are duals of each other, the same with Brianchon's and Pascal's. We can change our *perspective* of one problem using the dual of that configuration.

## Anyways, I think Projective Geometry is neat

It has a lot of uses, and I got a nice excuse to talk about it at school, here's a [link to the original standalone slides](https://xorad.me/media/projectiveGeoIntro/FullPresentation.html) if you want to see only my animations.

Everything was done using [manim](https://www.manim.community/) with [manim-slides](https://github.com/jeertmans/manim-slides) and a [blender](https://www.blender.org/) scene here and there. The [**source file**](https://github.com/xorad-art/xorad-art.github.io/blob/main/media/projectiveGeoIntro/slides-src.py "Github page for the file") for the animations if you want to take a look at it

### Further reading

There's a lot of wikipedia links already, but some books get really abstract quickly or feel really dated, so these two books are my recommendation:

- Shively, L. S. (1959). **An introduction to modern geometry**. J. Wiley & Sons. ([Here is a link](https://ia801203.us.archive.org/19/items/ShivelyGeometria/Shively%20Geometr%C3%ADa_text.pdf "Shively") to the spanish edition in the Internet Archive)

- Efimov, N. (1984). **Geometría superior**. Moscú: MIR. ([Another link](https://archive.org/details/efimov-geometria-superior-mir-1984/page/n5/mode/2up "Efimov") in spanish)

And that's it, I have deadlines for other things creeping up on me.

> Xorad, 2025/11/29