example_map = """....#.....
.........#
..........
..#.......
.......#..
..........
.#^.......
........#.
#.........
......#..."""

with open("input.txt", "r") as f:
    data = f.read()

grid = [list(row) for row in data.split("\n") if row.strip()]

current_dir = 0
visited = set()

for y, row in enumerate(grid):
    for x, cell in enumerate(row):
        if cell == "^":
            current_pos = (x, y)
            break
    else:
        continue
    break

visited.add(current_pos)
moves = [(0, -1), (1, 0), (0, 1), (-1, 0)]

while True:
    nx, ny = (
        current_pos[0] + moves[current_dir][0],
        current_pos[1] + moves[current_dir][1],
    )

    if 0 <= nx < len(grid[0]) and 0 <= ny < len(grid) and grid[ny][nx] != "#":
        current_pos = (nx, ny)
        visited.add(current_pos)
    else:
        current_dir = (current_dir + 1) % 4

    if (
        current_pos[0] == 0
        or current_pos[0] == len(grid[0]) - 1
        or current_pos[1] == 0
        or current_pos[1] == len(grid) - 1
    ):
        break

print(len(visited))
