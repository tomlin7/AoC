with open("2024/inp.txt", "r") as f:
    p = list(map(int, f.read().strip()))

import operator as op

p = list(map(int, "2333133121414131402"))
pc, ans, ids, pos = p.copy(), 0, [None] * len(p), 0
ids[::2] = range(len(p) // 2 + 1)
ans = sum(
    (
        (ids[i] * p[i] * (2 * pos + p[i] - 1)) // 2
        if i % 2 == 0
        else sum(
            (ids[endi] * p[endi] * (2 * pos + p[endi] - 1)) // 2
            for endi in range(len(p) - 1, i, -2)
            if p[endi] != 0
            and p[endi] <= p[i]
            and not (op.setitem(p, i, p[i] - p[endi]))
        )
    )
    for i in range(len(p))
    if not (pos := pos + (pc[i] if i % 2 == 0 else p[i]))
)
print(ans)
