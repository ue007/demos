import torch
from torch import nn

input = torch.randn(1,1,2,2)
print(input)
leakyRelu = nn.LeakyReLU(0.04, True)
output = leakyRelu(input)
print(output)

