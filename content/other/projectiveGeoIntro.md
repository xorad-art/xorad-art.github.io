# Projective Geometry

**2025/11/24**

## An Extension of Euclidean Space

Projective Geometry is the study of *geometric configurations* under *projective transformations*, that is to say, the study of distributions of points, lines, and planes when transformed by perspective or projections. 

> That is basically every single 3D object shown on a screen.

![A 3D model with a camera](/media/projectiveGeoIntro/Opossum-blender.webp)

*Projective transformations* are vital in any picture of a 3d object drawn in a flat canvas. Mathematically, there's a lot of powerful theorems that are very flexible because they work with any perspective, no matter which angle you see the figure there are characteristics that are kept constant, that are invariant.

This has been a recent fixation of mine because it was the only [geometric algebra](https://en.wikipedia.org/wiki/Geometric_algebra), I could actually understand. I'm not getting into Lorentzian manifolds any time soon but, [I can draw](art/recent.md), projecting things into planes is my thing. Also, this was originally done as a freshman's final presentation for one of my classes so I'd appreciate be given some slack.

<br><br>

## Ceva's Theorem and Menelaus' Theorem

Ceva's Theorem states that for a triangle $\triangle ABC$, three cevians (lines from any vertex that are not the sides) $AP$, $BQ$, $CR$ will be **concurrent** at a single point if and only if these ratios of [directed line segments](https://en.wikipedia.org/wiki/Line_segment#Directed_line_segment) multiply to $1$

$$\frac{AR}{RB} \cdot \frac{BP}{PC} \cdot \frac{CQ}{QA} = 1$$

This theorem will tell you whether 3 lines meet, gives relatively short proofs for the existence of the many notable points of a triangle like the [circumcenter](https://en.wikipedia.org/wiki/Circumcircle), [incenter](https://en.wikipedia.org/wiki/Incenter) or [orthocenter](https://en.wikipedia.org/wiki/Orthocenter), just based on where those lines intersect the opposite side of that same triangle.

Along with it, there's a very similar theorem that instead of concurrency talks about **collinearity**. Menelaus' theorem that states that any transversal line of a triangle $\triangle ABC$ that crosses $BC$, $AC$, $AB$ at points $P$, $Q$, $S$ are colinear if and only if:

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

This construction, I know it by the name of "internal/external division" but I've also heard it as the construction for [harmonic conjugates](https://en.wikipedia.org/wiki/Projective_harmonic_conjugate), I will not go into detail about harmonic conjugates yet but the four points $(A,B;C,D)$ form a "harmonic range"

### Where this breaks down

In the euclidean plane lines don't always intersect, this wonderful internal/external division theorem fails completely when $\frac{AR}{RB} = 1$, because it makes parallel lines, so in many cases:

> **Parallel lines create exceptions**

<br><br>

## The Projective Plane

So, just for the sake of argument, let's say that lines are never parallel, let's forgo that limitation and declare that in the same way that:

1. *two distinct points always determine a unique line* 

We will now, also say that:

2. *two distinct lines always determine a unique point*.

This extra points made by parallel lines makes us go from the Euclidean plane $\mathbb{R}^2$ with all the usual points and lines, to the Projective plane $\mathbb{P}^2$. The result of this extension is that all parallel lines that go in the same direction converge to the same point infinitely far away, and all the different directions go do infinitely many points at "infinity".

From there we can consider a new line, made by all of those points **the line at infinity**, it has a weird shape, topologically, all of the opposite pairs of points are connected. In general we could define any projective space like this one, with a sphere of the dimension of that space, made out of pairs of [opposite points](https://en.wikipedia.org/wiki/Antipodal_points)

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

This isn't really that much of a stretch, when we construct euclidean 3D space $\mathbb{R}^3$ we add an extra direction, and in a way, $\mathbb{R}^3$ and $\mathbb{P}^2$ are extremely similar, they are both of dimension 3.

You can imagine the line at infinity like any other line, but as orthogonal to the other two directions. Inside the projective plane you can use [homogeneous coordinates](https://en.wikipedia.org/wiki/Homogeneous_coordinates) to represent points infinitely far away with finite coordinates, they are worth it's own article,but if you ever came across projection matrices in 3D [like this one](https://learnopengl.com/Getting-Started/Camera) and wondered why are they 4x4 that's the reason:

$$LookAt = \begin{bmatrix} \color{red}{R_x} & \color{red}{R_y} & \color{red}{R_z} & 0 \\ \color{green}{U_x} & \color{green}{U_y} & \color{green}{U_z} & 0 \\ \color{blue}{D_x} & \color{blue}{D_y} & \color{blue}{D_z} & 0 \\ 0 & 0 & 0  & 1 \end{bmatrix} * \begin{bmatrix} 1 & 0 & 0 & -\color{purple}{P_x} \\ 0 & 1 & 0 & -\color{purple}{P_y} \\ 0 & 0 & 1 & -\color{purple}{P_z} \\ 0 & 0 & 0  & 1 \end{bmatrix}$$

This is using coordinates for a Projective Space.

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

---

## Projective Transforms in general

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

---

## Brianchon's Theorem and Pascal's Theorem

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


[Link to the original standalone slides](https://xorad.me/media/projectiveGeoIntro/FullPresentation.html)