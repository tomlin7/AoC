from collections import defaultdict

l = []
r = defaultdict(int)
with open("input.txt", "r") as fp:
    while d := fp.readline():
        a, b = d.split()
        l.append(int(a))
        r[int(b)] += 1

s = 0
for i in l:
    s += i * r.get(i, 0)
    
print(s) # 22014209