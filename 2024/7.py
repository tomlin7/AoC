# cartesian product!

from itertools import product


def ltr(n, ops):
    r = n[0]
    for i, op in enumerate(ops):
        if op:
            r += n[i + 1]
        else:
            r *= n[i + 1]
    return r


def evaluate_equation(v, o):
    n = len(v)
    cartesian = list(product([True, False], repeat=n - 1))
    return [ops for ops in cartesian if ltr(v, ops) == o]


with open("input.txt") as f:
    p = f.readlines()

out = 0
for e in p:
    i, j = e.split(":")
    o, v = int(i), list(map(int, j.split()))

    solutions = evaluate_equation(v, o)
    if solutions:
        print(f"{o} solved")
        out += o

print(out)
