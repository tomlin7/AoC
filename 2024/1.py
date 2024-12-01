l = []
r = [] 
with open("input.txt", "r") as fp:
    while d := fp.readline():
        a, b = d.split()
        l.append(int(a))
        r.append(int(b))
        # print(f"({a})({b})")

l.sort()
r.sort()

d = 0
for i, j in zip(l, r):
    d += abs(i - j)

print(d) # 1938424
