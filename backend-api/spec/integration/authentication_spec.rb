# spec/requests/authentication_spec.rb
require 'swagger_helper'

describe 'Authentication API' do

  path '/authenticate/face' do

    post 'Authenticate user using facial recognition' do
      tags 'Authentication'
      consumes 'application/json'
      parameter name: :user, in: :body, schema: {
        type: :object,
        properties: {
          face_data: { type: :string },
        },
        required: ['face_data']
      }

      response '200', 'User authenticated' do
        let(:user) { { face_data: 'some_encoded_data' } }
        run_test!
      end

      response '401', 'Unauthorized' do
        let(:user) { { face_data: '' } }
        run_test!
      end
    end
  end

  path '/authenticate/pin' do

    post 'Authenticate user using pin' do
      tags 'Authentication'
      consumes 'application/json'
      parameter name: :user, in: :body, schema: {
        type: :object,
        properties: {
          pin: { type: :string },
        },
        required: ['pin']
      }

      response '200', 'User authenticated' do
        let(:user) { { pin: '1234' } }
        run_test!
      end

      response '401', 'Unauthorized' do
        let(:user) { { pin: '' } }
        run_test!
      end
    end
  end

end
