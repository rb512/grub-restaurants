# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20140220121950) do

  create_table "categories", :force => true do |t|
    t.string   "name"
    t.integer  "menu_id"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  create_table "employees", :force => true do |t|
    t.integer  "restaurant_id"
    t.integer  "owner_id"
    t.string   "name"
    t.string   "category"
    t.string   "phone"
    t.string   "email"
    t.float    "rating",        :default => 0.0
    t.integer  "rating_count",  :default => 0
    t.string   "avatar"
    t.datetime "created_at",                     :null => false
    t.datetime "updated_at",                     :null => false
  end

  create_table "item_options", :force => true do |t|
    t.float    "price"
    t.string   "size"
    t.integer  "menu_item_id"
    t.datetime "created_at",   :null => false
    t.datetime "updated_at",   :null => false
  end

  create_table "line_items", :force => true do |t|
    t.integer  "order_id"
    t.string   "item_name"
    t.float    "item_price"
    t.integer  "menu_item_id"
    t.datetime "created_at",   :null => false
    t.datetime "updated_at",   :null => false
  end

  create_table "menu_items", :force => true do |t|
    t.string   "name"
    t.text     "description"
    t.float    "price"
    t.string   "category"
    t.integer  "menu_id"
    t.datetime "created_at",  :null => false
    t.datetime "updated_at",  :null => false
    t.string   "item_asset"
  end

  create_table "menus", :force => true do |t|
    t.string   "name"
    t.boolean  "is_default"
    t.string   "menu_type"
    t.integer  "owner_id"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  create_table "order_items", :force => true do |t|
    t.integer  "order_id"
    t.string   "name"
    t.integer  "quantity"
    t.integer  "menu_item_id"
    t.datetime "created_at",   :null => false
    t.datetime "updated_at",   :null => false
  end

  create_table "orders", :force => true do |t|
    t.integer  "table_id"
    t.integer  "user_id"
    t.integer  "server_id"
    t.integer  "restaurant_id"
    t.float    "total"
    t.integer  "tablet_id"
    t.datetime "created_at",    :null => false
    t.datetime "updated_at",    :null => false
  end

  create_table "owners", :force => true do |t|
    t.string   "email",                  :default => "", :null => false
    t.string   "encrypted_password",     :default => ""
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          :default => 0
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.string   "confirmation_token"
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
    t.string   "unconfirmed_email"
    t.string   "authentication_token"
    t.datetime "created_at",                             :null => false
    t.datetime "updated_at",                             :null => false
    t.string   "invitation_token"
    t.datetime "invitation_created_at"
    t.datetime "invitation_sent_at"
    t.datetime "invitation_accepted_at"
    t.integer  "invitation_limit"
    t.integer  "invited_by_id"
    t.string   "invited_by_type"
    t.integer  "invitations_count",      :default => 0
    t.string   "name"
  end

  add_index "owners", ["authentication_token"], :name => "index_owners_on_authentication_token", :unique => true
  add_index "owners", ["confirmation_token"], :name => "index_owners_on_confirmation_token", :unique => true
  add_index "owners", ["email"], :name => "index_owners_on_email", :unique => true
  add_index "owners", ["invitation_token"], :name => "index_owners_on_invitation_token", :unique => true
  add_index "owners", ["invitations_count"], :name => "index_owners_on_invitations_count"
  add_index "owners", ["invited_by_id"], :name => "index_owners_on_invited_by_id"
  add_index "owners", ["reset_password_token"], :name => "index_owners_on_reset_password_token", :unique => true

  create_table "restaurants", :force => true do |t|
    t.string   "name"
    t.integer  "owner_id"
    t.string   "location"
    t.string   "phone"
    t.string   "email"
    t.integer  "menu_id"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  create_table "stations", :force => true do |t|
    t.string   "name"
    t.string   "printer_ip"
    t.integer  "menu_id"
    t.integer  "restaurant_id"
    t.datetime "created_at",    :null => false
    t.datetime "updated_at",    :null => false
  end

  create_table "tablets", :force => true do |t|
    t.integer  "restaurant_id"
    t.string   "ip_address"
    t.boolean  "is_server"
    t.integer  "owner_id"
    t.string   "serial_no"
    t.datetime "created_at",    :null => false
    t.datetime "updated_at",    :null => false
  end

end
