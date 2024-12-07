# cartesian product!

from itertools import product


def ltr(n: list, ops):
    r = n[0]
    for i, op in enumerate(ops):
        if not op:
            # concat
            r = int(f"{r}{n[i + 1]}")
        elif op == 1:
            r += n[i + 1]
        else:
            r *= n[i + 1]
    return r


def evaluate_equation(v, o):
    n = len(v)
    cartesian = list(product([0, 1, 2], repeat=n - 1))
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
