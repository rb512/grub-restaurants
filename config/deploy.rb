# Automatically precompile assets
load "deploy/assets"

# Execute "bundle install" after deploy, but only when really needed
require "bundler/capistrano"
 

# RVM integration
require "rvm/capistrano"
require 'capistrano/ext/multistage'

set :stages, %w(production staging)
set :default_stage, "staging"
set :stage_dir, "app/config/deploy"

# Application name
set :application, "grub-restaurants"
 
# Deploy username and sudo username
set :user, "ubuntu"
set :user_rails, "rails"
 

# We don't want to use sudo (root) - for security reasons
set :use_sudo, false
 
# git is our SCM
set :scm, :git
 
# Use github repository
set :repository, 'git@github.com:rb512/grub-restaurants.git'


# Deploy via github
set :deploy_via, :remote_cache
set :deploy_to, "/home/ubuntu/grub/#{application}"


# Fix log/ and pids/ permissions
after "deploy:setup", "deploy:fix_setup_permissions"
 
# Fix permissions
before "deploy:start", "deploy:fix_permissions"
after "deploy:restart", "deploy:fix_permissions"
after "assets:precompile", "deploy:fix_permissions"
 
# Clean-up old releases
after "deploy:restart", "deploy:cleanup"
 
#Add database.yml to new release
before "deploy:assets:precompile", "deploy:db:symlink" 

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
 
  namespace :db do
    desc "Create database yaml in shared path"
    task :test_config do
      set :database_username do
        "root"
      end
      set :database_password do
       Capistrano::CLI.password_prompt "Database Password: "
      end
      db_config = <<-EOF
        base: &base
          adapter: mysql2
          encoding: utf8
          reconnect: false
          username: #{database_username}
          password: #{database_password}
          pool: 5
 
        development:
          host: localhost
          database: #{application}_development
          <<: *base
 
        test:
          database: #{application}_test
          <<: *base
      EOF
      
      run "mkdir -p #{shared_path}/config"
      put db_config, "#{shared_path}/config/database.yml"
    end
    
    task :configure do
      db_config = <<-EOF
        base: &base
          adapter: mysql2
          encoding: utf8
          reconnect: false
          pool: 5
        production:
          host: grub.cdrowyhnyr29.us-east-1.rds.amazonaws.com
          database: grub_prod
          username: awsgrub
          password: #{Capistrano::CLI.password_prompt "Prod Database Password: "}
          <<: *base
      EOF
 
      run "mkdir -p #{shared_path}/config"
      put db_config, "#{shared_path}/config/database.yml"
    end
 
    desc "Make symlink for database yaml"
    task :symlink do
      run "ln -nfs #{shared_path}/config/database.yml #{latest_release}/config/database.yml"
    end
    
    desc "Remove database.yml file from current"
    task :remove_db_yml do
      run "rm #{current_path}/config/database.yml"
    end
  end
  
end
 
# Helper function
def remote_file_exists?(full_path)
  'true' ==  capture("if [ -e #{full_path} ]; then echo 'true'; fi").strip
end
