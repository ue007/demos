cmake_minimum_required(VERSION 2.8)
project( enc_dec )

set(
  TARGETS
    main.cpp
  #  hwacc.cpp
    src/videoEncoder.cpp
    src/videoDecoder.cpp
)
find_package( OpenCV REQUIRED )
include_directories( ${OpenCV_INCLUDE_DIRS} )
add_executable( enc_dec ${TARGETS} )

target_link_libraries(enc_dec ${OpenCV_LIBS})

target_link_libraries(enc_dec avcodec)
target_link_libraries(enc_dec avutil)
target_link_libraries(enc_dec swscale)
# target_link_libraries(enc_dec pixfmt)
# target_link_libraries(enc_dec hwcontext)
# target_link_libraries(enc_dec hwcontext_cuda)
# target_link_libraries(enc_dec imgutils)
# target_link_libraries(enc_dec opt)
# target_link_libraries(enc_dec pixdesc)