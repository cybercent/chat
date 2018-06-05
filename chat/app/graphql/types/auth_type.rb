require 'graphql/batch'
Types::AuthType = GraphQL::ObjectType.define do
  name 'AuthType'

  field :jwt, !types.String
  field :user, Types::UserType
end
