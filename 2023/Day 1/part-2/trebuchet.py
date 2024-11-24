MAP = {
    "one": "1",
    "two": "2",
    "three": "3",
    "four": "4",
    "five": "5",
    "six": "6",
    "seven": "7",
    "eight": "8",
    "nine": "9",
}

with open("input") as fp:
    s = fp.read().splitlines()

nums = []

for line in s:
    first, last = None, None

    broke = False
    for n, i in enumerate(line):
        if i.isdigit():
            first = last = i
            break
        for num in MAP:
            if line[n:].startswith(num):
                first = last = MAP[num]
                broke = True
                break
        if broke:
            break

    for n, i in enumerate(line):
        if i.isdigit():
            last = i
        for num in MAP:
            if line[n:].startswith(num):
                last = MAP[num]
                break

    nums.append(int(first + last))

print(nums)
print(sum(nums))
