# Use the official Ruby image from Docker Hub
# https://hub.docker.com/_/ruby

# [START cloudrun_rails_base_image]
# Pinning the OS to buster because the nodejs install script is buster-specific.
# Be sure to update the nodejs install command if the base image OS is updated.

FROM ruby:3.0.0-buster
# FROM arm64v8/ruby:3.0.0-buster

# [END cloudrun_rails_base_image]

# RUN (curl -sS https://deb.nodesource.com/gpgkey/nodesource.gpg.key | gpg --dearmor | apt-key add -) && \
#     echo "deb https://deb.nodesource.com/node_14.x buster main"      > /etc/apt/sources.list.d/nodesource.list && \
#     apt-get update && apt-get install -y nodejs lsb-release

# # RUN (curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -) && \
# #     echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list && \
# #     apt-get update && apt-get install -y yarn
# RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | gpg --dearmor | tee /usr/share/keyrings/yarn-archive-keyring.gpg && \
#     echo "deb [signed-by=/usr/share/keyrings/yarn-archive-keyring.gpg] https://dl.yarnpkg.com/debian stable main" | tee /etc/apt/sources.list.d/yarn.list && \
#     apt-get update && apt-get install -y yarn

RUN apt-get update && apt-get install -y curl gnupg && \
    curl -fsSL https://deb.nodesource.com/setup_14.x | bash - && \
    apt-get install -y nodejs

WORKDIR /app

# Application dependencies
COPY Gemfile Gemfile.lock ./

# RUN gem install bundler && \
#     bundle config set --local deployment 'true' && \
#     bundle config set --local without 'development test' && \
#     bundle install

# ... (previous lines unchanged)

RUN gem install bundler  && \
    bundle lock --remove-platform ruby && \
    bundle lock --add-platform x86_64-linux && \
    bundle lock --add-platform ruby && \
    bundle config set --local deployment 'true' && \
    bundle config set --local without 'development test' && \
    bundle config set --local force_ruby_platform 'true' && \
    bundle install
# Add the following line
RUN file /usr/local/bundle/bin/bundle


# ... (remaining lines unchanged)

# Copy application code to the container image
COPY . /app

ENV RAILS_ENV=production
# ENV RAILS_ENV=development
ENV RAILS_SERVE_STATIC_FILES=true
# Redirect Rails log to STDOUT for Cloud Run to capture
ENV RAILS_LOG_TO_STDOUT=true
# [START cloudrun_rails_dockerfile_key]
ARG MASTER_KEY
# ENV RAILS_MASTER_KEY=${MASTER_KEY}
ENV RAILS_MASTER_KEY=797a641b837c06c8a84f1a225569db74
# [END cloudrun_rails_dockerfile_key]

# pre-compile Rails assets with master key
# this is not needed since we dont have assets folder
# RUN bundle exec rake assets:precompile 

EXPOSE 8080
# Change this line
CMD ["bundle", "exec", "rails", "server", "-b", "0.0.0.0", "-p", "8080"]

# To these lines
# ENTRYPOINT ["/usr/local/bundle/bin/bundle"]
# CMD ["exec", "rails", "server", "-b", "0.0.0.0", "-p", "8080"]