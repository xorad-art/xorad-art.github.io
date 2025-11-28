# Projective Geometry
## An Extension of Euclidean Space

**2025/11/24**

Projective Geometry is the study of geometric configurations under projective transformations, that is to say, the study of distributions of points, lines, conics and, planes when transformed by perspective or projections.

Projective transformations are vital in any picture of a 3d object drawn in a flat canvas. There's a lot of very powerful theorems that are very flexible because they are invariant over any perspective, no matter which angle you see the figure there are characteristics that are kept constant.

This has been a recent fixation of mine because it was the only [geometric algebra](https://en.wikipedia.org/wiki/Geometric_algebra), I could actually understand. I'm not getting into Lorentzian manifolds any time soon but, [I can draw](art/recent.md), projecting things into planes is my thing.

Also, this was originally done as a freshman's final presentation for Modern Geometry so I'd appreciate be given some slack

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

In the euclidean plane lines don't always intersect, this wonderful internal/external division theorem fails completely when $\frac{AR}{RB} = 1$ so in many cases:

> Parallel lines create exceptions

So, just for the sake of argument, let's say that lines are never parallel, let's forgo that limitation and declare that in the same way that *two points always determine a unique line* we will now say that *two lines always determine a unique point*

## The Projective Plane

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

---

## Perspectivities

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