require 'graphql/batch'
Types::UserType = GraphQL::ObjectType.define do
  name 'User'

  field :id, !types.ID
  field :username, !types.String

  field :messages, !types[Types::MessageType] do
    preload :messages
    resolve lambda { |obj, _args, _ctx|
      obj.messages
    }
  end
end
