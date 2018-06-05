Types::MutationType = GraphQL::ObjectType.define do
  name "Mutation"
  field :logged_in_user, function: Mutations::LoggedInUser.new
end
