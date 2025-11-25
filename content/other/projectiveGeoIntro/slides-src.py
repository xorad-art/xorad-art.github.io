from manim import *
from manim_slides import Slide, ThreeDSlide
from numpy.linalg import inv

## Render all slides:
## manim-slides render slides.py S0_Title S1_Ceva S2_The_Plane S3_Perspective S4_Transforms S5_Pascal S6_Link

# Colors matched to the website
BG_COLOR =        ManimColor("#161923")
BG_COLOR_LIGHT =  ManimColor("#2a2e3b")
PRIMARY_COLOR =   ManimColor("#bcbdd0")
SECONDARY_COLOR = ManimColor("#737480")
ACCENT_COLOR =    ManimColor("#ffdd55")


## Creates a hemisphere-looking plane made out of arcs
def plane_of_arcs(resolution = 5) -> list:
    y_arcs = [Arc(angle=TAU, color=SECONDARY_COLOR, stroke_width=1) for _ in range(resolution)]
    x_arcs = [Arc(angle=TAU, color=SECONDARY_COLOR, stroke_width=1) for _ in range(resolution)]
    for arc in zip(y_arcs,range(1, resolution+1)):
        arc[0].rotate(arc[1]*PI/float(resolution*2),axis=RIGHT)
    for arc in zip(x_arcs,range(1, resolution+1)):
        arc[0].rotate(arc[1]*PI/float(resolution*2),axis=UP)
    return y_arcs + x_arcs


class S0_Title(Slide):
    def construct(self):
        self.camera.background_color = BG_COLOR
        title = Tex("Projective Geometry", font_size=72)
        subtitle = Tex("An extension of Euclidean Space", font_size=36)
        subtitle.next_to(title, DOWN, buff=0.5)
        
        self.play(Write(title,smooth))
        self.play(FadeIn(subtitle))
        self.wait()
        
        self.next_slide()
        self.play(FadeOut(title), FadeOut(subtitle))


