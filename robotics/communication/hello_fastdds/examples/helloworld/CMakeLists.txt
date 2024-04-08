
cmake_minimum_required(VERSION 3.22)

project("generated_code")

set(CMAKE_CXX_STANDARD 11)
set(CMAKE_CXX_EXTENSIONS OFF)

# Find requirements
find_package(fastcdr REQUIRED)
find_package(fastrtps 2.12 REQUIRED)


message(STATUS "Configuring helloworld...")
add_library(helloworld_lib helloworld.cxx)
target_link_libraries(helloworld_lib fastcdr fastrtps)

add_executable(helloworld helloworldPubSubTypes.cxx helloworldPublisher.cxx helloworldSubscriber.cxx helloworldPubSubMain.cxx)
target_link_libraries(helloworld fastcdr fastrtps
        helloworld_lib )


