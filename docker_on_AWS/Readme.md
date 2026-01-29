for ecs and self manages ec2 

name it select autscalling 
amazon linux 
min 1 max 2 
t2 micro 
if you want to do ssh then choose the key pair 

click on create  it will crete a server for you 
if you can see your ec2 server is already alunched and autoscalling group is addded 

now lets addd servie in it now 

create a task defination 
select ec2 
enter your requirements here 
and enter the image nginx:latest  
port number here 80 
launch type 
select ec2 
if deamon the n if will just create one copy of it 
oso  choose the task 

and click on create 
do not add laodbalancer and ec2 

if you encounter the issue then its means its related to the RAM as its required 3 