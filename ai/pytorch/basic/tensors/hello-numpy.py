import numpy as np

a = np.arange(6)
a2 = a[np.newaxis, :]
print(a2.shape)

a = np.array([1, 2, 3, 4, 5, 6])
print(a[0])
a = np.array([[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12]])
print(a[0])

print(np.zeros(2))
print(np.ones(2))
print(np.empty(2))
print(np.arange(4))
print(np.arange(2, 9, 2))
print(np.linspace(0, 10, num=5))
