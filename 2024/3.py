import re

# input
with open("input.txt") as f:
    p = f.read()

# p = "xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))"

r = re.compile(r"mul\((\d+),(\d+)\)")
print(sum(int(a) * int(b) for a, b in r.findall(p)))