class S1_Ceva(Slide, MovingCameraScene):
    def construct(self):
        self.camera.background_color = BG_COLOR

        # ---------------------------------------------------------
        # Setting up the triangle
        # ---------------------------------------------------------

        A = np.array([-3, 0, 0])
        B = np.array([2.8, -1, 0])
        C = np.array([0, 2, 0])

        A_dot = Dot(A).set_z_index(10)
        B_dot = Dot(B).set_z_index(10)
        C_dot = Dot(C).set_z_index(10)

        A_label = Tex("A").next_to(A_dot, DOWN)
        B_label = Tex("B").next_to(B_dot, DOWN)
        C_label = Tex("C").next_to(C_dot, UP)

        AB = Line(A, B, color=PRIMARY_COLOR)
        BC = Line(B, C, color=PRIMARY_COLOR)
        CA = Line(C, A, color=PRIMARY_COLOR)

        self.play(FadeIn(A_dot), FadeIn(B_dot), FadeIn(C_dot))
        self.play(Create(AB), Create(BC), Create(CA))
        self.play(Write(A_label), Write(B_label), Write(C_label))
        self.next_slide()

        # ---------------------------------------------------------
        # Adding some cevians
        # ---------------------------------------------------------

        P = BC.point_from_proportion(0.4)
        Q = CA.point_from_proportion(0.3)
        R = AB.point_from_proportion(0.7)
        
        AP = Line(A, P, color=SECONDARY_COLOR)
        BQ = Line(B, Q, color=SECONDARY_COLOR)
        CR = Line(C, R, color=SECONDARY_COLOR)

        P_dot = Dot(P).set_z_index(10)
        Q_dot = Dot(Q).set_z_index(10)
        R_dot = Dot(R).set_z_index(10)

        P_label = Tex("P").next_to(P_dot, RIGHT)
        Q_label = Tex("Q").next_to(Q_dot, UL)
        R_label = Tex("R").next_to(R_dot, DOWN)

        self.play(Create(AP),Create(BQ),Create(CR))
        self.play(FadeIn(P_dot), FadeIn(Q_dot), FadeIn(R_dot))
        self.play(
            Write(P_label),
            Write(Q_label),
            Write(R_label)
        )
        self.next_slide()

        
        # ---------------------------------------------------------
        # Concurrency because of Ceva
        # ---------------------------------------------------------
        P_new = BC.point_from_proportion(0.33)
        Q_new = CA.point_from_proportion(0.5)
        R_new = AB.point_from_proportion(0.66)


        AP.add_updater(lambda m: m.become(Line(A, P_dot.get_center(), color=SECONDARY_COLOR)))
        BQ.add_updater(lambda m: m.become(Line(B, Q_dot.get_center(), color=SECONDARY_COLOR)))
        CR.add_updater(lambda m: m.become(Line(C, R_dot.get_center(), color=SECONDARY_COLOR)))

        ceva_eq = MathTex(
            r"\frac{AR}{RB} \cdot \frac{BP}{PC} \cdot \frac{CQ}{QA} = 1",
        ).to_edge(DOWN)

        self.play(
            P_dot.animate.move_to(P_new),
            Q_dot.animate.move_to(Q_new),
            R_dot.animate.move_to(R_new),
        )

        O = AP.point_from_proportion(0.745)
        O_dot = Dot(O)

        self.play(
            Write(ceva_eq),
            FadeIn(O_dot)
        )

        self.next_slide()

        # ---------------------------------------------------------
        # Menelaus Theorem
        # ---------------------------------------------------------

        QP_direction = P_new - Q_new
        S = P_new + 1.75 * QP_direction  # extend line beyond Q

        S_dot = Dot(S).set_z_index(10)
        S_label = Text("S").next_to(S_dot, UP)

        PQ_extended = Line(P_new - 3*QP_direction, S + 3*QP_direction, color=SECONDARY_COLOR)

        # AB_direction = B - A
        AB_extended = Line(B, S, color=SECONDARY_COLOR)
        menelaus_eq = MathTex(
            r"\frac{AS}{SB}\cdot \frac{BP}{PC}\cdot \frac{CQ}{QA} = -1"
        ).next_to(ceva_eq, RIGHT,buff=1.6)


        self.play(
            Create(PQ_extended),
            Create(AB_extended),
        )
        self.play(
            FadeIn(S_dot),
            Write(S_label),
            Write(menelaus_eq),
            self.camera.frame.animate.move_to(B),
            run_time = 2
        )
        self.next_slide()

        # ---------------------------------------------------------
        # Fade Out
        # ---------------------------------------------------------

        fade_rect = Rectangle(
            width=100,
            height=100,
            fill_color=BG_COLOR,
            fill_opacity=1,
            stroke_opacity=0
        ).set_z_index(1000)

        self.play(FadeIn(fade_rect, run_time=1.5))


