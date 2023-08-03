module ActiveModel
  class Serializer
    module Adapter
      class JsonApi
        module Deserialization
          module_function

          def parse_relationships(relationships, options)
            can_embed = (options[:exts] || []).include?('hitgrid/embedded')

            relationships
              .map { |(k, v)| parse_relationship(k, v['data'], options.merge({ embedded: can_embed && v['embedded'] == true })) }
              .reduce({}, :merge)
          end

          def parse_relationship(assoc_name, assoc_data, options)
            if options[:embedded]
              prefix_key = field_key(assoc_name, options).to_s

              polymorphic = (options[:polymorphic] || []).find { |p| p.is_a?(Hash) && p.has_key?(assoc_name.to_sym) }.try(:[], assoc_name.to_sym) || []
              opts = options.except(:polymorphic)
              opts[:polymorphic] = polymorphic

              hash = 
                if assoc_data.is_a?(Array)
                  { "#{prefix_key}_attributes".to_sym => assoc_data.map { |ri| parse(ri, opts)} }
                else
                  val = parse({ 'data' => assoc_data }, opts)
                  val.merge!(:type => assoc_data.try(:[], 'type').try(:singularize).try(:underscore).try(:classify)) if polymorphic

                  { "#{prefix_key}_attributes".to_sym => val }
                end
            else
              prefix_key = field_key(assoc_name, options).to_s.singularize
              hash =
                if assoc_data.is_a?(Array)
                  { "#{prefix_key}_ids".to_sym => assoc_data.map { |ri| ri['id'] } }
                else
                  { "#{prefix_key}_id".to_sym => assoc_data ? assoc_data['id'] : nil }
                end

                polymorphic = (options[:polymorphic] || []).include?(assoc_name.to_sym)
                hash.merge!("#{prefix_key}_type".to_sym => assoc_data.try(:[], 'type').try(:singularize).try(:underscore).try(:classify)) if polymorphic
            end

            hash
          end
        end
      end
    end
  end
end