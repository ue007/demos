// C++ program to demonstrate the use
// of struct using typedef
#include <iostream>
#include <sstream>
#include <string>

using namespace std;

// Declaration of typedef
typedef struct GeekForGeeks
{

    int G1;
    char G2;
    float G3;

} GFG;

// Driver Code
int main()
{
    GFG Geek;
    Geek.G1 = 85;
    Geek.G2 = 'G';
    Geek.G3 = 989.45;

    cout << "The value is : "
         << Geek.G1 << endl;

    cout << "The value is : "
         << Geek.G2 << endl;

    cout << "The value is : "
         << Geek.G3 << endl;

    return 0;
}
