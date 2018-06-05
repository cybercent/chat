class Mutations::LoggedInUser < GraphQL::Function
  argument :auth, !Types::AuthInput

  type Types::AuthType

  def call(_obj, args, _ctx)
    input = args[:auth]
    return unless input

    user = User.find_by(username: input[:username])
    return unless user

    OpenStruct.new(jwt: AuthToken.token(user),
                   user: user)
  end
end
