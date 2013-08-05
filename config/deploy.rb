set :stages %w(production staging)
set :default_stage, "staging"
require 'capistrano/ext/multistage'

set :application, "grub-restaurants"
set :repository, "git@github.com:rb512/grub-restaurants.git"
set :scm, :git

set :deploy_to, "/home/ubuntu/grub"

desc "check production task"
task :check_production do 

	if stage.to_s == "production"
		puts "\n Are you sure you want to deploy to production?"
		puts "\n Enter the password to continue\n"
		password = STDIN.gets[0..7] rescue nil
		if password != 'Oscar2007'
			puts "\n ~~~ Wrong Password ~~"
			exit
		end
	end
end

