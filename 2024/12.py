from collections import deque


def parse_map(grid):
    return [list(row) for row in grid]


def flood_fill(grid, visited, start, plant_type):
    rows, cols = len(grid), len(grid[0])
    queue = deque([start])
    visited[start[0]][start[1]] = True

    area = 0
    sides = set()

    while queue:
        r, c = queue.popleft()
        area += 1

        for dr, dc in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
            nr, nc = r + dr, c + dc
            if 0 <= nr < rows and 0 <= nc < cols:
                if grid[nr][nc] == plant_type:
                    if not visited[nr][nc]:
                        visited[nr][nc] = True
                        queue.append((nr, nc))
                else:
                    sides.add(((r, c), (nr, nc)))
            else:
                sides.add(((r, c), (nr, nc)))

    return area, len(sides)


def total_fencing_price(grid):
    grid = parse_map(grid)
    rows, cols = len(grid), len(grid[0])
    visited = [[False] * cols for _ in range(rows)]

    total_price = 0

    for r in range(rows):
        for c in range(cols):
            if not visited[r][c]:
                plant_type = grid[r][c]
                area, sides = flood_fill(grid, visited, (r, c), plant_type)
                price = area * sides
                total_price += price

    return total_price


with open("2024/inp.txt", "r") as f:
    grid = f.read().splitlines()

grid = [
    "RRRRIICCFF",
    "RRRRIICCCF",
    "VVRRRCCFFF",
    "VVRCCCJFFF",
    "VVVVCJJCFE",
    "VVIVCCJJEE",
    "VVIIICJJEE",
    "MIIIIIJJEE",
    "MIIISIJEEE",
    "MMMISSJEEE",
]

print(total_fencing_price(grid))
