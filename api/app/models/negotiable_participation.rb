class NegotiableParticipation < ActiveRecord::Base
  belongs_to :negotiable, polymorphic: true
  belongs_to :team

  has_many :ingredients, class_name: 'NegotiableIngredient', dependent: :destroy
  accepts_nested_attributes_for :ingredients

  validates_presence_of :negotiable, :team
  validate :negotiable_must_be_unresolved

  before_save :update_negotiable

  private

  def negotiable_must_be_unresolved
    if negotiable.resolvable? && negotiable.resolved?
      errors.add(:base, "#{negotiable.class.to_s.downcase} has already been resolved")
      false
    end
  end

  def update_negotiable
    if initiating
       if consenting == false
        negotiable.update_attributes consented: false
      end
    else
      if consenting == true
        negotiable.update_attributes consented: true
      elsif consenting == false
        negotiable.update_attributes consented: false
      end
    end
  end
end
