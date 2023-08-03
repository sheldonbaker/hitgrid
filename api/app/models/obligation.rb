class Obligation
  include ActiveModel::Model
  include ActiveModel::Serialization
  
  attr_reader :obligatable

  def initialize(obligatable)
    @obligatable = obligatable
  end

  def id
    [@obligatable.class.name.camelize, @obligatable.id].join('-')
  end

  def self.for_team(team_id)
    obligations = []

    # [Allocation, RetentionYear, BuyoutYear, RecapturePenaltyYear, SettlementYear, BonusOverage].each do |klass|
    [Allocation].each do |klass|
      klass.universable.for_team(team_id).map do |obligatable|
        obligations.push(new(obligatable))
      end
    end

    obligations
  end
end
