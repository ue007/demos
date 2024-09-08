FROM ubuntu:20.04

ENV DEBIAN_FRONTEND=noninteractive

ARG TZ=Asia/Shanghai
ENV TZ=${TZ}

RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

USER root

RUN apt update 

# First ensure that the Ubuntu Universe repository is enabled
RUN apt install -y software-properties-common
RUN add-apt-repository universe

# Now add the ROS 2 GPG key with apt.
RUN apt update
RUN apt install -y curl
RUN curl -sSL https://raw.githubusercontent.com/ros/rosdistro/master/ros.key -o /usr/share/keyrings/ros-archive-keyring.gpg

# Then add the repository to your sources list.
RUN echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/ros-archive-keyring.gpg] http://packages.ros.org/ros2/ubuntu $(. /etc/os-release && echo $UBUNTU_CODENAME) main" | tee /etc/apt/sources.list.d/ros2.list > /dev/null


# Desktop Install (Recommended): ROS, RViz, demos, tutorials.
RUN apt update
RUN apt install -y ros-galactic-desktop
RUN apt install -y ros-dev-tools

# Add 
RUN apt install -y default-jdk
RUN apt install -y gradle
RUN apt install -y python3-colcon-common-extensions python3-pip python3-vcstool
RUN python3 -m pip install -U git+https://github.com/colcon/colcon-gradle
RUN python3 -m pip install --no-deps -U git+https://github.com/colcon/colcon-ros-gradle

# 创建 dev 用户
RUN useradd --create-home --no-log-init --shell /bin/zsh -G sudo dev 
RUN adduser dev sudo
RUN echo 'dev:fine' | chpasswd

USER dev

#set work dir
WORKDIR /home/dev
