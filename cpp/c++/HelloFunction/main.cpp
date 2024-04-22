#include <iostream> 
using namespace std;
int max(int, int);
void primer();
void quote();

int main()
{
    cout << "Hello, world!" << endl; // hello world
    int result = max(10,12);
    cout << "Max value is : " << result << endl;

    double balance[5] = {1000.0, 2.0, 3.4, 7.0, 50.0};

    for(int i = 0; i < 5 ; i++) {
        cout << "balance is :" << balance[i] << endl;
    }

    char site[7] = {'R', 'U', 'N', 'O', 'O', 'B', '\0'};

    cout << "菜鸟教程: ";
    
    cout << site << endl;


    int  var1;
    char var2[10];
 
    cout << "var1 变量的地址： ";
    cout << &var1 << endl;
 
    cout << "var2 变量的地址： ";
    cout << &var2 << endl;

    primer();
    quote();

    return 0;
}

// 函数返回两个数中较大的那个数
int max(int num1, int num2) {
    // 局部变量声明
    int result;
    if (num1 > num2){
        result = num1;
    } else {
        result = num2;
    }
   return result; 
}

/**
 * @author Jeff
 * 
*/
int sum(int a, int b = 20) {
  int result;
  result = a + b;
  return (result);
}

void primer() {
    int  var = 20;   // 实际变量的声明
    int  *ip;        // 指针变量的声明
 
    ip = &var;       // 在指针变量中存储 var 的地址
 
    cout << "Value of var variable: ";
    cout << var << endl;
 
    // 输出在指针变量中存储的地址
    cout << "Address stored in ip variable: ";
    cout << ip << endl;
 
    // 访问指针中地址的值
    cout << "Value of *ip variable: ";
    cout << *ip << endl;

    return;
}

void quote() {
    // 声明简单的变量
   int    i;
   double d;
 
   // 声明引用变量
   int&    r = i;
   double& s = d;
   
   i = 5;
   cout << "Value of i : " << i << endl;
   cout << "Value of i reference : " << r  << endl;
 
   d = 11.7;
   cout << "Value of d : " << d << endl;
   cout << "Value of d reference : " << s  << endl;
   
   return;
}