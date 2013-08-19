# Automatically precompile assets

load "deploy/assets"
 
# Execute "bundle install" after deploy, but only when really needed
require "bundler/capistrano"
 

# RVM integration
require "rvm/capistrano"
# Application name
set :application, "grub-restaurants"
 
# Application environment
set :rails_env, :production
 
# Deploy username and sudo username
set :user, "ubuntu"
set :user_rails, "rails"
 
# App Domain
set :domain, "ec2-54-227-105-117.compute-1.amazonaws.com"
 
# We don't want to use sudo (root) - for security reasons
set :use_sudo, false
 
# git is our SCM
set :scm, :git
 
# Use github repository
set :repository, "ssh://git@github.com/rb512/grub-restaurants.git"
 
# master is our default git branch
set :branch, "master"
 
# Deploy via github
set :deploy_via, :remote_cache
set :deploy_to, "/home/ubuntu/grub/#{application}"
 
 
# We have all components of the app on the same server
server domain, :app, :web, :db, :primary => true
ssh_options[:keys] = "/Users/rahulbaxi/Downloads/grubshire.pem"
ssh_options[:forward_agent] = true

# Fix log/ and pids/ permissions
after "deploy:setup", "deploy:fix_setup_permissions"
 
# Fix permissions
before "deploy:start", "deploy:fix_permissions"
after "deploy:restart", "deploy:fix_permissions"
after "assets:precompile", "deploy:fix_permissions"
 
# Clean-up old releases
after "deploy:restart", "deploy:cleanup"
 
namespace :deploy do
  task :start, :roles => :app, :except => { :no_release => true } do
    # Start nginx server using sudo (rails)
    run " sudo /etc/init.d/nginx start"
  end
 
  task :stop, :roles => :app, :except => { :no_release => true } do
    run "sudo /etc/init.d/nginx stop"
  end
 
  task :restart, :roles => :app, :except => { :no_release => true } do
    run "sudo /etc/init.d/nginx restart"
  end
 
  task :fix_setup_permissions, :roles => :app, :except => { :no_release => true } do
    run "#{sudo} chgrp #{user_rails} #{shared_path}/log"
    run "#{sudo} chgrp #{user_rails} #{shared_path}/pids"
  end
 
  task :fix_permissions, :roles => :app, :except => { :no_release => true } do
    # To prevent access errors while moving/deleting
    run "#{sudo} chmod 775 #{current_path}/log"
    run "#{sudo} find #{current_path}/log/ -type f -exec chmod 664 {} \\;"
    run "#{sudo} find #{current_path}/log/ -exec chown #{user}:#{user_rails} {} \\;"
    run "#{sudo} find #{current_path}/tmp/ -type f -exec chmod 664 {} \\;"
    run "#{sudo} find #{current_path}/tmp/ -type d -exec chmod 775 {} \\;"
    run "#{sudo} find #{current_path}/tmp/ -exec chown #{user}:#{user_rails} {} \\;"
  end
 
  # Precompile assets only when needed
  
end
 
# Helper function
def remote_file_exists?(full_path)
  'true' ==  capture("if [ -e #{full_path} ]; then echo 'true'; fi").strip
end
