with open("Day 9/in") as fp:
    lines = fp.readlines()


def diff(s):
    return [s[i + 1] - s[i] for i in range(len(s) - 1)]


def psums(s):
    for i in range(len(s) - 1, 0, -1):
        s[i - 1] += s[i]

    return s


t = 0
for line in lines:
    # 0   3   6   9  12  15
    #   3   3   3   3   3
    #     0   0   0   0

    s = []
    d = list(map(int, line.split()))
    while any(d):
        s.append(d[-1])
        print(*d)
        d = diff(d)

    print("----------------------------------")
    print(psums([*s]), end="\n\n")

    t += psums(s)[0]

print(t)
