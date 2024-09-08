# 使用 Ubuntu 20.04 作为基础镜像
FROM ubuntu:20.04

# 安装依赖
RUN apt-get update && \
    apt-get install -y \
    curl \
    gnupg2 \
    lsb-release \
    locales \
    build-essential \
    cmake \
    git \
    wget \
    libasio-dev \
    libtinyxml2-dev \
    libpoco-dev \
    # python3-colcon-common-extensions \
    python3-pip

# 设置语言环境
RUN locale-gen en_US.UTF-8
ENV LANG=en_US.UTF-8 \
    LC_ALL=en_US.UTF-8

# 安装 ROS 2 Rolling
RUN mkdir -p /ros2_rolling && cd /ros2_rolling && \
    curl -sSL https://raw.githubusercontent.com/ros2/ros2/rolling/ros2-install.sh | bash

# 设置环境变量
ENV ROS_DISTRO=rolling
ENV RMW_IMPLEMENTATION=rmw_cyclonedds_cpp

# 克隆和安装 Cyclone DDS
RUN git clone https://github.com/eclipse-cyclonedds/cyclonedds.git /cyclonedds && \
    cd /cyclonedds && \
    mkdir build && cd build && \
    cmake .. && \
    make && \
    make install

# 创建 ROS 2 工作区并构建
RUN mkdir -p /ros2_ws/src
WORKDIR /ros2_ws
RUN source /ros2_rolling/setup.bash && \
    colcon build

# 设置启动命令
CMD ["bash", "-c", "source /ros2_rolling/setup.bash && source /ros2_ws/install/setup.bash && exec bash"]
