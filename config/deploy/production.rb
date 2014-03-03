
# Application environment
set :rails_env, :production


# master is our default git branch
set :branch, "master"

# App Domain
set :domain, "ec2-54-227-105-117.compute-1.amazonaws.com"
 
# We have all components of the app on the same server
server domain, :app, :web, :db, :primary => true
ssh_options[:keys] = "/Users/Dropbpx/all_stuff/GrubShire/grubshire.pem"
ssh_options[:forward_agent] = true