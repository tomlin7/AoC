# p = """MMMSXXMASM
# MSAMXMSMSA
# AMXSXMAAMM
# MSAMASMSMX
# XMASAMXAMM
# XXAMMXXAMA
# SMSMSASXSS
# SAXAMASAAA
# MAMMMXMMMM
# MXMXAXMASX""".split(
#     "\n"
# )

with open("input.txt") as f:
    p = f.read().split("\n")


rows = len(p)
cols = len(p[0])
o = 0

# (row, col)
directions = [
    # h
    (0, 1),
    (0, -1),
    # v
    (1, 0),
    (-1, 0),
    # d
    (1, 1),
    (1, -1),
    (-1, 1),
    (-1, -1),
]


def check(r, c, dr, dc):
    for i, l in enumerate("XMAS"):
        nr = r + dr * i
        nc = c + dc * i

        # outside or not l
        if not (0 <= nr < rows and 0 <= nc < cols) or p[nr][nc] != l:
            return False
    return True


for r in range(rows):
    for c in range(cols):
        for dr, dc in directions:
            if check(r, c, dr, dc):
                o += 1

print(o)
