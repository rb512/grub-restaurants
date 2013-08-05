set :user, "ubuntu"
server "ec2-54-227-105-117.compute-1.amazonaws.com", :app, :web, :db
:primary => true
ssh_options[:keys] = "/Users/rahulbaxi/Downloads/grubshire.pem"
