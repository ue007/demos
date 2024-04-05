from rosbags.rosbag2 import Reader
from rosbags.serde import deserialize_cdr

# create reader instance and open for reading
with Reader('./talker/') as reader:
    for connection, timestamp, rawdata in reader.messages():
        msg = deserialize_cdr(rawdata, connection.msgtype)
        print(connection,timestamp)
        print('-------------------------------')
        print(msg,msg.__msgtype__)
        print('*******************************') 