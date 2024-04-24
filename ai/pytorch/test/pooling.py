import torch
from torch import nn

max_pooling = nn.MaxPool2d(2, stride=2)
aver_pooling = nn.AvgPool2d(2, stride=2)
input = torch.randn(1,1,4,4)
print(input)

# max_pooling进行最大值池化
output = max_pooling(input)
print(output)

# aver_pooling进行平均值池化
output = aver_pooling(input)
print(output)