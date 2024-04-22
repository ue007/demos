// C++ program to pass the function as
// parameter as a lambda expression
#include <functional>
#include <iostream>
using namespace std;

// Function that takes a pointer
// to a function
int invoke(int x, int y,
           function<int(int, int)> func)
{
    return func(x, y);
}

// Driver Code
int main()
{

    // Define lambdas for addition and
    // multiplication operation where
    // we want to pass another function
    // as a parameter

    // Perform Addition
    cout << "Addition of 20 and 10 is ";
    int k = invoke(20, 10,
                   [](int x,
                      int y) -> int
                   {
                       return x + y;
                   });

    cout << k << '\n';

    // Perform Multiplication
    cout << "Multiplication of 20"
         << " and 10 is ";
    int l = invoke(20, 10,
                   [](int x,
                      int y) -> int
                   {
                       return x * y;
                   });

    cout << l << '\n';

    return 0;
}
