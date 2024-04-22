// C++ Program to demonstrate strings
#include <iostream>
#include <sstream>
#include <string>

using namespace std;

void TestStringKeyword()
{
    char s[] = "GeeksforGeeks";
    std::cout << s << std::endl;

    string str("GeeksforGeeks");
    cout << str;

    string s1 = "GeeksforGeeks";

    cout << "s1 = " << s1 << endl;
}

void TestCStyleStrings()
{
    char s1[] = {'g', 'f', 'g', '\0'};
    char s2[4] = {'g', 'f', 'g', '\0'};
    char s3[4] = "gfg";
    char s4[] = "gfg";

    cout << "s1 = " << s1 << endl;
    cout << "s2 = " << s2 << endl;
    cout << "s3 = " << s3 << endl;
    cout << "s4 = " << s4 << endl;
}

void TestStringInput()
{
    // string s;
    // cout << "Enter String" << endl;
    // cin >> s;
    // cout << "String is: " << s << endl;

    /* string s2;
    cout << "Enter String" << endl;
    getline(cin, s2);
    cout << "String is: " << s2 << endl; */

    //
    string s = " GeeksforGeeks to the Moon ";
    stringstream obj(s);
    // string to store words individually
    string temp;
    // >> operator will read from the stringstream object
    while (obj >> temp)
    {
        cout << temp << endl;
    }
}

void print_string(string s)
{
    cout << "Passed String is: " << s << endl;
    return;
}

void TestPointerAndString()
{
    string s = "Geeksforgeeks";

    // pointer variable declared to store the starting
    // address of the string
    char *p = &s[0];

    // this loop will execute and print the character till
    // the character value is null this loop will execute and
    // print the characters

    while (*p != '\0')
    {
        cout << *p;
        p++;
    }
    cout << endl;
}
int main()
{
    TestStringKeyword();
    TestCStyleStrings();
    TestStringInput();

    string s = "GeeksforGeeks";
    print_string(s);
    TestPointerAndString();
    return 0;
}
