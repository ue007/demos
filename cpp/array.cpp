#include <iostream>

int main()
{
    int arr[5] = {1, 2, 3, 4, 5};
    int *ptr = arr;

    std::cout << "ptr:" << ptr << std::endl;
    for (int i = 0; i < 5; i++)
    {
        std::cout << ptr[i] << std::endl;
    }

    return 0;
}
