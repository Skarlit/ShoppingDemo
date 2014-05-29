class SessionsController < ApplicationController
  def create
    p login_params[:email]
    @user = User.find_by_email(login_params[:email])
    if @user && BCrypt::Password.new(@user.password_digest) == login_params[:password]
      sign_in(@user)
      render json: {name: @user.name} 
    else
      render json: {status: "Invalid Username/Password"}, status: 422
    end
  end

  def auto
    if signed_in?
      render json: {name: current_user.name}
    else
      render json: {status: "Not signed in"}, status: 422
    end
  end

  def destroy
    session[:token] = nil;
    current_user = nil;
    cookies[:cart_item] = nil;
    render json: {status: "sign out"}
  end

  private 
  def login_params
    params.require(:user).permit(:email, :password)
  end 
end
