with open("input") as fp:
    s = fp.read().splitlines()

power = 0
for id, line in enumerate(s):
    games = line.strip().split(": ")[1].split("; ")
    r, g, b = 1, 1, 1
    for i in games:
        for j in i.split(", "):
            if "red" in j:
                r = max(r, int(j.split()[0]))
            if "green" in j:
                g = max(g, int(j.split()[0]))
            if "blue" in j:
                b = max(b, int(j.split()[0]))

    power += r * g * b

print(power)
