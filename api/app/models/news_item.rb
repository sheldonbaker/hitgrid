class NewsItem < ActiveRecord::Base
  REPORTERS = [
    "James Duffey",
    "Bob McKenley",
    "Jay Olbright & Dan O'Dell",
    "Elliotte Freeman",
    "Pierre Lebreux",
    "Ray Corrado"
  ]

  belongs_to :trade_deadline

  validates_presence_of :trade_deadline, :reporter

  before_validation :assign_reporter

  def pusher_channels
    ["private-trade-deadline-#{trade_deadline_id}"]
  end

  private

  def assign_reporter
    self.reporter = self.class::REPORTERS.sample
  end
end
