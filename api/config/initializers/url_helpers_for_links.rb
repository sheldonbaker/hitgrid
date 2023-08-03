module ActiveModel
  class Serializer
    module Adapter
      class JsonApi
        class Link
          def routes
            Rails.application.routes.url_helpers
          end
        end
      end
    end
  end
end
