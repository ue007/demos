// CPP code to demonstrate use of default arguments in
// Constructors

#include <iostream>
using namespace std;

class A
{
private:
    int _x;

public:
    A(int x = 0) : _x(x){}; // default constructor with one argument
                            // Note that var(x) is the syntax in c++ to do : "var = x"
    void setX(int x)
    {
        _x = x; // OR => this->var = s;
        return;
    }
    int getX()
    {
        return _x; // OR => return this->x;
    }
};

int main()
{
    A a(1);

    a.setX(2);

    cout << "x = " << a.getX() << endl;

    /* ANOTHER APPROACH:
    A *a = new A(1);

    a->setX(2);

    cout << "x = " << a->getX() << endl;
    */
}

// contributed by Francisco Vargas #pt
