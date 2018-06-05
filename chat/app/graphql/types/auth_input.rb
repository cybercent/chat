Types::AuthInput = GraphQL::InputObjectType.define do
  name 'AuthInput'

  argument :username, !types.String
end
