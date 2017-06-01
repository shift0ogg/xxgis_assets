# -*- coding: utf-8 -*-
 
import secrets
from django.http import HttpResponse
 
from school.models import Test

# 数据库操作
def testdb(request):
	#response = token_urlsafe(10)
    test1 = Test(name="response")
    test1.save()
    return show(request)


def show(request):
    # 初始化
    response = ""
    response1 = ""
    
    
    # 通过objects这个模型管理器的all()获得所有数据行，相当于SQL中的SELECT * FROM
    list = Test.objects.all()
    for var in list:
        response1 += var.name + " "
    response = response1
    return HttpResponse("<p>" + response + "</p>")



def update(request):
    # 初始化
    test1 = Test.objects.get(name='liuyulin')
    test1.name = 'Google'
    test1.save()
    return HttpResponse("<p>" + "成功" + "</p>")



def delete(request):
    # 初始化
    test1 = Test.objects.get(name='Google')
    test1.delete()
    return show(request)