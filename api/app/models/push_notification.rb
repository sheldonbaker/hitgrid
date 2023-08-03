class PushNotification < ActiveRecord::Base
  belongs_to :push_registration
  validates_presence_of :push_registration, :title, :body, :target_path

  before_create :send_push

  def self.pluck_last_for_endpoint!(endpoint)
    notif = self.joins(:push_registration).where('push_registrations.endpoint = ?', endpoint).limit(1).order('id DESC').first
    
    if notif
      # notif.destroy
    end

    notif
  end

  private

  def send_push
    response = HTTParty.post('http://android.googleapis.com/gcm/send', { headers: gcm_headers, body: gcm_data })
    response.code == 200 && JSON.parse(response.body)['success']
  end

  private

  def gcm_headers
    { 'Authorization' => "key=#{ENV['GCM_KEY']}", 'Content-Type' => 'application/json' }
  end

  def gcm_data
    { registration_ids: [push_registration.registration_id] }.to_json
  end
end