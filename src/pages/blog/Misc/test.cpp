#include <bits/stdc++.h>

struct Point
{
	int x;
	int y;

	Point(int x, int y) : x(x), y(y) {}

	bool
	operator==(const Point &p)
	const
	{
		return x == p.x && y == p.y;
	}
};

std::unordered_map<int, std::vector<Point>>
long_function_return_type_list(std::vector<Point> &points,
	const Point &reference_point)
{

}