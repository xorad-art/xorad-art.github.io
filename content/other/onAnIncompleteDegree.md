# A Retrospective on an incomplete College Degree

> **2025/09/17**

At this point it's pretty clear I will not finish studying Computer Systems Engineering at ESCOM, as for any field you never "finish studying" them, but I would have appreciated getting a fancy paper certifying me on it. Long story short I'm now starting to study a math degree at the science faculty in UNAM instead, because it would feel very repetitive having 4 semesters of things I have already gone through if I went with a Computer Science one. Mathematics are really cool to learn anyways.

## The reasons

I would love to say that I *decisively* discovered that computers were not my thing, but I still do; I wrote every single line in this website, but sadly it's a much more mundane misshap.

The national polytechnic institute (IPN) here in Mexico gives a relatively fair chance to go through each subject in any degree:

1. Pass the course
2. Pass the written test at the end of the course
3. Pass the written test after the semester ends
4. Repeat the first 3 steps once
5. Make appointments for another two possible tests

It is not uncommon for professors to make the course score only the tests, and to give fairly black and white scores (I'm getting so surprise half-points actually exist at UNAM). It's probably that giving points for "The logic is correct but you wrote 3 instead of 8 there" can get pretty time consuming on the teacher's end. But I also went through professors that would give a 15 minute class (if any) for each **hour and a half** period. I've had the best and the worst professors I've met in my life while inside ESCOM

### Linear Algebra got me

I got pretty much the most difficult professors as I could, once from my first time going over it by accident, and another one on my re-taking of that same course because I had no other choice, this is no exageration, from a class of 30 these two usually let 2 or 3 pass, and when you only have two opportunities to take the course, welp... that was kind of it.

I've taken so many 4 question tests for Linear algebra I can't even remember all of them, and every single one I always got a 5/10, two answers correct and two wrong, *like clockwork*. Any half point for the two other answers would have allowed me to continue (I ended up with all my other classes passed by the end mind you), my errors were almost always miscalculating an addition or a multiplication from calculating by hand a determinant of a $4\times4$ matrix or something like it, then the error propagating.

Basically I did not make the cut for mental arithmetic. I can't calculate a $5\times5$ inverse matrix if you don't give me an easy example, I got to the point I would write a solver for nxn matrices faster in python than I can do gaussian elimination by hand, which, by the way, here's one:

<sup>(I still haven't written color coding for code inside the website, but you are reading and it looks pretty ignore this comment)</sup>

``` Python
def solve(A, b):
    n = len(A)
    for i in range(n):
        # Get yourself a pivot
        if A[i][i] == 0:
            # Swap if necessary
            for j in range(i+1, n):
                if A[j][i] != 0:
                    A[i], A[j] = A[j], A[i]
                    b[i], b[j] = b[j], b[i]
                    break
        # Normalize your row
        div = A[i][i]
        for k in range(i, n):
            A[i][k] /= div
        b[i] /= div
        # Eliminate things below
        for j in range(i+1, n):
            factor = A[j][i]
            for k in range(i, n):
                A[j][k] -= factor * A[i][k]
            b[j] -= factor * b[i]
    # Back substitution
    x = [0]*n
    for i in range(n-1, -1, -1):
        x[i] = b[i] - sum(A[i][j]*x[j] for j in range(i+1, n))
    return x
```

Is it right? I don't know, do I care enough to test it? probably.


## The Experience as a whole was nice

I started studying just after the pandemic was on its last days, we started with some mixed classes between online and in person. I met so many people that are definitely 

I think it was cool that I had peers that were brilliant and we were all suffering along with the unreasonable standards they wanted us to catch, by the end of the first semester we had no hobbies anymore, no free time aside from an awkward dissociation phase during vacations. I don't have a word for trauma bonding between fellow abusees, but I think it fits.



> Xorad, **2025/09/17**