class S2_The_Plane(ThreeDSlide):
    def construct(self):
        self.camera.background_color = BG_COLOR
        self.set_camera_orientation(
            focal_distance=500,
            zoom=15
        )

        arcs = plane_of_arcs(8)
        self.play(
            Create(VGroup(*arcs))
        )

        title = Tex(r"Euclidean Plane $\mathbb{R}^2$", font_size=36).to_corner(UL)
        self.add_fixed_in_frame_mobjects(title)
        self.play(
            Write(title)
        )
        self.next_slide()

        # ---------------------------------------------------------
        # Lines on the plane meet, always
        # ---------------------------------------------------------

        # Setup
        arc1 = Arc(angle=PI, color=BLUE).rotate(PI/2.0,axis=RIGHT,about_point=ORIGIN)
        arc1.rotate(-PI/6.0,axis=OUT,about_point=ORIGIN)
        arc2 = Arc(angle=PI, color=ACCENT_COLOR).rotate(PI/2.0,axis=RIGHT,about_point=ORIGIN)
        arc2.rotate(PI/4.0,axis=OUT,about_point=ORIGIN)

        self.play(
            Create(arc1),
            Create(arc2),
            run_time = 2.0
        )
        self.next_slide()
        self.play( # Level
            Rotate(arc1,PI/6.0,axis=OUT,about_point=ORIGIN),
            Rotate(arc2,-PI/4.0,axis=OUT,about_point=ORIGIN),
        )
        self.play( # Separate
            Rotate(arc1,PI/40.0,axis=RIGHT,about_point=ORIGIN),
            Rotate(arc2,-PI/38.0,axis=RIGHT,about_point=ORIGIN)
        )
        self.next_slide()
        self.play(
            FadeOut(title)
        )
        title2 = Tex(r"Projective Plane $\mathbb{P}^2$", font_size=36).to_corner(UL)
        self.add_fixed_in_frame_mobjects(title2)

        self.move_camera( # Zoom out
            focal_distance=100,
            zoom=3.5,
            run_time=3.0,
            added_anims=[Write(title2)]
        )

        inf_dot1 = Dot(RIGHT,radius=0.025)
        inf_dot2 = Dot(LEFT,radius=0.025)
        self.play(
            FadeIn(inf_dot1),
            FadeIn(inf_dot2)
        )

        self.next_slide()
    
        # ---------------------------------------------------------
        # Translation maintain the same point
        # ---------------------------------------------------------

        # Playing with translations
        self.play(
            Rotate(arc1,PI/7.0,axis=RIGHT,about_point=ORIGIN),
            Rotate(arc2,-PI/6.0,axis=RIGHT,about_point=ORIGIN),
            run_time = 3.0
        )
        self.play(
            Rotate(arc1,PI/6.0,axis=RIGHT,about_point=ORIGIN),
            Rotate(arc2,-PI/6.0,axis=RIGHT,about_point=ORIGIN)
        )
        self.play(
            Rotate(arc1,-PI/5.0,axis=RIGHT,about_point=ORIGIN),
            Rotate(arc2,PI/5.0,axis=RIGHT,about_point=ORIGIN),
            run_time = 1.8
        )
        self.next_slide()

        # ---------------------------------------------------------
        # Out with the points, in with the line at infinity
        # ---------------------------------------------------------
        self.play(
            FadeOut(inf_dot1),
            FadeOut(inf_dot2),
            run_time=0.5
        )
        self.play(
            Rotate(arc1,TAU/2.0,axis=IN,about_point=ORIGIN),
            Rotate(arc2,-TAU/5.0,axis=IN,about_point=ORIGIN),
            run_time=3
        )
        self.next_slide()

        arc_inf = Arc(start_angle=PI/2.5,angle=TAU, color=ACCENT_COLOR)
        self.play(
            Create(arc_inf),
            FadeOut(arc1),
            FadeOut(arc2),
            run_time=2
        )
        self.next_slide()

        # ---------------------------------------------------------
        # Antipolar points
        # ---------------------------------------------------------
        focus_dot = AnnotationDot(radius=0.025*1.3)
        focus_dot.move_to(RIGHT)
        self.play(Create(focus_dot))
        self.play(FadeIn(inf_dot1),FadeOut(focus_dot))
        focus_dot.move_to(LEFT)
        self.play(Create(focus_dot))
        self.next_slide()

        self.play(
            Rotate(inf_dot1, about_point=ORIGIN),
            Rotate(focus_dot, about_point=ORIGIN),
            run_time = 5.0
        )
        self.next_slide()

        fade_rect = Rectangle(
            width=100,
            height=100,
            fill_color=BG_COLOR,
            fill_opacity=1,
            stroke_opacity=0
        ).set_z_index(1000)

        self.play(FadeIn(fade_rect, run_time=1.5))


