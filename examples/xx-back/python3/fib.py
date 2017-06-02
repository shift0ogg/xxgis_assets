# Fibonacci series: 斐波纳契数列
# 两个元素的总和确定了下一个数

def fib1():
	mm = int(input("请输入你家狗狗的年龄: "))
	if mm < 10000:
		print("overflow")
	elif mm == 10000:
		print("nonono")
	else:
		print("ok")

	a, b = 0, 1
	while b < mm:
	    print(b)
	    a, b = b, a+b


# 如果是自己运行，则执行下面语句
if __name__ == '__main__':
	fib1()
