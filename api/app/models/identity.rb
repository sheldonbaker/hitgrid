class Identity
  def self.find(provider, credentials)
    "Providers::#{provider.classify}".constantize.new(credentials).identity
  end
end