// #include <iostream> 
// #include <vector>

// using namespace std;
// int main()
// {
//     cout << "Hello, world!" << endl; // hello world
//     return 0;
// }

#include <iostream>
#include <vector>
#include <spdlog/spdlog.h>

int main() {
    // 创建一个空的 vector，存储整数类型
    std::vector<int> vec;

    // 向 vector 中添加元素
    vec.push_back(10);
    vec.push_back(20);
    vec.push_back(30);

    // 访问 vector 中的元素
    std::cout << "Elements in vector:";
    for (size_t i = 0; i < vec.size(); ++i) {
        std::cout << " " << vec[i];
    }
    std::cout << std::endl;

    // 使用迭代器遍历 vector 中的元素
    std::cout << "Elements using iterator:";
    for (auto it = vec.begin(); it != vec.end(); ++it) {
        std::cout << " " << *it;
    }
    std::cout << std::endl;

    // 使用范围-based for 循环遍历 vector 中的元素 (C++11 以后)
    std::cout << "Elements using range-based for loop:";
    for (int num : vec) {
        std::cout << " " << num;
    }
    std::cout << std::endl;

    // 检查 vector 是否为空
    if (vec.empty()) {
        std::cout << "Vector is empty." << std::endl;
    } else {
        std::cout << "Vector is not empty. Size: " << vec.size() << std::endl;
    }

    // 清空 vector
    vec.clear();

    // 再次检查是否为空
    if (vec.empty()) {
        std::cout << "Vector is empty after clear." << std::endl;
    }
     spdlog::info("Welcome to spdlog version {}.{}.{}  !", SPDLOG_VER_MAJOR, SPDLOG_VER_MINOR, SPDLOG_VER_PATCH);

    return 0;
}
