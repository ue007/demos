// C++ program to illustrate Pointers

#include <iostream>
using namespace std;
void TestPointer()
{
    int var = 20;

    // declare pointer variable
    int *ptr;

    // note that data type of ptr and var must be same
    ptr = &var;

    // assign the address of a variable to a pointer
    cout << "Value at ptr = " << ptr << "\n";
    cout << "Value at var = " << var << "\n";
    cout << "Value at *ptr = " << *ptr << "\n";
}
// Pass-by-Value
int square1(int n)
{
    // Address of n in square1() is not the same as n1 in
    // main()
    cout << "address of n1 in square1(): " << &n << "\n";

    // clone modified inside the function
    n *= n;
    return n;
}
// Pass-by-Reference with Pointer Arguments
void square2(int *n)
{
    // Address of n in square2() is the same as n2 in main()
    cout << "address of n2 in square2(): " << n << "\n";

    // Explicit de-referencing to get the value pointed-to
    *n *= *n;
}
// Pass-by-Reference with Reference Arguments
void square3(int &n)
{
    // Address of n in square3() is the same as n3 in main()
    cout << "address of n3 in square3(): " << &n << "\n";

    // Implicit de-referencing (without '*')
    n *= n;
}
void TestAsArguments()
{
    // Call-by-Value
    int n1 = 8;
    cout << "address of n1 in main(): " << &n1 << "\n";
    cout << "Square of n1: " << square1(n1) << "\n";
    cout << "No change in n1: " << n1 << "\n";

    // Call-by-Reference with Pointer Arguments
    int n2 = 8;
    cout << "address of n2 in main(): " << &n2 << "\n";
    square2(&n2);
    cout << "Square of n2: " << n2 << "\n";
    cout << "Change reflected in n2: " << n2 << "\n";

    // Call-by-Reference with Reference Arguments
    int n3 = 8;
    cout << "address of n3 in main(): " << &n3 << "\n";
    square3(n3);
    cout << "Square of n3: " << n3 << "\n";
    cout << "Change reflected in n3: " << n3 << "\n";
}

void TestArrayNameAsPointers()
{
    // Declare an array
    int val[3] = {5, 10, 20};

    // declare pointer variable
    int *ptr;

    // Assign the address of val[0] to ptr
    // We can use ptr=&val[0];(both are same)
    ptr = val;
    cout << "Elements of the array are: ";
    cout << ptr[0] << " " << ptr[1] << " " << ptr[2];
}

void TestPointerExpressionsAnsArithmetic()
{
    // Declare an array
    double v[3] = {10, 100, 200};

    // declare pointer variable
    double *ptr;

    // Assign the address of v[0] to ptr
    ptr = v;

    for (int i = 0; i < 3; i++)
    {
        cout << "Value at ptr = " << ptr << "\n";
        cout << "Value at *ptr = " << *ptr << "\n";
        cout << "Sizeof Value at *ptr = " << sizeof(*ptr) << "\n";

        // Increment pointer ptr by 1
        ptr++;
    }

    /**
     * @brief
     * Value at ptr = 0x7ff7b5ebf52c
     * Value at *ptr = 10
     * Sizeof Value at *ptr = 4
     * Value at ptr = 0x7ff7b5ebf530
     * Value at *ptr = 100
     * Sizeof Value at *ptr = 4
     * Value at ptr = 0x7ff7b5ebf534
     * Value at *ptr = 200
     * Sizeof Value at *ptr = 4
     *
     */
}

void increase(void *data, int ptrsize)
{
    if (ptrsize == sizeof(char))
    {
        char *ptrchar;

        // Typecast data to a char pointer
        ptrchar = (char *)data;

        // Increase the char stored at *ptrchar by 1
        (*ptrchar)++;
        cout << "*data points to a char"
             << "\n";
    }
    else if (ptrsize == sizeof(int))
    {
        int *ptrint;

        // Typecast data to a int pointer
        ptrint = (int *)data;

        // Increase the int stored at *ptrchar by 1
        (*ptrint)++;
        cout << "*data points to an int"
             << "\n";
    }
}

void TestVoidPointers()
{
    // Declare a character
    char c = 'x';

    // Declare an integer
    int i = 10;

    // Call increase function using a char and int address
    // respectively
    increase(&c, sizeof(c));
    cout << "The new value of c is: " << c << "\n";
    increase(&i, sizeof(i));
    cout << "The new value of i is: " << i << "\n";
}

// Driver program
int main()
{
    TestPointer();
    TestAsArguments();
    TestArrayNameAsPointers();
    TestPointerExpressionsAnsArithmetic();
    TestVoidPointers();
    return 0;
}
