# sample
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

with open("input.txt", "r") as f:
    data = f.read()

rules, update = data.split("\n\n")
rules = rules.split("\n")
update = update.split("\n")

from collections import defaultdict

g = defaultdict(list)
for r in rules:
    a, b = r.split("|")
    g[a].append(b)


def check(p):
    for i, n in enumerate(p):
        r = g[n]
        for j in filter(lambda x: x in p, r):
            if p.index(j) < i:
                # print(f"{n}({i}) not before {j}({p.index(j)})")
                return False
    return True


c = 0
for p in update:
    p = p.split(",")
    if not check(p):
        c += int(p[len(p) // 2])

print(c)
