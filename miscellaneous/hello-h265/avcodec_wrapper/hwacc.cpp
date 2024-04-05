#include <iostream>
#include <fstream>
#include <string>

extern "C" {
#include <libavcodec/avcodec.h>
#include <libavutil/pixfmt.h>
#include <libavutil/hwcontext.h>
#include <libavutil/hwcontext_cuda.h>
}

using namespace std;

static void fail(const string &message) {
    cerr << "Error: " << message << endl;
    exit(1);
}

static void usage(const char *program) {
    cerr << "Usage: " << program << " <input.h265>" << endl;
    exit(1);
}

static void decode_frame(AVCodecContext *codec_ctx, AVFrame *output_frame, AVPacket *input_packet) {
    int err;

    err = avcodec_send_packet(codec_ctx, input_packet);
    if (err < 0) {
        fail("Error sending packet to decoder");
    }

    while (err >= 0) {
        err = avcodec_receive_frame(codec_ctx, output_frame);
        if (err == AVERROR(EAGAIN) || err == AVERROR_EOF) {
            break;
        }
        else if (err < 0) {
            fail("Error decoding frame");
        }

        cerr << "Decoded frame pts: " << output_frame->pts << endl;

        /* Do something with decoded frame */
    }
}

static void decode_video(const string &filename) {
    AVCodec *codec{nullptr};
    AVCodecContext *codec_ctx{nullptr};
    AVPacket input_packet{};
    AVFrame *output_frame{nullptr};
    const char *hw_device_type = "qsv";
    AVBufferRef *hw_device_ctx{nullptr};
    int err;

    cerr << "Input file: " << filename << endl;

    avdevice_register_all(); // Register all devices such as v4l2 or ALSA (Advanced Linux Sound Architecture)

    /* Find a decoder for H265 codec */
    codec = avcodec_find_decoder_by_name("hevc_cuvid");

    if (!codec) {
        fail("Failed to find hevc_cuvid decoder");
    }

    codec_ctx = avcodec_alloc_context3(codec);

    hw_device_ctx = nullptr;

    const enum AVPixelFormat hw_pix_fmt = AV_PIX_FMT_YUV420P;
    const enum AVHWDeviceType hw_device_type_e = av_hwdevice_find_type_by_name(hw_device_type);

    if (hw_device_type_e == AV_HWDEVICE_TYPE_NONE) {
        fail("Failed to get hardware device type");
    }

    err = av_hwdevice_ctx_create(&hw_device_ctx, hw_device_type_e, nullptr, nullptr, 0);
    if (err < 0) {
        fail("Failed to create hardware device context");
    }

    codec_ctx->pix_fmt = hw_pix_fmt;
    codec_ctx->hw_device_ctx = av_buffer_ref(hw_device_ctx);

    err = avcodec_open2(codec_ctx, codec, nullptr);
    if (err < 0) {
        fail("Failed to open codec");
    }

    output_frame = av_frame_alloc();
    if (!output_frame) {
        fail("Failed to allocate output frame");
    }

    /* Read frames and decode */
    AVFormatContext *format_ctx{nullptr};
    AVStream *stream{nullptr};
    format_ctx = avformat_alloc_context();
    if (!format_ctx) {
        fail("Could not allocate format context");
    }

    if (avformat_open_input(&format_ctx, filename.c_str(), nullptr, nullptr) < 0) {
        fail("Could not open input file");
    }

    if (avformat_find_stream_info(format_ctx, nullptr) < 0) {
        fail("Could not find stream information");
    }

    /* Find the first video stream */
    for (unsigned i = 0; i < format_ctx->nb_streams; i++) {
        stream = format_ctx->streams[i];
        if (stream->codecpar->codec_type == AVMEDIA_TYPE_VIDEO) {
            cerr << "Found video stream at index: " << i << endl;
            break;
        }
    }

    if (!stream) {
        fail("Could not find video stream in input file");
    }

    /* Read packets from the input file */
    while (av_read_frame(format_ctx, &input_packet) >= 0) {
        if (input_packet.stream_index != stream->index) {
            av_packet_unref(&input_packet);
            continue;
        }

        decode_frame(codec_ctx, output_frame, &input_packet);

        av_packet_unref(&input_packet);
    }

    av_frame_free(&output_frame);
    avcodec_free_context(&codec_ctx);
    avformat_close_input(&format_ctx);
    av_buffer_unref(&hw_device_ctx);
}

int main(int argc, char **argv) {
    if (argc < 2) {
        usage(argv[0]);
    }

    string filename(argv[1]);

    decode_video(filename);

    return 0;
}
