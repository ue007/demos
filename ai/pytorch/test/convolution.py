import torch
from torch import nn

conv = torch.nn.Conv2d(in_channels=1, out_channels=1, kernel_size=3, stride=1, padding=0, dilation=1, groups=1, bias=True, padding_mode='zeros')
print(conv)
print(conv.weight.shape)
print(conv.bias.shape)
input = torch.ones(1,1,5,5)
output = conv(input)
print(output)
print(input.shape)
print(output.shape)