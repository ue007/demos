#include <iostream>
#include "MyClass.h"

int main()
{

  MyClass::staticFunction(); // 调用静态函数
  {
    MyClass my1(200);
    std::cout << my1.GetId() << std::endl;
  }

  {
    MyClass my2;
    my2.SetId(100);
    std::cout << my2.GetId() << std::endl;
  }

  {
    MyClass my(300,"jeff");
    std::cout << my.GetId() << std::endl;
    std::cout << my.GetName() << std::endl;
  }
  return 0;
}