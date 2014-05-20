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
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20140519181806) do

  create_table "cart_items", force: true do |t|
    t.integer  "user_id"
    t.integer  "item_id"
    t.integer  "quantity"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "cats", force: true do |t|
    t.string   "name"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "comments", force: true do |t|
    t.integer  "user_id"
    t.integer  "item_id"
    t.string   "title"
    t.text     "body"
    t.integer  "user_rating"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "hotwords", force: true do |t|
    t.string   "query"
    t.text     "result"
    t.integer  "rank"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "hotwords", ["query"], name: "index_hotwords_on_query"

  create_table "item_infos", force: true do |t|
    t.integer  "item_id"
    t.text     "description"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "item_stats", force: true do |t|
    t.integer  "item_id"
    t.integer  "rating"
    t.integer  "stocks"
    t.boolean  "released"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "items", force: true do |t|
    t.string   "title"
    t.float    "price"
    t.string   "img"
    t.integer  "cat_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "clicks"
  end

  create_table "orders", force: true do |t|
    t.integer  "user_id"
    t.integer  "total"
    t.integer  "status"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "user_infos", force: true do |t|
    t.integer  "user_id"
    t.string   "country"
    t.string   "state"
    t.string   "address"
    t.string   "zipcode"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "users", force: true do |t|
    t.string   "name"
    t.string   "email"
    t.string   "password_digest"
    t.string   "session_token"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "users", ["session_token"], name: "index_users_on_session_token"

end
