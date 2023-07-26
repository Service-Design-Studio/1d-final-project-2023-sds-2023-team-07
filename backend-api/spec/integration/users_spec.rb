require 'swagger_helper'

describe 'Users API' do
  path '/users' do
    post 'Creates a new user' do
      tags 'Users'
      consumes 'application/json'
      parameter name: :user, in: :body, schema: {
        type: :object,
        properties: {
          name: { type: :string },
          identification_number: { type: :integer },
          balance: { type: :number },
          pin: { type: :integer },
          face_image_url: { type: :string },
        },
        required: ['name', 'identification_number', 'balance', 'pin', 'face_image_url']
      }

      response '201', 'User created' do
        let(:user) { { name: 'John Doe', identification_number: 123456, balance: 10000, pin: 1234, face_image_url: 'image_url' } }
        run_test!
      end

      response '422', 'Invalid request' do
        let(:user) { { name: '' } }
        run_test!
      end
    end

    get 'Retrieves all users' do
      tags 'Users'
      produces 'application/json'

      response '200', 'Users retrieved' do
        run_test!
      end
    end
  end

  path '/users/{id}' do
    get 'Retrieves a specific user' do
      tags 'Users'
      produces 'application/json'
      parameter name: :id, :in => :path, :type => :integer

      response '200', 'User retrieved' do
        schema type: :object,
          properties: {
            id: { type: :integer },
            name: { type: :string },
            identification_number: { type: :integer },
            balance: { type: :number },
            pin: { type: :integer },
            face_image_url: { type: :string }
          }

        let(:id) { User.create(name: 'John Doe', identification_number: 123456, balance: 10000, pin: 1234, face_image_url: 'image_url').id }
        run_test!
      end

      response '404', 'User not found' do
        let(:id) { 0 }
        run_test!
      end
    end

    patch 'Updates a specific user' do
      tags 'Users'
      consumes 'application/json'
      parameter name: :id, :in => :path, :type => :integer
      parameter name: :user, in: :body, schema: {
        type: :object,
        properties: {
          name: { type: :string },
          identification_number: { type: :integer },
          balance: { type: :number },
          pin: { type: :integer },
          face_image_url: { type: :string },
        },
      }

      response '200', 'User updated' do
        let(:id) { User.create(name: 'John Doe', identification_number: 123456, balance: 10000, pin: 1234, face_image_url: 'image_url').id }
        let(:user) { { name: 'John Smith' } }
        run_test!
      end

      response '404', 'User not found' do
        let(:id) { 0 }
        run_test!
      end
    end

    delete 'Deletes a specific user' do
      tags 'Users'
      parameter name: :id, :in => :path, :type => :integer

      response '200', 'User deleted' do
        let(:id) { User.create(name: 'John Doe', identification_number: 123456, balance: 10000, pin: 1234, face_image_url: 'image_url').id }
        run_test!
      end

      response '404', 'User not found' do
        let(:id) { 0 }
        run_test!
      end
    end
  end
end
