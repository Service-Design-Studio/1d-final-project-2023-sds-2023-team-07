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

RUN apt-get update && apt-get install -y sqlite3 libsqlite3-dev

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
ENV RAILS_MASTER_KEY=${MASTER_KEY}
# [END cloudrun_rails_dockerfile_key]

# pre-compile Rails assets with master key
# this is not needed since we dont have assets folder
# RUN bundle exec rake assets:precompile 

EXPOSE 8080
# Change this line
CMD ["bundle", "exec", "rails", "server", "-b", "0.0.0.0", "-p", "8080"]


### NOT USING CLOUDBUILD

# # Start from the official ruby image
# FROM ruby:3.0.0-buster

# # Install dependencies
# RUN apt-get update -qq && apt-get install -y nodejs postgresql-client

# # Set the work directory
# WORKDIR /myapp

# # Copy Gemfile and Gemfile.lock into the image
# # We do this before copying the full application to take advantage of Docker's caching mechanism
# COPY Gemfile /myapp/Gemfile
# COPY Gemfile.lock /myapp/Gemfile.lock

# # Install gems
# RUN bundle install

# # Copy the application into the container
# COPY . /myapp

# # Download and install Cloud SQL Proxy
# # RUN wget https://dl.google.com/cloudsql/cloud_sql_proxy.linux.amd64 -O cloud_sql_proxy
# RUN curl -o cloud_sql_proxy https://storage.googleapis.com/cloud-sql-connectors/cloud-sql-proxy/v2.6.0/cloud-sql-proxy.darwin.arm64
# RUN chmod +x cloud_sql_proxy

# # Set environment variables
# ENV DB_SOCKET_DIR=/cloudsql
# ENV INSTANCE_CONNECTION_NAME=backend-dbs-grp7:asia-southeast1:backend-dbs-grp7
# ENV RAILS_ENV=development
# ENV SECRET_KEY_BASE=797a641b837c06c8a84f1a225569db74


# # Copy the service account key into the Docker image
# COPY /service_account.json /service_account.json

# # Start Cloud SQL Proxy, run migrations and start the Rails server
# CMD ./cloud_sql_proxy -dir=${DB_SOCKET_DIR} -instances=${INSTANCE_CONNECTION_NAME} -credential_file=/service_account.json & \
#     bundle exec rails s -p $PORT -b '0.0.0.0'