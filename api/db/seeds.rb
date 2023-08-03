# p1 = Profile.create
# User.create(email: 'asd@asd.asd', password: 'asdasdasd', profile: p1)

# p2 = Profile.create(handle: 'sheldonnbbaker')
# User.create(twitter_id: '14427789', profile: p2)

# Activity.create(key: 'trade-deadline-started', featured: true, image_url: 'features/nuge.jpg')
# Activity.create(key: 'trade-deadline-started', featured: false, payload: { foo: 'bar', baz: Time.zone.now })

# BlogPost.create(title: 'wat', slug: 'wat', body: 'woahas da asd asf dsfsdf ds', author: p1)

# ###

Universe.create!(id: 1)

seeds = Rails.root.join('data', 'normalized')
Dir.foreach(seeds).each do |filename|
  next if filename == '.' || filename == '..'
  yaml = YAML::load_file(seeds.join(filename))
  kind = File.basename(filename, '.yml')
  kind.singularize.classify.constantize.create!(yaml)
end

[2016, 2017, 2018].each do |year|
  (1..7).to_a.each do |round|
    Club.all.each do |club|
      DraftPick.create!(
        league_year_id: year,
        round: round,
        club_id: club.id
      )
    end
  end
end