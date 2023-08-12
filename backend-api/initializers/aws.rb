# config/initializers/aws.rb

Aws.config.update(
    region: 'ap-southeast-1',
    credentials: Aws::Credentials.new(ENV["AWS_KEY_LEFT"], ENV["AWS_KEY_RIGHT"])
)