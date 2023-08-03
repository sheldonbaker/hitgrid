class ApplicationSerializer < ActiveModel::Serializer
  def current_profile
    scope
  end

  # CANNOT BE USED if the belongs_to `includes` related...
  def self.naive_belongs_to(name, options = {}, &block)
    belongs_to(name, options, &block)

    define_method name do
      if object.respond_to?(:"#{name}_id")
        if id = object.send(:"#{name}_id")
          class_name = object.class._reflections[name.to_s].options[:class_name] || name.to_s.classify
          type = class_name.pluralize.underscore
          
          return { type: type, id: id }
        end
      end

      object.send(:"#{name}")
    end
  end
end
