with open("input") as fp:
    cards = fp.readlines()

m = {}

for i, c in enumerate(cards):
    if i not in m:
        m[i] = 1

    w, h = c[c.find(":") :].strip().split("|")
    w = w.split()
    h = h.split()

    j = sum(i in h for i in w)

    for n in range(i + 1, i + j + 1):
        m[n] = m.get(n, 1) + m[i]


print(sum(m.values()))
