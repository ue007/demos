// C++ program to illustrate
// call by value
#include <iostream>
using namespace std;

// Pass by Value
void func(int a, int b)
{
    a += b;
    cout << "In func, a = " << a << " b = " << b << endl;
}

// Pass by reference(aliasing)
void SwapNum(int *i, int *j)
{
    int temp = *i;
    *i = *j;
    *j = temp;
}

int main(void)
{
    // Test Passing parameters By Value
    int x = 5, y = 7;

    func(x, y);

    cout << "In main, x = " << x << " y = " << y << endl;

    int a = 10, b = 20;

    // Test Passing parameters By Reference
    SwapNum(&a, &b);

    cout << "a is " << a << " and b is " << b << endl;

    return 0;
}
