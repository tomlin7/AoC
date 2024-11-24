with open("in") as fp:
    s = fp.read().splitlines()

trecs = list(map(int, s[0].split()[1:]))
drecs = list(map(int, s[1].split()[1:]))

total = 1

for t, dmin in zip(trecs, drecs):
    n = 0
    for v in range(1, t):
        tl = t - v
        d = tl * v

        if d > dmin:
            n += 1

    total *= n

print(total)
