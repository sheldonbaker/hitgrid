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

ActiveRecord::Schema.define(version: 20160220164538) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "activities", force: :cascade do |t|
    t.string   "key"
    t.string   "image_url"
    t.boolean  "featured"
    t.json     "payload"
    t.datetime "created_at",        null: false
    t.datetime "updated_at",        null: false
    t.integer  "trade_deadline_id"
  end

  create_table "allocations", force: :cascade do |t|
    t.integer  "universe_id"
    t.integer  "club_id"
    t.date     "start_date"
    t.date     "end_date"
    t.integer  "league_year_id"
    t.integer  "contract_year_id"
    t.boolean  "retained"
    t.decimal  "retained_pct",         precision: 4,  scale: 2
    t.boolean  "on_ltir"
    t.datetime "created_at",                                                    null: false
    t.datetime "updated_at",                                                    null: false
    t.decimal  "cap_cost",             precision: 12, scale: 4
    t.decimal  "cap_hit",              precision: 10, scale: 2
    t.boolean  "loaned"
    t.boolean  "suspended"
    t.boolean  "on_ir"
    t.integer  "start_season_day"
    t.integer  "end_season_day"
    t.boolean  "exempt_from_50_limit",                          default: false
  end

  create_table "assets", force: :cascade do |t|
    t.integer  "universe_id"
    t.string   "assetable_type"
    t.integer  "assetable_id"
    t.date     "start_date"
    t.date     "end_date"
    t.datetime "created_at",          null: false
    t.datetime "updated_at",          null: false
    t.integer  "club_id"
    t.integer  "assetable_player_id"
  end

  create_table "blog_posts", force: :cascade do |t|
    t.string   "slug"
    t.string   "title"
    t.text     "body"
    t.string   "image_url"
    t.integer  "author_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "bonus_overages", force: :cascade do |t|
    t.integer  "universe_id"
    t.integer  "club_id"
    t.integer  "league_year_id"
    t.decimal  "cap_cost",       precision: 12, scale: 4
    t.datetime "created_at",                              null: false
    t.datetime "updated_at",                              null: false
  end

  create_table "buyout_years", force: :cascade do |t|
    t.integer  "buyout_id"
    t.integer  "contract_year_id"
    t.integer  "league_year_id"
    t.decimal  "cap_cost",         precision: 12, scale: 4
    t.datetime "created_at",                                null: false
    t.datetime "updated_at",                                null: false
  end

  create_table "buyouts", force: :cascade do |t|
    t.integer  "universe_id"
    t.integer  "club_id"
    t.integer  "contract_id"
    t.boolean  "is_compliance"
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
  end

  create_table "calculations", force: :cascade do |t|
    t.integer  "universe_id"
    t.integer  "club_id"
    t.date     "date"
    t.decimal  "cap_space",                          precision: 10, scale: 2
    t.decimal  "season_end_cap_space",               precision: 10, scale: 2
    t.datetime "created_at",                                                  null: false
    t.datetime "updated_at",                                                  null: false
    t.decimal  "cap_usage",                          precision: 10, scale: 2
    t.decimal  "season_end_cap_usage",               precision: 10, scale: 2
    t.decimal  "trade_deadline_cap_usage",           precision: 10, scale: 2
    t.decimal  "trade_deadline_cap_space",           precision: 10, scale: 2
    t.decimal  "absorbable_cap_hit",                 precision: 11, scale: 2
    t.decimal  "trade_deadline_absorbable_cap_hit",  precision: 11, scale: 2
    t.decimal  "ltir_relief",                        precision: 10, scale: 2
    t.decimal  "trade_deadline_ltir_relief",         precision: 10, scale: 2
    t.decimal  "season_end_ltir_relief",             precision: 10, scale: 2
    t.decimal  "bonus_cushion_usage",                precision: 10, scale: 2
    t.decimal  "trade_deadline_bonus_cushion_usage", precision: 10, scale: 2
    t.decimal  "season_end_bonus_cushion_usage",     precision: 10, scale: 2
    t.integer  "team_id"
    t.integer  "contracts_count"
  end

  create_table "ceded_conditionals", force: :cascade do |t|
    t.integer  "universe_id"
    t.date     "start_date"
    t.date     "end_date"
    t.integer  "club_id"
    t.integer  "conditional_id"
    t.datetime "created_at",     null: false
    t.datetime "updated_at",     null: false
  end

  create_table "chat_posts", force: :cascade do |t|
    t.integer  "trade_deadline_id"
    t.integer  "team_id"
    t.text     "body"
    t.datetime "created_at",        null: false
    t.datetime "updated_at",        null: false
  end

  create_table "clubs", force: :cascade do |t|
    t.string   "slug"
    t.string   "abbr"
    t.string   "division"
    t.string   "conference"
    t.string   "geographic_name"
    t.string   "distinctive_name"
    t.string   "full_name"
    t.datetime "created_at",       null: false
    t.datetime "updated_at",       null: false
  end

  create_table "comments", force: :cascade do |t|
    t.text     "body"
    t.integer  "profile_id"
    t.string   "commentable_type"
    t.integer  "commentable_id"
    t.datetime "created_at",        null: false
    t.datetime "updated_at",        null: false
    t.integer  "team_id"
    t.integer  "trade_deadline_id"
  end

  create_table "conditionals", force: :cascade do |t|
    t.string   "condition"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
    t.integer  "universe_id"
  end

  create_table "conditionals_draft_picks", force: :cascade do |t|
    t.integer "conditional_id"
    t.integer "draft_pick_id"
  end

  create_table "contingencies", force: :cascade do |t|
    t.string  "condition"
    t.integer "universe_id"
  end

  create_table "contingencies_draft_picks", force: :cascade do |t|
    t.integer "contingency_id"
    t.integer "draft_pick_id"
  end

  create_table "contract_years", force: :cascade do |t|
    t.integer  "contract_id"
    t.integer  "league_year_id"
    t.datetime "created_at",                                                       null: false
    t.datetime "updated_at",                                                       null: false
    t.boolean  "has_ntc",                                          default: false, null: false
    t.boolean  "has_nmc",                                          default: false, null: false
    t.decimal  "max_performance_bonuses", precision: 10, scale: 2
    t.decimal  "signing_bonus",           precision: 10, scale: 2
    t.decimal  "minor_salary",            precision: 10, scale: 2
    t.decimal  "nhl_salary",              precision: 10, scale: 2
    t.decimal  "avg_value",               precision: 10, scale: 2
    t.boolean  "slidden"
  end

  create_table "contracts", force: :cascade do |t|
    t.integer  "player_id"
    t.boolean  "is_two_way"
    t.datetime "created_at",                                                       null: false
    t.datetime "updated_at",                                                       null: false
    t.boolean  "is_entry_level",                                   default: false
    t.boolean  "is_35_plus",                                       default: false
    t.integer  "universe_id"
    t.decimal  "value",                   precision: 10, scale: 2
    t.decimal  "avg_performance_bonuses", precision: 10, scale: 2
  end

  create_table "delayed_jobs", force: :cascade do |t|
    t.integer  "priority",   default: 0, null: false
    t.integer  "attempts",   default: 0, null: false
    t.text     "handler",                null: false
    t.text     "last_error"
    t.datetime "run_at"
    t.datetime "locked_at"
    t.datetime "failed_at"
    t.string   "locked_by"
    t.string   "queue"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "delayed_jobs", ["priority", "run_at"], name: "delayed_jobs_priority", using: :btree

  create_table "draft_picks", force: :cascade do |t|
    t.integer  "round"
    t.integer  "club_id"
    t.integer  "league_year_id"
    t.boolean  "compensatory",   default: false, null: false
    t.datetime "created_at",                     null: false
    t.datetime "updated_at",                     null: false
  end

  create_table "email_confirmations", force: :cascade do |t|
    t.integer  "user_id"
    t.string   "hashed_token"
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
    t.string   "user_email"
  end

  create_table "league_years", force: :cascade do |t|
    t.date     "season_start_date"
    t.date     "season_end_date"
    t.integer  "season_days"
    t.integer  "upper_limit"
    t.integer  "lower_limit"
    t.datetime "created_at",          null: false
    t.datetime "updated_at",          null: false
    t.integer  "minimum_salary"
    t.date     "start_date"
    t.date     "end_date"
    t.integer  "bonus_cushion"
    t.date     "trade_deadline_date"
  end

  create_table "ltir_reliefs", force: :cascade do |t|
    t.integer  "universe_id"
    t.integer  "club_id"
    t.date     "start_date"
    t.date     "end_date"
    t.integer  "start_season_day"
    t.integer  "end_season_day"
    t.datetime "created_at",       null: false
    t.datetime "updated_at",       null: false
    t.integer  "contract_year_id"
  end

  create_table "messages", force: :cascade do |t|
    t.integer  "sender_id"
    t.integer  "receiver_id"
    t.string   "body"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
    t.integer  "proposal_id"
  end

  create_table "negotiable_ingredients", force: :cascade do |t|
    t.integer  "negotiable_participation_id"
    t.string   "assetable_type"
    t.integer  "assetable_id"
    t.datetime "created_at",                  null: false
    t.datetime "updated_at",                  null: false
    t.string   "provisionable_type"
    t.integer  "provisionable_id"
    t.integer  "allocation_id"
  end

  create_table "negotiable_participations", force: :cascade do |t|
    t.string   "negotiable_type"
    t.integer  "negotiable_id"
    t.integer  "team_id"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
    t.boolean  "initiating"
    t.boolean  "consenting"
  end

  create_table "news_items", force: :cascade do |t|
    t.integer  "trade_deadline_id"
    t.string   "reporter"
    t.string   "key"
    t.jsonb    "payload"
    t.datetime "created_at",        null: false
    t.datetime "updated_at",        null: false
  end

  create_table "notification_subscriptions", force: :cascade do |t|
    t.string   "channel"
    t.boolean  "enabled"
    t.datetime "created_at",        null: false
    t.datetime "updated_at",        null: false
    t.integer  "user_id"
    t.integer  "registerable_id"
    t.string   "registerable_type"
  end

  create_table "players", force: :cascade do |t|
    t.string   "woi_id"
    t.string   "first_name"
    t.string   "last_name"
    t.string   "position"
    t.string   "handedness"
    t.datetime "created_at",             null: false
    t.datetime "updated_at",             null: false
    t.string   "full_name",  limit: 255
    t.date     "birthdate"
    t.integer  "hdb_id"
  end

  create_table "profiles", force: :cascade do |t|
    t.string   "handle"
    t.string   "suggested_handle"
    t.boolean  "published",            default: false, null: false
    t.datetime "created_at",                           null: false
    t.datetime "updated_at",                           null: false
    t.string   "name"
    t.string   "picture_file_name"
    t.string   "picture_content_type"
    t.integer  "picture_file_size"
    t.datetime "picture_updated_at"
    t.string   "temp_picture_url"
    t.string   "picture_key"
    t.datetime "picture_processed_at"
    t.integer  "favourite_club_id"
  end

  create_table "proposals", force: :cascade do |t|
    t.integer  "trade_deadline_id"
    t.datetime "created_at",        null: false
    t.datetime "updated_at",        null: false
    t.integer  "countered_id"
    t.boolean  "consented"
    t.date     "date"
    t.integer  "counter_id"
    t.integer  "trade_id"
  end

  create_table "push_notifications", force: :cascade do |t|
    t.string   "title"
    t.string   "body"
    t.string   "icon"
    t.datetime "created_at",           null: false
    t.datetime "updated_at",           null: false
    t.integer  "push_registration_id"
    t.string   "target_path"
  end

  create_table "push_registrations", force: :cascade do |t|
    t.string   "endpoint"
    t.string   "client_id"
    t.string   "user_agent"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer  "user_id"
    t.boolean  "enabled"
  end

  create_table "read_marks", force: :cascade do |t|
    t.integer  "readable_id"
    t.string   "readable_type", null: false
    t.integer  "reader_id"
    t.string   "reader_type",   null: false
    t.datetime "timestamp"
  end

  add_index "read_marks", ["reader_id", "reader_type", "readable_type", "readable_id"], name: "read_marks_reader_readable_index", using: :btree

  create_table "recapture_penalties", force: :cascade do |t|
    t.integer  "universe_id"
    t.integer  "club_id"
    t.integer  "contract_id"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  create_table "recapture_penalty_years", force: :cascade do |t|
    t.integer  "recapture_penalty_id"
    t.integer  "league_year_id"
    t.decimal  "cap_cost",             precision: 12, scale: 4
    t.datetime "created_at",                                    null: false
    t.datetime "updated_at",                                    null: false
  end

  create_table "retainers", force: :cascade do |t|
    t.decimal  "absolute_pct", precision: 4, scale: 2
    t.datetime "created_at",                           null: false
    t.datetime "updated_at",                           null: false
  end

  create_table "retention_years", force: :cascade do |t|
    t.integer  "retention_id"
    t.integer  "league_year_id"
    t.decimal  "cap_hit",          precision: 10, scale: 2
    t.datetime "created_at",                                null: false
    t.datetime "updated_at",                                null: false
    t.integer  "contract_year_id"
    t.date     "start_date"
    t.date     "end_date"
    t.integer  "start_season_day"
    t.integer  "end_season_day"
    t.decimal  "cap_cost",         precision: 12, scale: 4
  end

  create_table "retentions", force: :cascade do |t|
    t.integer  "contract_id"
    t.decimal  "absolute_pct", precision: 4, scale: 2
    t.datetime "created_at",                           null: false
    t.datetime "updated_at",                           null: false
    t.integer  "universe_id"
    t.integer  "club_id"
  end

  create_table "rights", force: :cascade do |t|
    t.integer  "player_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "settlement_years", force: :cascade do |t|
    t.integer  "settlement_id"
    t.integer  "league_year_id"
    t.decimal  "cap_cost",       precision: 12, scale: 4
    t.datetime "created_at",                              null: false
    t.datetime "updated_at",                              null: false
  end

  create_table "settlements", force: :cascade do |t|
    t.integer  "universe_id"
    t.integer  "club_id"
    t.integer  "contract_id"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  create_table "sms_registrations", force: :cascade do |t|
    t.string   "phone_number"
    t.string   "verification_code"
    t.datetime "verified_at"
    t.datetime "created_at",        null: false
    t.datetime "updated_at",        null: false
    t.integer  "user_id"
    t.datetime "verifiable_at"
  end

  create_table "teams", force: :cascade do |t|
    t.integer  "universe_id"
    t.integer  "club_id"
    t.integer  "profile_id"
    t.datetime "created_at",        null: false
    t.datetime "updated_at",        null: false
    t.integer  "trade_deadline_id"
  end

  create_table "trade_deadlines", force: :cascade do |t|
    t.datetime "starts_at"
    t.datetime "ends_at"
    t.datetime "created_at",                                  null: false
    t.datetime "updated_at",                                  null: false
    t.integer  "claimed_teams_count",             default: 0, null: false
    t.string   "name",                limit: 255
  end

  create_table "trades", force: :cascade do |t|
    t.integer  "trade_deadline_id"
    t.datetime "created_at",                                     null: false
    t.datetime "updated_at",                                     null: false
    t.date     "date"
    t.integer  "players_involved"
    t.integer  "draft_picks_involved"
    t.decimal  "compensation_involved", precision: 12, scale: 2
  end

  create_table "universes", force: :cascade do |t|
    t.integer  "trade_deadline_id"
    t.datetime "created_at",        null: false
    t.datetime "updated_at",        null: false
    t.date     "date"
    t.integer  "league_year_id"
  end

  create_table "users", force: :cascade do |t|
    t.string   "email"
    t.string   "password_digest"
    t.integer  "profile_id"
    t.string   "twitter_id"
    t.string   "facebook_id"
    t.string   "secret"
    t.boolean  "confirmed",             default: false, null: false
    t.boolean  "subscribed_to_updates", default: false, null: false
    t.datetime "created_at",                            null: false
    t.datetime "updated_at",                            null: false
  end

end
