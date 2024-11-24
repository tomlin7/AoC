with open("Day 9/in") as fp:
    lines = fp.readlines()


def diff(s):
    return [s[i + 1] - s[i] for i in range(len(s) - 1)]


def psubs(s):
    for i in range(len(s) - 1, 0, -1):
        # print(f"{s[i - 1]} -= {s[i]}")
        s[i - 1] -= s[i]

    return s


t = 0
for line in lines:
    # 0   3   6   9  12  15
    #   3   3   3   3   3
    #     0   0   0   0

    s = []
    d = list(map(int, line.split()))
    while any(d):
        s.append(d[0])
        print(*d)
        d = diff(d)

    print("----------------------------------")
    print(psubs([*s]), end="\n\n")

    t += psubs(s)[0]

print(t)
