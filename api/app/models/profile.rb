class Profile < ActiveRecord::Base
  acts_as_reader

  scope :published, -> { where(published: true) }

  has_one :user
  has_many :teams
  belongs_to :favourite_club, class_name: 'Club'

  has_attached_file :picture, styles: { thumb: '100x100>' }
  process_in_background :picture # TODO - clear temp_picture_url when done

  before_save :set_published
  before_save :process_raw_picture

  validates_attachment_content_type :picture, content_type: /\Aimage\/.*\Z/

  validates :handle, presence: true, if: :published?
  validates :handle, length: { in: 3..20 }, uniqueness: true, format: { with: /\A[a-zA-Z0-9_\-]+\z/ }, allow_blank: true

  def picture_url
    picture.expiring_url 3600, :thumb
  end

  def raw_picture_id=(id)
    @raw_picture_id = id
  end

  def consider_handle(handle)
    self.suggested_handle = handle unless Profile.exists?(handle: handle)
  end

  def consider_identity_picture(url)
    self.temp_picture_url = url
    self.picture = url
  end

  def has_claimed_team?(trade_deadline_id)
    teams.any? do |t|
      t.trade_deadline_id == trade_deadline_id
    end
  end

  def self.find_by_id_or_handle(id_or_handle)
    if (Float(id_or_handle) rescue false)
      self.find_by_id(id_or_handle)
    else
      self.where(handle: id_or_handle).first
    end
  end

  private

  def set_published
    self.published = !handle.nil? && !favourite_club.nil?
    true
  end

  def process_raw_picture
    if @raw_picture_id
      s3 = Aws::S3::Resource.new
      bucket = s3.bucket(ENV['TMP_PICTURES_BUCKET'])

      picture = bucket.object(@raw_picture_id)
      
      begin          
        picture.wait_until_exists do |w|
          w.delay = 2
          w.max_attempts = 3
        end
      rescue => e
        errors.add(:raw_picture_id)
        return false
      end

      url = picture.presigned_url(:get, expires_in: 60)

      self.temp_picture_url = url
      self.picture = url
    end
  end
end
