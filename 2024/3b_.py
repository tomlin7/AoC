# with open("input.txt") as f:
#     p = f.read()

# sample input
p = "xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))"


# LEXER BECAUSE WHY NOT

# tokens
DONT = "don't"
DO = "do"
MUL = "mul"

tokens = []
i = 0

while i < len(p):
    if p[i : i + 5] == "don't":
        tokens.append(DONT)
        i += 5
    elif p[i : i + 2] == "do":
        tokens.append(DO)
        i += 2
    elif p[i : i + 3] == "mul":
        tokens.append(MUL)
        i += 3
    elif p[i] in "(),":
        tokens.append(p[i])
        i += 1
    elif p[i].isdigit():
        j = i + 1
        while j < len(p) and p[j].isdigit():
            j += 1
        tokens.append(p[i:j])
        i = j
    else:
        i += 1

print("".join(tokens))


# PARSER BECAUSE WHY NOT

m = 1
i = 0

sum = 0

while i < len(tokens):
    print("Cur:", tokens[i])
    if tokens[i] == DONT:
        m = 0
        i += 1
    elif tokens[i] == DO:
        m = 1
        i += 1
    elif tokens[i] == MUL:
        i += 1

        if tokens[i] != "(":
            continue
        i += 1

        if not tokens[i].isnumeric():
            continue
        a = int(tokens[i])
        i += 1

        if tokens[i] != ",":
            continue
        i += 1

        if not tokens[i].isnumeric():
            continue
        b = int(tokens[i])
        i += 1

        if tokens[i] != ")":
            continue
        i += 1

        if m:
            sum += a * b  # lol

    else:
        i += 1

print(sum)

# o: 83367900
# c: 83158140