class S3_Perspective(ThreeDSlide):
    def construct(self):
        self.camera.background_color = BG_COLOR
        
        # Camera
        self.set_camera_orientation(
            focal_distance=9990.0
        )

        title = Tex(r"Perspectivities", font_size=44)\
                .to_edge(UP).set_z_index(10)
        self.add_fixed_in_frame_mobjects(title)
        self.play(Write(title), run_time=0.9)

        # ---------------------------------------------------------
        # The source square and the plane
        # ---------------------------------------------------------
        src_square = Square(side_length=3.5, color=BLUE, stroke_width=3)
        src_square.move_to(RIGHT*3)  # behind the projection plane
        src_square.rotate(PI/2.0, axis=RIGHT)
        src_square.rotate(PI/8, axis=UP)
        src_square.rotate(PI/3.5)

        # get the 4 vertices
        verts = [src_square.get_points()[i*4] for i in [0, 1, 2, 3]]
        direction = verts[0] - verts[2]
        src_line = Line(verts[0]+direction*2,verts[2]-direction*2,color=BLUE, stroke_width=2)


        plane = plane_of_arcs(16)
        plane_group = VGroup(*plane).scale(25)


        self.play(Create(plane_group), run_time=0.8)
        self.play(Create(src_line))
        self.next_slide()

        # ---------------------------------------------------------
        # A Point on the Left as an origin
        # ---------------------------------------------------------
        O = np.array([-1.5,0.5,0])
        O_dot = Dot3D(O).set_z_index(10)
        self.play(
            Create(src_square),
            Create(O_dot)
        )

        # make dots
        dots = VGroup(*[Dot3D(v, color=ACCENT_COLOR, radius=0.05) for v in verts])

        # animate
        self.play(Create(dots))

        # ---------------------------------------------------------
        # Label the points A, B, C, D and O
        # ---------------------------------------------------------

        labels = ["A", "B", "C", "D"]
        label_objs = VGroup()

        for v, name in zip(verts, labels):
            txt = Tex(name, font_size=36)
            txt.add_updater(lambda t, v=v: t.move_to(v + 0.45*DR))
            label_objs.add(txt)

        # Label O
        O_label = Tex("O", font_size=36)
        O_label.add_updater(lambda t: t.next_to(O_dot, UP, buff=0.2))

        self.add_fixed_orientation_mobjects(*label_objs, O_label)
        self.play(Write(O_label), *[Write(lbl) for lbl in label_objs])
        self.next_slide()

        # ---------------------------------------------------------
        # Draw perspective lines AO, BO, CO, DO
        # ---------------------------------------------------------
        lines = VGroup()
        for v in verts:
            dir = (O - v)*2
            line = Line(O+dir, v-dir, color=SECONDARY_COLOR, stroke_width=2)
            lines.add(line)

        self.play(*[Create(l) for l in lines], run_time=1.6)
        self.next_slide()

        # ---------------------------------------------------------
        # Add a plane to the left of O, and extend lines to it
        # ---------------------------------------------------------

        # Define the plane x = plane_x
        plane_x = O[0] - 3   # a few units left of O
        plane_normal = np.array([1, 0, 0])

        # A big visible plane patch
        left_plane = Rectangle(
            width=8,
            height=12,
            color=ACCENT_COLOR,
            stroke_width=2,
            fill_opacity=0.06
        )
        # Put rectangle so its plane is vertical (y-z plane)
        left_plane.rotate(PI/2, axis=UP)
        left_plane.move_to(np.array([plane_x, O[1], O[2]]))

        self.play(Create(left_plane), run_time=1.4)
        self.next_slide()

        # ---------------------------------------------------------
        # Compute intersection with the plane x = plane_x
        # ---------------------------------------------------------
        intersection_points = []
        intersection_dots = VGroup()

        for v in verts:
            P0 = O
            P1 = v
            D = P1 - P0  # direction

            # Solve for t where (P0 + t*D).x = plane_x
            if abs(D[0]) < 1e-6:
                continue  # skip degenerate case

            t = (plane_x - P0[0]) / D[0]
            I = P0 + t * D
            intersection_points.append(I)

            dot = Dot3D(I, color=ACCENT_COLOR, radius=0.07)
            intersection_dots.add(dot)

        self.play(Create(intersection_dots))
        self.next_slide()

        # ---------------------------------------------------------
        # Draw the polygon at the perspective points
        # ---------------------------------------------------------
        quad = Polygon(
            *intersection_points,
            color=ACCENT_COLOR
        ).set_z_index(9)

        self.play(Create(quad), run_time=1.6)

        labels2 = ["A'", "B'", "C'", "D'"]
        proj_labels = VGroup()

        for p, name in zip(intersection_points, labels2):
            t = Tex(name, font_size=36, color=PRIMARY_COLOR)
            t.add_updater(lambda t, p=p: t.move_to(p + 0.45*LEFT))
            proj_labels.add(t)

        self.add_fixed_orientation_mobjects(*proj_labels)
        self.play(*[Write(lbl) for lbl in proj_labels])

        self.next_slide()

        # ---------------------------------------------------------
        # Draw the polygon at the perspective points
        # ---------------------------------------------------------

        connecting_lines = VGroup()

        for v, I in zip(verts, intersection_points):
            line = Line(
                v,
                I,
                color=PRIMARY_COLOR
            ).set_z_index(5)
            connecting_lines.add(line)

        self.play(Create(connecting_lines),run_time=0.3)
        self.play(
            FadeOut(VGroup(src_line,plane_group,left_plane,lines)),
        )

        # ---------------------------------------------------------
        # Projective invariants — shown one per slide
        # ---------------------------------------------------------

        invariants = [
            Tex(
                r"\textbf{Incidence: } If a point lays over a line,"
                r"its projection also lays on the projected line,",
                font_size=30
            ),
            Tex(
                r"\textbf{Colinearity: } If multiple points are colinear, "
                r"they will continue to be in their projection.",
                font_size=30
            ),
            Tex(
                r"\textbf{Conics: } All conics"
                r"(Circle, Ellipse, Parabola, Hyperbola) "
                r"are projectively equivalent",
                font_size=30
            ),
            MathTex(
                r"\textbf{Cross Ratio: }",
                r"(A,B;C,D)=\frac{AC}{AD}\cdot\frac{BD}{BC}",
                font_size=30
            )
        ]

        # Position: bottom of screen, slight upward shift
        current = None
        for inv in invariants:
            inv.to_edge(DOWN).shift(UP * 0.3)
            if current is None:
                # first invariant appears
                self.add_fixed_in_frame_mobjects(inv)
                self.play(Write(inv), run_time=0.5)
            else:
                # fade previous and show next
                self.play(FadeOut(current), run_time=0.5)
                self.add_fixed_in_frame_mobjects(inv)
                self.play(Write(inv), run_time=0.5)

            current = inv
            self.next_slide()

        self.play(FadeOut(current), run_time=1.0)



        # ---------------------------------------------------------
        # Big reveal
        # ---------------------------------------------------------
        # Start ambient rotation (slow and smooth)
        self.move_camera(phi=75*DEGREES,run_time=2)

        # self.next_slide()

        self.begin_ambient_camera_rotation(rate=0.15)

        # Let it spin for a few seconds
        self.wait(6)

        self.stop_ambient_camera_rotation()
        self.next_slide()


