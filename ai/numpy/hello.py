import numpy as np
import math
import matplotlib.pyplot as plt

# numpy
a = np.array([[1, 2, 3],
              [4, 5, 6]])

print(a)

print(a.shape)

# Array fundamentals
a = np.array([1, 2, 3, 4, 5, 6])

print(a)

print(a[0])

print(a[:3])

a[0] = 10

print(a)

b = a[3:]

print(b)

b[0] = 40

print(b)

a = np.array([[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12]])

print(a)

print(a[1, 3])

# Array attributes: This section covers the ndim, shape, size, and dtype attributes of an array.
# ndim是一个数组属性，用于返回数组的维度（或称为轴数）
print(a.ndim)
print(a.shape)
print(len(a.shape) == a.ndim)
print(a.size)
print(a.size == math.prod(a.shape))
print(a.dtype)

# How to create a basic array
a = np.zeros(2)

print(a)

a = np.ones(2)

print(a)

a = np.empty(2) 

print(a)

print(np.arange(4))
print(np.arange(2, 9, 2))
print(np.linspace(0, 10, num=5))

x = np.ones(2, dtype=np.int64)

print(x)

# Adding, removing, and sorting elements
arr = np.array([2, 1, 5, 3, 7, 4, 6, 8])
sort = np.sort(arr)

print(arr)
print(sort)


a = np.array([1, 2, 3, 4])
b = np.array([5, 6, 7, 8])

c = np.concatenate((a, b))

print(c)


x = np.array([[1, 2], [3, 4]])
y = np.array([[5, 6]])

z = np.concatenate((x, y), axis=0)

print(z)


array_example = np.array([[[0, 1, 2, 3],
                           [4, 5, 6, 7]],
                          [[0, 1, 2, 3],
                           [4, 5, 6, 7]],
                          [[0 ,1 ,2, 3],
                           [4, 5, 6, 7]]])

print(array_example.ndim)
print(array_example.size)
print(array_example.shape)

# reshape 
a = np.arange(6)
print(a)

b = a.reshape(3, 2)
print(b)

c = np.reshape(a, newshape=(1, 6), order='C')
print(c)


a = np.array([2, 1, 5, 7, 4, 6, 8, 14, 10, 9, 18, 20, 22])
plt.plot(a)