# grid = """MMMSXXMASM
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
    grid = f.read().split("\n")


rows = len(grid)
cols = len(grid[0])
o = 0

pgrid = [
    (("M", -1, -1), ("S", -1, 1), ("M", 1, -1), ("S", 1, 1)),
    (("S", -1, -1), ("M", -1, 1), ("S", 1, -1), ("M", 1, 1)),
    (("S", -1, -1), ("S", -1, 1), ("M", 1, -1), ("M", 1, 1)),
    (("M", -1, -1), ("M", -1, 1), ("S", 1, -1), ("S", 1, 1)),
]

prows = len(pgrid[0])
pcols = len(pgrid[0][0])


def check(r, c, p):
    for ch, dr, dc in p:
        nr = r + dr
        nc = c + dc

        if not (0 <= nr < rows and 0 <= nc < cols) or grid[nr][nc] != ch:
            return False

    return True


for r in range(rows):
    for c in range(cols):
        if grid[r][c] != "A":
            continue

        for p in pgrid:
            if check(r, c, p):
                o += 1

print(o)
