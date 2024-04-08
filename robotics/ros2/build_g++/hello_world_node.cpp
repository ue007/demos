// Include the ros2 c++ APIs
#include "rclcpp/rclcpp.hpp"

int main(int argc, char* argv[]) {
  // Process ros2-related command-line arguments and initialize ros2 for this
  // process
  rclcpp::init(argc, argv);
  // Create a ros2 node, which owns one or more ros2 interfaces
  auto node = std::make_shared<rclcpp::Node>("hello_world_node");
  // Broadcast a simple log message
  RCLCPP_INFO(node->get_logger(), "Hello, world!");
  // Process ros2 callbacks until receiving a SIGINT (ctrl-c)
  rclcpp::spin(node);
  // Stop the node's resources
  rclcpp::shutdown();
  // Exit tranquilly
  return 0;
}