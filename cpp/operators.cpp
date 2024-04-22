// CPP Program to demonstrate the Binary Operators
#include <iostream>
using namespace std;

void ArithmeticOperators()
{
    int a = 10;
    cout << "a++ is " << a++ << endl;
    cout << "++a is " << ++a << endl;

    int b = 15;
    cout << "b-- is " << b-- << endl;
    cout << "--b is " << --b << endl;
}

void BinaryOperators()
{
    int a = 8, b = 3;

    // Addition operator
    cout << "a + b = " << (a + b) << endl;

    // Subtraction operator
    cout << "a - b = " << (a - b) << endl;

    // Multiplication operator
    cout << "a * b = " << (a * b) << endl;

    // Division operator
    cout << "a / b = " << (a / b) << endl;

    // Modulo operator
    cout << "a % b = " << (a % b) << endl;
}

void RelationalOperators()
{
    int a = 6, b = 4;

    // Equal to operator
    cout << "a == b is " << (a == b) << endl;

    // Greater than operator
    cout << "a > b is " << (a > b) << endl;

    // Greater than or Equal to operator
    cout << "a >= b is " << (a >= b) << endl;

    //  Lesser than operator
    cout << "a < b is " << (a < b) << endl;

    // Lesser than or Equal to operator
    cout << "a <= b is " << (a <= b) << endl;

    // true
    cout << "a != b is " << (a != b) << endl;
}

void LogicalOperators()
{
    int a = 6, b = 4;

    // Logical AND operator
    cout << "a && b is " << (a && b) << endl;

    // Logical OR operator
    cout << "a ! b is " << (a > b) << endl;

    // Logical NOT operator
    cout << "!b is " << (!b) << endl;
}

void BitwiseOperators()
{
    int a = 6, b = 4;

    // Binary AND operator
    cout << "a & b is " << (a & b) << endl;

    // Binary OR operator
    cout << "a | b is " << (a | b) << endl;

    // Binary XOR operator
    cout << "a ^ b is " << (a ^ b) << endl;

    // Left Shift operator
    cout << "a>>1 is " << (a >> 1) << endl;

    // Right Shift operator
    cout << "a<<1 is " << (a << 1) << endl;

    // One’s Complement operator
    cout << "~(a) is " << ~(a) << endl;
}

void AssignmentOperators()
{
    int a = 6, b = 4;

    // Assignment Operator
    cout << "a = " << a << endl;

    //  Add and Assignment Operator
    cout << "a += b is " << (a += b) << endl;

    // Subtract and Assignment Operator
    cout << "a -= b is " << (a -= b) << endl;

    //  Multiply and Assignment Operator
    cout << "a *= b is " << (a *= b) << endl;

    //  Divide and Assignment Operator
    cout << "a /= b is " << (a /= b) << endl;
}

void TernaryorConditionalOperators()
{
    int a = 3, b = 4;

    // Conditional Operator
    int result = (a < b) ? b : a;
    cout << "The greatest number is " << result << endl;
}

int main()
{
    ArithmeticOperators();
    BinaryOperators();
    RelationalOperators();
    LogicalOperators();
    BitwiseOperators();
    AssignmentOperators();
    TernaryorConditionalOperators();

    int a = 6;
    int *b;
    int c;
    //  & Operator
    b = &a;

    // * Operator
    c = *b;
    cout << " a = " << a << endl;
    cout << " b = " << b << endl;
    cout << " c = " << c << endl;

    return 0;
}
