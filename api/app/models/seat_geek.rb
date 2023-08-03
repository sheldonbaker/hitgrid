class SeatGeek
  include HTTParty
  base_uri 'https://api.seatgeek.com'

  def initialize(ip, club = nil)
    @ip = ip
    @club = club
  end

  def best_event
    self.class.get('/2/events', { query: events_query })['events'].first
  end

  private

  def events_query
    query = { geoip: @ip, aid: partner_id }
    query['taxonomies.name'] = 'nhl'

    if @club
      query['performers.slug'] = @club.seatgeek_slug
    end

    query
  end

  def partner_id
    ENV['SEATGEEK_PARTNER_ID']
  end
end