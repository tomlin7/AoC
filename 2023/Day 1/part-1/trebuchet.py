with open("input") as fp:
    s = fp.read().splitlines()

nums = []

for line in s:
    first, last = None, None
    for i in line:
        if i.isdigit():
            first = last = i
            break
    for i in line:
        if i.isdigit():
            last = i

    nums.append(int(first + last))

print(nums)
print(sum(nums))
