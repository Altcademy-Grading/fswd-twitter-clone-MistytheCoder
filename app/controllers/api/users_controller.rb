module Api
  class UsersController < ApplicationController
    skip_before_action :verify_authenticity_token, only: :create

    def create
      @user = User.new(user_params)

      if @user.save
        render 'api/users/create', status: :created
      else
        render json: {
          success: false,
          errors: @user.errors.full_messages
        }, status: :unprocessable_entity
      end
    end

    private

    def user_params
      params.require(:user).permit(:email, :password, :username)
    end
  end
end
