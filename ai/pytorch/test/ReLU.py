import torch
from torch import nn

input = torch.randn(1,1,2,2)
print(input)
relu = nn.ReLU(inplace=True)
output = relu(input)
print(output)

