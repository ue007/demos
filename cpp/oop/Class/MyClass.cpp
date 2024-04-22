
#include <iostream>
#include "MyClass.h"

MyClass::MyClass()
{
  std::cout << "default constrctor" << std::endl;
}

MyClass::MyClass(int id)
{
  _id = id;
  std::cout << "parameter constrctor" << std::endl;
}

MyClass::MyClass(int id, std::string name) : _id(id), _name(name)
{
  std::cout << "parameter constrctor - values" << std::endl;
}

MyClass::~MyClass()
{
  std::cout << "destrctor" << std::endl;
}

void MyClass::staticFunction()
{
  // 静态函数的实现
  std::cout << "Static function called." << std::endl;
}

int MyClass::GetId()
{
  return this->_id;
}

int MyClass::SetId(int id)
{
  this->_id = id;
  return 1;
}

std::string MyClass::GetName()
{
  return this->_name;
}