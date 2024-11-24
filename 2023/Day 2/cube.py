with open("input") as fp:
    s = fp.read().splitlines()

possible = 0
for id, line in enumerate(s):
    games = line.strip().split(": ")[1].split("; ")
    for i in games:
        r, g, b = 0, 0, 0
        for j in i.split(", "):
            if "red" in j:
                r = int(j.split()[0])
            if "green" in j:
                g = int(j.split()[0])
            if "blue" in j:
                b = int(j.split()[0])

        if r > 12 or g > 13 or b > 14:
            break
    else:
        possible += id + 1

print(possible)