class S4_Transforms(ThreeDSlide):
    def construct(self):
        self.camera.background_color = BG_COLOR
        self.set_camera_orientation(
            focal_distance=500,
            zoom=15
        )
        
        title = Tex(r"Projective Transformation", font_size=44).to_edge(UP).set_z_index(10)
        self.add_fixed_in_frame_mobjects(title)
        # subtitle.next_to(title, DOWN, buff=0.3)
        
        plane = plane_of_arcs(16)
        plane_group = VGroup(*plane)

        self.play(Write(title),run_time=0.9)
        self.play(Create(plane_group))
        self.next_slide()
        
        # ---------------------------------------------------------
        # Circle
        # ---------------------------------------------------------
        circle = Circle(radius=0.15, color=ACCENT_COLOR, stroke_width=3).shift(LEFT*0.4)
        tri = Triangle(color=BLUE, stroke_width=3).scale(0.20).shift(DOWN*0.25)
        square = Square(side_length=0.25, color=RED, stroke_width=3).shift(RIGHT*0.4)
        
        
        self.play(Create(circle),Create(tri),Create(square))
        self.next_slide()
        
        # ---------------------------------------------------------
        # Skews and rotations for show
        # ---------------------------------------------------------

        # Squeeze horizontally and shear slightly
        ellipse_matrix = np.array([
            [1.0, 0.2, 0],   # shear
            [0.0, 1.5, 0],   # vertical scaling
            [0.0, -1, 1]
        ])

        self.play(
            ApplyMatrix(ellipse_matrix, VGroup(circle, plane_group, tri, square)),
            run_time=2.0
        )
        self.next_slide()

        # ---------------------------------------------------------
        # Apply an additional affine transform WITH rotation
        # ---------------------------------------------------------

        theta = PI / 10  # 18° rotation

        rotation_matrix = np.array([
            [np.cos(theta), -np.sin(theta), 0],
            [np.sin(theta),  np.cos(theta), 0],
            [0,              0,             1]
        ])

        # Optional: mix rotation with a small shear to look projective-like
        extra_transform = np.array([
            [1.0, -0.40, 0],
            [0.0, 1.00, 0],
            [0.0, 0.00, 1]
        ])

        # Combine both: rotation * shear
        final_matrix = rotation_matrix @ extra_transform

        self.play(
            ApplyMatrix(final_matrix, VGroup(circle, plane_group, tri, square)),
            run_time=2.0
        )
        self.next_slide()

        # ---------------------------------------------------------
        # Fuck, go back (Inverse matrices)
        # ---------------------------------------------------------

        final_matrix_inv = inv(final_matrix)
        ellipse_matrix_inv = inv(ellipse_matrix)

        self.play(
            ApplyMatrix(final_matrix_inv, VGroup(circle, plane_group, tri, square))
            ,run_time=2.0
        )
        self.play(
            ApplyMatrix(ellipse_matrix_inv, VGroup(circle, plane_group, tri, square))
            ,run_time=2.0
        )


