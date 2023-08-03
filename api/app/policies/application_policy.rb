class ApplicationPolicy
  attr_reader :token, :record

  def initialize(token, record)
    @token = token
    @record = record
  end

  def user
    @user ||= User.find_by_id(@token[:user_id]) if @token[:user_id]
  end

  def profile
    @profile ||= user.try(:profile)
  end

  def show?
    false
  end

  def create?
    false
  end

  def update?
    false
  end

  def destroy?
    false
  end

  def scope
    Pundit.policy_scope!(token, record.class)
  end

  class Scope
    attr_reader :token, :scope

    def initialize(token, scope)
      @token = token
      @scope = scope
    end

    def resolve
      scope
    end

    def user
      @user ||= User.find_by_id(@token[:user_id]) if @token[:user_id]
    end

    def profile
      @profile ||= user.try(:profile)
    end
  end
end
