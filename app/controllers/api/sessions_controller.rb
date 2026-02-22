module Api
  class SessionsController < ApplicationController
    skip_before_action :verify_authenticity_token

    def create
      username = params.dig(:user, :username)
      password = params.dig(:user, :password)

      @user = User.find_by(username: username)

      if valid_login?(@user, password)
        user_session = @user.sessions.create
        cookies.permanent.signed[:twitter_session_token] = {
          value: user_session.token,
          httponly: true,
          same_site: :lax
        }

        render 'api/sessions/create', status: :ok
      else
        render json: {
          success: false,
          error: 'Invalid username or password'
        }, status: :unauthorized
      end
    end

    def authenticated
      token = cookies.signed[:twitter_session_token]
      session = Session.find_by(token: token)

      if session
        @user = session.user
        render 'api/sessions/authenticated'
      else
        render json: {
          authenticated: false
        }
      end
    end

    def destroy
      token = cookies.signed[:twitter_session_token]
      session = Session.find_by(token: token)

      if session&.destroy
        cookies.delete(:twitter_session_token)
        render json: {
          success: true
        }
      end
    end

    private

    def valid_login?(user, raw_password)
      return false if user.nil? || raw_password.blank?

      user.authenticate_password(raw_password)
    end
  end
end
