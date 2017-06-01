# -*- coding: utf-8 -*-
 
#from django.http import HttpResponse
from django.shortcuts import render
from school.models import Test
def index(request):
    context          = {}
    context['hello'] = Test.objects.get(id=3).name
    return render(request, 'hello.html', context)