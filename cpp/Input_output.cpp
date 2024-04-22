#include <iostream>

using namespace std;

void TestCin()
{
    int age;
    cout << "Enter your age:";
    cin >> age;
    cout << "\nYour age is: " << age << endl;
}

void TestCout()
{
    char sample[] = "GeeksforGeeks";

    cout << sample << " - A computer science portal for geeks" << endl;
}

void TestCerr()
{
    cerr << "An error occurred" << endl;
}

void TestClog()
{
    clog << "An log occurred" << endl;
}

int main()
{
    TestCin();
    TestCout();
    TestCerr();
    TestClog();

    return 0;
}
