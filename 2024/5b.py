data = """47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13

75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47"""

rules, updates = data.split("\n\n")
rules = rules.split("\n")
updates = updates.split("\n")

from collections import defaultdict, deque

g = []

for r in rules:
    a, b = r.split("|")
    g.append((a, b))


def check(u):
    position = {p: i for i, p in enumerate(u)}
    for x, y in g:
        if x in position and y in position and position[x] > position[y]:
            return False
    return True


def bfs(p):
    p = set(p)

    pg = defaultdict(list)
    ind = defaultdict(int)

    for a, b in g:
        if a in p and b in p:
            pg[a].append(b)
            ind[b] += 1

    q = deque([i for i in p if not ind[i]])

    ordered = []
    while q:
        n = q.popleft()
        ordered.append(n)
        for i in pg[n]:
            ind[i] -= 1
            if not ind[i]:
                q.append(i)

    return ordered


c = 0
for p in updates:
    p = p.split(",")
    if check(p):
        c += int(p[len(p) // 2])
    else:
        o = bfs(p)
        c += int(o[len(o) // 2])

print(c)
