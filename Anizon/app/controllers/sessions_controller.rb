class SessionsController < ApplicationController
  def create
    p login_params[:email]
    @user = User.find_by_email(login_params[:email])
    if BCrypt::Password.new(@user.password_digest) == login_params[:password]
      sign_in(@user)
      render json: {name: @user.name} 
    else
      render json: "Invalid Username/Password", status: 422
    end
  end

  private 
  def login_params
    params.require(:user).permit(:email, :password)
  end 
end
