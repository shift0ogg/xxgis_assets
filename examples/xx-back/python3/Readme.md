### 语法要点
1、import 与 from...import
在 python 用 import 或者 from...import 来导入相应的模块。
将整个模块(somemodule)导入，格式为： import somemodule
从某个模块中导入某个函数,格式为： from somemodule import somefunction
从某个模块中导入多个函数,格式为： from somemodule import firstfunc, secondfunc, thirdfunc
将某个模块中的全部函数导入，格式为： from somemodule import *

2、#!/usr/bin/python3
在 Windows 下可以不写第一行注释:
#!/usr/bin/python3

3、长注释
关于注释，也可以使用 ''' ''' 的格式在三引号之间书写较长的注释；

4、多个变量赋值
a, b, c = 1, 2, "runoob"

5、标准数据类型
Python3 中有六个标准的数据类型：
Number（数字）
	Python3 支持 int、float、bool、complex（复数）。内置的 type() 函数可以用来查询变量所指的对象类型。
		>>> a, b, c, d = 20, 5.5, True, 4+3j
		>>> print(type(a), type(b), type(c), type(d))
		<class 'int'> <class 'float'> <class 'bool'> <class 'complex'>

	此外还可以用 isinstance 来判断：
		>>>a = 111
		>>> isinstance(a, int)
		True
		>>>

	数值运算，在混合计算时，Python会把整型转换成为浮点数，要获取整数使用//操作符。
		>>> 2 // 4 # 除法，得到一个整数
		0
		>>> 17 % 3 # 取余 
		2
		>>> 2 ** 5 # 乘方
		32

String（字符串）
	变量[头下标:尾下标]，索引值以 0 为开始值，-1 为从末尾的开始位置。
	加号 (+) 是字符串的连接符， 星号 (*) 表示复制当前字符串，紧跟的数字为复制的次数。实例如下：
	>>> str = '1234567890'
	>>> print(str*2)
	12345678901234567890

	Python 使用反斜杠(\)转义特殊字符，如果你不想让反斜杠发生转义,字符串前面添加一个 r，表示原始字符串：
	>>> str=r'test\n'
	>>> print(str)
	test\n
	>>> 

	Python 字符串不能被改变。向一个索引位置赋值，比如word[0] = 'm'会导致错误。


List（列表）
	列表中元素的类型可以不相同，它支持数字，字符串甚至可以包含列表（所谓嵌套）。
	List内置了有很多方法，例如append()、pop()等等，
	与Python字符串不一样的是，列表中的元素是可以改变的：
	>>> a = [1, 2, 3, 4, 5, 6]
	>>> a[0] = 9
	>>> a[2:5] = [13, 14, 15]


Tuple（元组）
	元组（tuple）与列表类似，不同之处在于元组的元素不能修改。元组写在小括号(())里，元素之间用逗号隔开。
	其实，可以把字符串看作一种特殊的元组。
	>>>tup = (1, 2, 3, 4, 5, 6)
	>>> print(tup[0])
	1
	>>> print(tup[1:5])
	(2, 3, 4, 5)

	构造包含 0 个或 1 个元素的元组比较特殊，所以有一些额外的语法规则：
	元组也可以使用+操作符进行拼接。
	>>> tup1=()
	>>> tup2=(20,)
	>>> tup2[0]
	20
	>>> tup12=tup1+tup2
	>>> tup12
	(20,)
	>>> 
	----
	!一般来说，函数的返回值一般为一个。而函数返回多个值的时候，是以元组的方式返回的。
	!python中的函数还可以接收可变长参数，比如以 "*" 开头的的参数名，会将所有的参数收集到一个元组上。
		def test(*args):
		    print(args)
		    return args




Sets（集合）
	集合（set）是一个无序不重复元素的序列。基本功能是进行成员关系测试和删除重复元素。
	可以使用大括号 { } 或者 set() 函数创建集合，注意：

	创建空集合必须用 set() 而不是 { }，因为 { } 是用来创建一个空字典。

	>>> student = {'Tom', 'Jim', 'Mary', 'Tom', 'Jack', 'Rose'}
	>>> student
	{'Jack', 'Mary', 'Tom', 'Rose', 'Jim'}
	>>> 'Rose' in student
	True
	>>> 
	# set可以进行集合运算
	>>>a = set('abracadabra')
	>>>b = set('alacazam')	 
	>>>print(a)	 
	>>>print(a - b)     # a和b的差集	 
	>>>print(a | b)     # a和b的并集	 
	>>>print(a & b)     # a和b的交集	 
	>>>print(a ^ b)     # a和b中不同时存在的元素


Dictionary（字典）
	字典（dictionary）是Python中另一个非常有用的内置数据类型。
	列表是有序的对象结合，字典是无序的对象集合。两者之间的区别在于：字典当中的元素是通过键来存取的，而不是通过偏移存取。
	创建空字典使用 { }。

	dict = {}
	dict['one'] = "1 - 菜鸟教程"
	dict[2]     = "2 - 菜鸟工具"

	>>> dict1={'name': 'runoob', 'site': 'www.runoob.com', 'code': 1}
	>>> dict(Runoob=1, Google=2, Taobao=3)
	{'Runoob': 1, 'Google': 2, 'Taobao': 3}


	另外，字典类型也有一些内置的函数，例如clear()、keys()、values()等。

6、数据类型转换
	int(x [,base])
	将x转换为一个整数
	float(x)
	将x转换到一个浮点数
	complex(real [,imag])
	创建一个复数
	str(x)
	将对象 x 转换为字符串
	repr(x)
	将对象 x 转换为表达式字符串
	eval(str)
	用来计算在字符串中的有效Python表达式,并返回一个对象
	tuple(s)
	将序列 s 转换为一个元组
	list(s)
	将序列 s 转换为一个列表
	set(s)
	转换为可变集合
	dict(d)
	创建一个字典。d 必须是一个序列 (key,value)元组。
	frozenset(s)
	转换为不可变集合
	chr(x)
	将一个整数转换为一个字符
	unichr(x)
	将一个整数转换为Unicode字符
	ord(x)
	将一个字符转换为它的整数值
	hex(x)
	将一个整数转换为一个十六进制字符串
	oct(x)
	将一个整数转换为一个八进制字符串



	> 您也可以使用del语句删除一些对象引用。
	> del语句的语法是：del var1[,var2[,var3[....,varN]]]]

7、__name__
每个模块都有一个__name__属性，当其值是'__main__'时，表明该模块自身在运行，否则是被引入。

8、包
	如果使用形如import item.subitem.subsubitem这种导入形式，除了最后一项，都必须是包，而最后一项则可以是模块或者是包，但是不可以是类，函数或者变量的名字。

    > from sound.effects import * 
	导入语句遵循如下规则：如果包定义文件 __init__.py 存在一个叫做 __all__ 的列表变量，那么在使用 from package import * 的时候就把这个列表中的所有名字作为包内容导入。作为包的作者，可别忘了在更新包之后保证 __all__ 也更新了啊。
	> __all__ = ["echo", "surround", "reverse"]
	这表示当你使用from sound.effects import *这种用法时，你只会导入包里面这三个子模块。

	>from Package import specific_submodule这种方法永远不会有错。事实上，这也是推荐的方法。
	>如果在结构中包是一个子包（比如这个例子中对于包sound来说），而你又想导入兄弟包（同级别的包）你就得使用导入绝对的路径来导入
	> from . import echo
	> from .. import formats
	> from ..filters import equalizer

