api_mime_types = ['application/vnd.api+json', 'application/vnd.api+json; ext=hitgrid/embedded']

Mime::Type.unregister :json
Mime::Type.register 'application/json', :json, api_mime_types
