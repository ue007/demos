#include <iostream>
#include <opencv2/core.hpp>
#include <opencv2/highgui.hpp>

int main()
{
    std::string image_path = "../images/car.png";
    cv::Mat img = cv::imread(image_path, cv::IMREAD_COLOR);

    std::cout << image_path << std::endl;

    cv::imshow("Display window", img);
    int k = cv::waitKey(0); // Wait for a keystroke in the window
    return 0;
}