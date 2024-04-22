// C++ program to illustrate If statement
#include <iostream>
using namespace std;

void TestIfControl()
{
    int i = 20;

    if (i == 10)
        cout << "i is 10";
    else if (i == 15)
        cout << "i is 15";
    else if (i == 20)
        cout << "i is 20";
    else
        cout << "i is not present";
}

void TestSwitchControl()
{
    int var = 2;

    // declaring switch cases
    switch (var)
    {
    case 1:
        cout << "Case 1 is executed";
        break;
    case 2:
        cout << "Case 2 is executed";
        break;
    default:
        cout << "Default Case is executed";
        break;
    }
}

void TestConditional()
{
    int var;
    int flag = 0;

    // using conditional operator to assign the value to var
    // according to the value of flag
    var = flag == 0 ? 25 : -25;
    cout << "Value of var when flag is 0: " << var << endl;

    // changing the value of flag
    flag = 1;
    // again assigning the value to var using same statement
    var = flag == 0 ? 25 : -25;
    cout << "Value of var when flag is NOT 0: " << var;
}
void findElement(int arr[], int size, int key)
{
    // loop to traverse array and search for key
    for (int i = 0; i < size; i++)
    {
        if (arr[i] == key)
        {
            cout << "Element found at position: "
                 << (i + 1);
            break;
        }
    }
}

void TestJump()
{
    int arr[] = {1, 2, 3, 4, 5, 6};
    int n = 6;   // no of elements
    int key = 3; // key to be searched

    // Calling function to find the key
    findElement(arr, n, key);
}

int main()
{
    TestIfControl();
    TestSwitchControl();
    TestConditional();
    TestJump();
    return 1;
}
