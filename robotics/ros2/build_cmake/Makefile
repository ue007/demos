build:
	g++ --std=c++17 first_ros2_node.cpp -o first_ros2_node -I /opt/ros/rolling/include/ -L /opt/ros/rolling/lib -Wl,-rpath,/opt/ros/rolling/lib -lrclcpp -lrcutils -o first_node_make
	
# 顺便小鱼加个clean指令，用来删掉first_node
clean:
	rm first_node