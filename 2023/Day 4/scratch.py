with open("input") as fp:
    cards = fp.readlines()

t = 0

for i, c in enumerate(cards):
    w, h = c[c.find(":") :].strip().split("|")
    w = w.split()
    h = h.split()
    v = 0

    for i in w:
        if i in h:
            if not v:
                v = 1
                continue
            v *= 2
    t += v

print(t)
