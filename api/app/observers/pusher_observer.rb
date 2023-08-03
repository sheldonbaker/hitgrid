class PusherObserver < ActiveRecord::Observer
  observe :trade_deadline, :calculation, :proposal, :trade, :message, :activity, :news_item

  def after_create(model)
    trigger_action(model, :created)
  end

  def after_update(model)
    trigger_action(model, :updated)
  end

  def before_destroy(model)
    trigger_action(model, :deleted)
  end

  def trigger_action(model, action)
    channels = model.try(:pusher_channels) || []

    channels.each do |channel|
      if action == :deleted
        data = [model.class.name.camelize, model.id]
      else
        data = payload_for_model(model)
        data = [model.class.name.camelize, model.id] if data.to_s.bytesize / 1024 >= 10 # 10KB limit on Pusher messages
      end

      Pusher.trigger(channel, action, data)
    end
  end

  protected

  def payload_for_model(model)
    ActiveModel::SerializableResource.new(model, include: model.try(:pusher_includes) || []).as_json
  end
end
