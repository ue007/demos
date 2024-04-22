#include <iostream>
#include <map>

int main()
{
    // Create a map of strings to integers
    std::map<std::string, int> map;

    // Insert some values into the map
    map["one"] = 1;
    map["two"] = 2;
    map["three"] = 3;

    // Get an iterator pointing to the first element in the map
    std::map<std::string, int>::iterator it = map.begin();

    // Iterate through the map and print the elements
    while (it != map.end())
    {
        std::cout << "Key: " << it->first << ", Value: " << it->second << std::endl;
        ++it;
    }

    return 0;
}
