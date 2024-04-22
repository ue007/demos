// CPP Program to demonstrate the raise() function
#include <csignal>
#include <iostream>

using namespace std;

void signal_handler(int signal_num)
{
    cout << "Interrupt signal is (" << signal_num << ").\n";

    // It terminates program
    exit(signal_num);
}

int main()
{
    int count = 0;
    signal(SIGSEGV, signal_handler);
    // register signal SIGSEGV and signal handler

    while (++count)
    {
        cout << "Hello GeeksforGeeks..." << endl;
        if (count == 5)
            raise(SIGSEGV);
    }
    return 0;
}
