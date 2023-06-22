# spec/rails_helper.rb

# Add any additional requires here
require 'spec_helper'
require File.expand_path('../../config/environment', __FILE__)
require 'rspec/rails'
require 'factory_bot'
FactoryBot.find_definitions

# ... additional configuration or setup code ...

RSpec.configure do |config|
  # ... RSpec configuration ...
end
