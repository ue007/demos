// C Program to check whether the memory is
// freed or not

#include <cstdlib>
#include <iostream>
using namespace std;

int main()
{
	int* ptr;
	ptr = (int*)malloc(sizeof(int));

	if (ptr == NULL)
		cout << "Memory Is Insuffficient\n";
	else {
		free(ptr);
		cout << "Memory Freed\n";
	}
}

// This code is contributed by sarajadhav12052009
