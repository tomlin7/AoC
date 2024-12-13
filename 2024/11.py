(*t,) = map(int, input().split())
for j in range(75):
    for i in range(len(t)):
        x = t[i]
        if not x:
            t[i] = 1
        elif len(g := str(x)) % 2 < 1:
            t[i], x = divmod(x, 10 ** (len(g) >> 1))
            t.append(x)
        else:
            t[i] *= 2024

print(len(t))
