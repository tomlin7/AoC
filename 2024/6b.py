def simulate_guard_patrol(grid, current_pos, current_dir):
    visited = set([current_pos])
    while True:
        nx, ny = (
            current_pos[0] + moves[current_dir][0],
            current_pos[1] + moves[current_dir][1],
        )

        if (
            nx < 0
            or nx >= len(grid[0])
            or ny < 0
            or ny >= len(grid)
            or grid[ny][nx] == "#"
        ):
            current_dir = (current_dir + 1) % 4
        else:
            current_pos = (nx, ny)
            visited.add(current_pos)

        if (
            current_pos[0] == 0
            or current_pos[0] == len(grid[0]) - 1
            or current_pos[1] == 0
            or current_pos[1] == len(grid) - 1
        ):
            return visited


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


def cur():
    for y, row in enumerate(grid):
        for x, cell in enumerate(row):
            if cell in "^v<>":
                return (x, y), "^v<>".index(cell)


moves = [(0, -1), (1, 0), (0, 1), (-1, 0)]
current_pos, current_dir = cur()
print(len(simulate_guard_patrol(grid, current_pos, current_dir)))
