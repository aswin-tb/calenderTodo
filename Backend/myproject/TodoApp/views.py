from django.shortcuts import render
from .models import Task
from .serializers import TaskSerializer,UserSerializer
from rest_framework import authentication,permissions
from rest_framework.viewsets import ViewSet,ModelViewSet
from rest_framework.response import Response

class SignupView(ViewSet):
    def create(self,request):
        seralizer=UserSerializer(data=request.data)
        if seralizer.is_valid():
            seralizer.save()
            return Response(data=seralizer.data)
        else:
            return Response(data=seralizer.errors)
        
class TaskView(ViewSet):
    authentication_classes=[authentication.TokenAuthentication]
    permission_classes=[permissions.IsAuthenticated]
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    def list(self,request):
        tasks = self.queryset.filter(user=request.user)
        serializer = self.serializer_class(tasks, many=True)
        return Response(serializer.data)   
    def create(self,request):
        serializer = TaskSerializer(data=request.data, context={'user': request.user})
        if serializer.is_valid():
            serializer.save()
            return Response(data=serializer.data)
        else:
            print(serializer.errors)            
            return Response(data=serializer.errors)
    def destroy(self, request, pk=None):
        task = self.queryset.get(id=pk, user=request.user)
        task.delete() 
        return Response({'detail': 'Task deleted successfully.'})
    def retrieve(self, request, pk=None):
        task = self.queryset.get(id=pk, user=request.user)
        serializer = self.serializer_class(task)
        return Response(serializer.data) 

class TaskUDView(ModelViewSet):
    authentication_classes=[authentication.TokenAuthentication]
    permission_classes=[permissions.IsAuthenticated]
    queryset = Task.objects.all()
    serializer_class = TaskSerializer