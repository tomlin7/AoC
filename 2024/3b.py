import math
import re

# def foo():

#     # ~ 0.0012805000878870487 s

#     with open("input.txt") as f:
#         p = f.read()

#     mul = re.compile(r"mul\((\d+),(\d+)\)")

#     # p = "xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))"
#     # print(sum(int(a) * int(b) for a, b in mul.findall(p)))

#     m = 1
#     sum = 0
#     for i in re.findall(r"mul\(\d+,\d+\)|do\(\)|don't\(\)", p):
#         if i.startswith("don't"):
#             m = 0
#         elif i.startswith("do"):
#             m = 1
#         elif m:
#             a, b = map(int, mul.search(i).groups())
#             sum += a * b

#     print(sum)


# import timeit

# print(timeit.timeit(foo, number=1))
# # 0.0012805000878870487


with open("input.txt") as f:
    p = f.read()


p = "xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))"
m = 1
mul = re.compile(r"mul\((\d+),(\d+)\)")
print(
    sum(
        math.prod(a) * m
        for i in re.findall(r"mul\(\d+,\d+\)|do\(\)|don't\(\)", p)
        if (m := (0 if i.startswith("don't") else 1 if i.startswith("do") else m))
        and (a := map(int, mul.search(i).groups()) if i.startswith("mul") else (0, 0),)
    )
)
