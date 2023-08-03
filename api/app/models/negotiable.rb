class Negotiable < ActiveRecord::Base
  self.abstract_class = true

  belongs_to :trade_deadline
  validates_presence_of :trade_deadline

  has_many :participations, as: :negotiable, class_name: 'NegotiableParticipation', dependent: :destroy
  accepts_nested_attributes_for :participations

  has_many :teams, through: :participations

  def self.for_team(team_id)
    joins(:participations).where('negotiable_participations.team_id = ?', team_id)
  end
end
