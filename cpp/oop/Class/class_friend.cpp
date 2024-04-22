// C++ Program to demonstrate the
// functioning of a friend class
// https://www.geeksforgeeks.org/friend-class-function-cpp/?ref=lbp
#include <iostream>
using namespace std;

class GFG
{
private:
    int private_variable;

protected:
    int protected_variable;

public:
    GFG()
    {
        private_variable = 10;
        protected_variable = 99;
    }

    // friend class declaration
    friend class F;

    // friend function declaration
    friend void friendFunction(GFG &obj);
};

// Here, class F is declared as a
// friend inside class GFG. Therefore,
// F is a friend of class GFG. Class F
// can access the private members of
// class GFG.
class F
{
public:
    void display(GFG &t)
    {
        cout << "The value of Private Variable = "
             << t.private_variable << endl;
        cout << "The value of Protected Variable = "
             << t.protected_variable << endl;
    }
};

// friend function definition
void friendFunction(GFG &obj)
{
    cout << "friendFunction Private Variable: " << obj.private_variable
         << endl;
    cout << "friendFunction Protected Variable: " << obj.protected_variable << endl;
}

// Driver code
int main()
{
    GFG g;
    F fri;
    fri.display(g); 

    friendFunction(g);
    return 0;
}
