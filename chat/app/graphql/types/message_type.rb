require 'graphql/batch'
Types::MessageType = GraphQL::ObjectType.define do
  name 'Message'

  field :id, !types.ID
  field :content, !types.String

  field :user, Types::UserType do
    preload :user
    resolve lambda { |obj, _args, _ctx|
      obj.user
    }
  end
end
