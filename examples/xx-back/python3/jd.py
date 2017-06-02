'''
① 在Python中发送HTTP请求是非常简单的; urllib.request模块有一个方便的函数urlopen() ，输入"网址"，
   然后返回一个类文件对象，这是只要调用它的read()方法就可以获得网页的全部内容。 
② urlopen().read()方法总是返回bytes对象,而不是字符串。记住字节仅仅是字节，字符只是一种抽象，但HTTP服务器不关心抽象的东西。
   所以请求一个资源，得到字节。需要用decode()解码，才能显式的将其转化成字符串。
'''

import urllib.request
import re

#################################################
#
# fetch函数功能：抓取“大众点评网”的某酒店页面，输出 酒店名字
# 
#  参数baseUrl是要访问的网站地址。如www.baidu.com
#
#################################################
def fetch(baseUrl):

    # 第1步：模拟浏览器发送请求
    headers = ('User-Agent','Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.11 (KHTML, like Gecko) Chrome/23.0.1271.64 Safari/537.11')
    opener = urllib.request.build_opener()
    opener.addheaders = [headers]
    data = opener.open(baseUrl).read()
    data = data.decode('utf-8')  

    # 第2步：页面返回后，利用正则表达式提取想要的内容
    nameList=[]
    nameList = re.compile('target="_blank" class="hotel-name-link"\r\n                       >(.*?)</a>',re.DOTALL).findall(data)  
    
    # 第3步：打印 (也可以存放到文件或数据库中)
    for i in range(0, len(nameList)):
        print("第%d个酒店的名字为：  %s"%(i,nameList[i]))


###############################################
##                  运行程序 
###############################################
if __name__ =="__main__":
    
    # 要抓取的网页
    url = "http://www.dianping.com/shanghai/hotel/g168n10"

    # 抓取
    fetch(url)





#---------------------------------------------------------
#                         代码讲解
#
"""
讲解：
第1步：模拟浏览器发送请求，用户只需要输入要抓取内容的“网页地址”；

第2步：利用"正则表达式"提取想要的内容

.是任意字符
.?的意思是尽可能少的匹配
.*表示"贪婪匹配"，首先匹配到不能匹配为止，根据后面的正则表达式，会进行回溯。
.*?表示"最小匹配"，一旦匹配成功，不再往下进行。

第3步：保存内容

这里可以存入mysql数据库、存入文件或者打印出来。
"""
#---------------------------------------------------------












    


