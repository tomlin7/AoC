p = "2333133121414131402"

with open("2024/inp.txt", "r") as f:
    p = f.read().strip()

n = 0
o = []
for i, l in enumerate(p):

    if i % 2 == 0:
        o += [int(n)] * int(l)
        n += 1
    else:
        o += ["."] * int(l)

left, right = 0, len(o) - 1
while left < right:
    if o[left] != ".":
        left += 1
        continue

    if o[right] == ".":
        right -= 1
        continue

    o[left], o[right] = o[right], o[left]
    left += 1
    right -= 1

print(sum(val * id for id, val in enumerate(o) if val != "."))
