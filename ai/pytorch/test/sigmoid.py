import torch
from torch import nn

input = torch.ones(1,1,2,2)
print(input)

sigmoid = nn.Sigmoid()
print(sigmoid)
output = sigmoid(input)
print(output)

