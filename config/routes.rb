GrubshireOnsite::Application.routes.draw do

  resources :tablets
  
  resources :employees

  resources :restaurants
  devise_for :owners

  resources :menus do
    resources :menu_items
  end

  resources :menu_items
  
  namespace :api, defaults: {format: :json} do
    namespace :v1  do
      match 'get_data' => 'grub_client#get_data', :as => 'get_data'
      match 'register_tablet' => 'grub_client#register_tablet'
      match 'get_server_ip' => 'grub_client#get_server_ip'
      match 'rate_server' => 'grub_client#rate_server'
      match 'submit_order' => 'grub_client#submit_order'
    end
  end
  
  root :to => 'menus#index'
  match 'authenticate' => 'dashboard#authenticate', :as => 'authenticate'
  match 'my_account' => 'dashboard#my_account', :as => 'my_account'
  match 'daily_special' => 'menus#daily_special', :as => 'daily_special'
  # match 'my_menu_item/:id' => 'menus#new_menu_item', :as => 'my_menu_item'
#   match 'create_menu_item' => 'menus#create_menu_item', :as => 'create_menu_item'
#   
#   match '/menu/:menu_id/menu_item/:id' => 'menus#destroy_menu_item'
  # The priority is based upon order of creation:
  # first created -> highest priority.

  # Sample of regular route:
  #   match 'products/:id' => 'catalog#view'
  # Keep in mind you can assign values other than :controller and :action

  # Sample of named route:
  #   match 'products/:id/purchase' => 'catalog#purchase', :as => :purchase
  # This route can be invoked with purchase_url(:id => product.id)

  # Sample resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Sample resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Sample resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Sample resource route with more complex sub-resources
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', :on => :collection
  #     end
  #   end

  # Sample resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end

  # You can have the root of your site routed with "root"
  # just remember to delete public/index.html.
  # root :to => 'welcome#index'

  # See how all your routes lay out with "rake routes"

  # This is a legacy wild controller route that's not recommended for RESTful applications.
  # Note: This route will make all actions in every controller accessible via GET requests.
  # match ':controller(/:action(/:id))(.:format)'
end
