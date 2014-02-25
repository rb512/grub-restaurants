
# Application environment
set :rails_env, :test

# master is our default git branch
set :branch, "staging"

# We have all components of the app on the same server
set :domain, "ec2-54-227-154-11.compute-1.amazonaws.com"


server domain, :app, :web, :db, :primary => true
ssh_options[:keys] = "/Users/rahulbaxi/Dropbox/all_stuff/GrubShire/grub-staging.pem"
ssh_options[:forward_agent] = true
