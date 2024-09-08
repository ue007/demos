# 使用官方的 Ubuntu 20.04 基础镜像
FROM ubuntu:20.04

# 维护者信息（可选）
LABEL maintainer="your-email@example.com"

# 避免交互式提示（如 tzdata）
ENV DEBIAN_FRONTEND=noninteractive

# 更新软件包列表并安装基础软件
RUN apt-get update && \
    apt-get install -y \
    curl \
    wget \
    vim \
    git \
    build-essential \
    cmake \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# 设置工作目录（可选）
WORKDIR /workspace

# 设置默认命令（可选）
CMD ["bash"]
