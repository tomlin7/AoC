with open("in") as fp:
    s = fp.read().splitlines()


def thing():
    t = int("".join(s[0].split()[1:]))
    dmin = int("".join(s[1].split()[1:]))

    total = 1

    n = 0
    for v in range(1, t):
        tl = t - v
        d = tl * v

        if d > dmin:
            n += 1

    total *= n

    print(total)


# import timeit
# print(timeit.timeit(thing, number=1))