class S5_Pascal(Slide, MovingCameraScene):
    def tangent_to_ellipse(self, ellipse, t, length):
        p = ellipse.point_from_proportion(t)
        p2 = ellipse.point_from_proportion(t + 0.001)
        direction = p2 - p
        direction = direction / np.linalg.norm(direction)
        return Line(p - direction*length, p + direction*length)

    def line_intersection(self, line1, line2) -> np.array:
        p1, p2 = line1.get_start(), line1.get_end()
        p3, p4 = line2.get_start(), line2.get_end()

        x1, y1 = p1[:2]
        x2, y2 = p2[:2]
        x3, y3 = p3[:2]
        x4, y4 = p4[:2]

        denom = (x1-x2)*(y3-y4) - (y1-y2)*(x3-x4)
        if abs(denom) < 1e-8:
            return None

        Px = ((x1*y2 - y1*x2)*(x3-x4) - (x1-x2)*(x3*y4 - y3*x4)) / denom
        Py = ((x1*y2 - y1*x2)*(y3-y4) - (y1-y2)*(x3*y4 - y3*x4)) / denom

        return np.array([Px, Py, 0])

    def construct(self):
        self.camera.background_color = BG_COLOR

        # ---------------------------------------------------------
        # Tangent Hexagon 
        # ---------------------------------------------------------

        ellipse = Ellipse(width=6, height=5).set_stroke(WHITE,2.0)

        self.play(Create(ellipse))
        self.next_slide()

        # 6 roughly spaced points
        tangent_proportions = [0.05,0.20,0.44,0.61,0.73,0.85]
        # hex_points = [ellipse.point_from_proportion(t) for t in proportions]

        tangent_lines = [
            self.tangent_to_ellipse(ellipse, t, 7.0).set_stroke(PRIMARY_COLOR,1.0)
            for t in tangent_proportions
        ]
        # Draw tangents
        self.play(*[Create(tl) for tl in tangent_lines], run_time = 2.0)

        hex_verts = []
        for i in range(6):
            hex_verts.append(self.line_intersection(tangent_lines[i], tangent_lines[(i+1)% 6]))

        vertex_dots = VGroup(*[
            Dot(p).set_z_index(10) 
            for p in hex_verts
        ])
        ## Draw vertices
        self.play(Create(vertex_dots))

        labels = [Tex("A").next_to(hex_verts[0],UR),
            Tex("B").next_to(hex_verts[1],UP),
            Tex("C").next_to(hex_verts[2],UL),
            Tex("D").next_to(hex_verts[3],DL),
            Tex("E").next_to(hex_verts[4],DOWN),
            Tex("F").next_to(hex_verts[5],RIGHT)]
        label_group = VGroup(*labels)
        ## Draw Labels
        self.play(Write(label_group), run_time = 2.0)

        hex_sides = VGroup(*[
            Line(hex_verts[i], hex_verts[(i+1)%6], color=ACCENT_COLOR)
            for i in range(6)
        ])
        ## Draw Hexagon, finally
        self.play(
            Create(hex_sides),
            *[FadeOut(tl) for tl in tangent_lines],
            run_time = 3.0
        )
        self.next_slide()

        # ---------------------------------------------------------
        # Brianchon
        # ---------------------------------------------------------
        diagonals = [
            Line(hex_verts[0],hex_verts[3]).set_stroke(PRIMARY_COLOR,1.0),
            Line(hex_verts[1],hex_verts[4]).set_stroke(PRIMARY_COLOR,1.0),
            Line(hex_verts[2],hex_verts[5]).set_stroke(PRIMARY_COLOR,1.0)
            ]
        self.play(
            *[Create(diag) for diag in diagonals]
        )

        title = Tex(r"Brianchon's Theorem", font_size=36).to_corner(UL)
        
        P = self.line_intersection(diagonals[0],diagonals[1])
        P_dot = Dot(P,color=ACCENT_COLOR)

        self.play(
            Write(title),
            FadeIn(P_dot),
            run_time = 0.5
        )
        self.next_slide()

        # ---------------------------------------------------------
        # Tangent Hexagon 
        # ---------------------------------------------------------

        tangent_dots = [Dot(ellipse.point_from_proportion(p)) for p in tangent_proportions]
        self.play(
            *[FadeOut(diag) for diag in diagonals],
            FadeOut(hex_sides),
            FadeOut(title),
            FadeOut(label_group),
            FadeOut(P_dot),
            FadeOut(vertex_dots),

            *[Create(dot) for dot in tangent_dots]
        )
        self.next_slide()

        order = [2,4,0,3,1,5] # Chose a nice looking hexagram
        hexagrammum = [Line(tangent_dots[order[i]],tangent_dots[order[(i+1)%6]]).set_stroke(width=1.0) for i in range(6)]
        hexagrammum_group = VGroup(*hexagrammum)
        self.play(
            Create(hexagrammum_group)
        )
        self.next_slide()


        # ---------------------------------------------------------
        # Some more labels
        # ---------------------------------------------------------
        intersections = [self.line_intersection(hexagrammum[i],hexagrammum[i+3]) for i in range(3)]
        intersections_group = VGroup(*[Dot(intersections[i]).set_z_index(10) for i in range(3)])

        labels = [Tex("A").next_to(tangent_dots[2],UL),
            Tex("B").next_to(tangent_dots[1],UP),
            Tex("C").next_to(tangent_dots[0],UR),
            Tex("D").next_to(tangent_dots[3],DL),
            Tex("E").next_to(tangent_dots[4],DOWN),
            Tex("F").next_to(tangent_dots[5],DR)]
        label_group = VGroup(*labels)
        self.play(Create(intersections_group),Write(label_group))
        self.next_slide()


        # ---------------------------------------------------------
        # Pascal's Line
        # ---------------------------------------------------------
        title = Tex(r"The Magical Hexagram Theorem", font_size=36).to_corner(UL)
        title_downgrade = Tex(r"Pascal's Theorem", font_size=36).to_corner(UL)

        self.play(
            Write(title),
            run_time = 0.5
        )

        direction = (intersections[2] - intersections[0])*7.0
        pascal_line = Line(intersections[0]-direction,intersections[2]+direction).set_stroke(color=ACCENT_COLOR)
        self.play(Create(pascal_line))
        self.next_slide()

        self.play(TransformMatchingTex(title, title_downgrade))
        self.next_slide()

        self.play(FadeOut(title_downgrade), run_time=9.0)
        self.next_slide()

      
