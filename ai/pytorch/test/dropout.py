import torch
from torch import nn

dropout = nn.Dropout(0.5, inplace=False)
input = torch.randn(2,64,7,7)
print(input)
output = dropout(input)
print(output)