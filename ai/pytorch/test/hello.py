import torch
from torch import nn

input = torch.ones(2,3)
print(input)

input = torch.ones(5)
print(input)

print(torch.__version__)

print(torch.cuda.is_available())