class S6_Link(Slide):
    def construct(self):
        # ---------------------------------------------------------
        # Background image to make the transition seamsless from prev slide
        # ---------------------------------------------------------

        img_path = "last_frame.png"  
        background_img = ImageMobject(img_path)
        background_img.scale_to_fit_height(config.frame_height)
        background_img.scale_to_fit_width(config.frame_width)

        self.add(background_img)
        self.next_slide()   


        overlay_img = ImageMobject("projective-geo-link.png")  # ← replace with your image path
        overlay_img.set_z_index(20)   # make sure it's in front
        overlay_img.scale(0.3)        # adjust size if needed
        overlay_img.move_to(ORIGIN)   # center of the screen

        # Start fully transparent
        overlay_img.set_opacity(0)
        self.add(overlay_img)

        fade_rect = Rectangle(
            width=100,
            height=100,
            fill_color=BG_COLOR,
            fill_opacity=1,
            stroke_opacity=0
        )

        self.play(FadeIn(fade_rect, run_time=1))

        text = VGroup(
            Tex("Presentation in article form available in my blog:", font_size=34),
            Tex(r"\texttt{https://xorad.me/r/projective-geo}", font_size=32, color=ACCENT_COLOR),
        )
        text.arrange(DOWN, buff=0.2)

        text.next_to(overlay_img,UP,buff=0.5)

        # Fade it in smoothly
        self.play(
            overlay_img.animate.set_opacity(1.0),
            FadeIn(text, shift=UP*0.2),
            run_time=1)
        self.next_slide()