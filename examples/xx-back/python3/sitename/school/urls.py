from django.conf.urls import url

from . import views , testdb

urlpatterns = [
    url(r'^$', views.index, name='index'),    
    url(r'^testdb$', testdb.testdb),
    url(r'^show$', testdb.show),
    url(r'^update$', testdb.update),
    url(r'^delete$', testdb.delete),
]