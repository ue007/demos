#ifndef MYCLASS_H
#define MYCLASS_H
#include <iostream>

class MyClass
{
public:
  // Default Constructor
  MyClass();
  // Parameterized Constructor
  MyClass(int id);
  MyClass(int id, std::string name);

  // Destructor
  ~MyClass();

  int GetId();
  int SetId(int id);
  std::string GetName();

  static void staticFunction(); // 静态函数声明
private:
  int _id;
  std::string _name;
};

#endif