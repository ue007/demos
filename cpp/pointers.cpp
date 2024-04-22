// Deallocating a memory pointed by ptr causes
// dangling pointer
#include <cstdlib>
#include <iostream>

/**
 * @brief
 * “野指针”（wild pointer）
 * “悬空指针”（dangling pointer）
 * @return int
 */

// Deallocating a memory pointed by ptr causes
// dangling pointer
void TestDanglingPointerByMemory()
{
    int *ptr = (int *)malloc(sizeof(int));

    // After below free call, ptr becomes a dangling pointer 悬空指针
    free(ptr);

    // No more dangling pointer
    ptr = NULL;
}

int *fun()
{
    // x is local variable and goes out of
    // scope after an execution of fun() is
    // over.
    int x = 5;

    return &x;
}

// The pointer pointing to local variable becomes
// dangling when local variable is not static.
void TestDanglingPointerByFunction()
{
    int *p = fun();
    fflush(stdin);

    // p points to something which is not
    // valid anymore
    std::cout << *p << std::endl;
}
void TestWildPointer()
{
    int *p; /* wild pointer */

    // void *p = NULL;
    // void *data = malloc(size);

    int x = 10;

    // p is not a wild pointer now
    p = &x;
    std::cout << "TestWildPointer:" << p << std::endl;
    std::cout << "TestWildPointer:" << *p << std::endl;
}

void TestNullPointer()
{
    // Null Pointer
    int *ptr = NULL;

    std::cout << "The value of ptr is " << ptr << std::endl;
}

int main()
{
    TestDanglingPointerByMemory();
    TestDanglingPointerByFunction();
    TestNullPointer();
    TestWildPointer();
}
