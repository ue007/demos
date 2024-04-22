// C++ program to demonstrate the passing
// of functions as an object parameter
#include <functional>
#include <iostream>
using namespace std;

// Define add and multiply to
// return respective values
int add(int x, int y) { return x + y; }
int multiply(int x, int y) { return x * y; }

// Function that accepts an object of
// type std::function<> as a parameter
// as well
int invoke(int x, int y, function<int(int, int)> func)
{
    return func(x, y);
}

// Driver code
int main()
{
    // Pass the required function as
    // parameter using its name
    cout << "Addition of 20 and 10 is ";
    cout << invoke(20, 10, &add) << '\n';

    cout << "Multiplication of 20"
         << " and 10 is ";
    cout << invoke(20, 10, &multiply) << '\n';

    return 0;
}
