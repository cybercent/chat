Types::QueryType = GraphQL::ObjectType.define do
  name "Query"
  # Add root-level fields here.
  # They will be entry points for queries on your schema.

  field :messages, !types[Types::MessageType] do
    resolve lambda { |_obj, _args, ctx|

      if ctx[:current_user].blank?
        raise GraphQL::ExecutionError, 'Authentication required'
      end

      Message.all
    }
  end
end
