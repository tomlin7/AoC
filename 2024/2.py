with open("input.txt") as f:
    p = [[int(j) for j in i.split()] for i in f.read().splitlines()]

# p = [
#     [int(j) for j in i.split()]
#     for i in """7 6 4 2 1
# 1 2 7 8 9
# 9 7 6 2 1
# 1 3 2 4 5
# 8 6 4 4 1
# 1 3 6 7 9""".splitlines()
# ]


def sep(p):
    m = 0
    if p[0] > p[1]:
        m = 1  # decreasing

    if not m:
        for i in range(1, len(p)):
            if p[i] - p[i - 1] not in [1, 2, 3]:
                return 0
    else:
        for i in range(1, len(p)):
            if p[i - 1] - p[i] not in [1, 2, 3]:
                return 0

    return 1


c = 0
for i in p:
    c += sep(i)

print(c)
