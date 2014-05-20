class UsersController < ApplicationController

  

  def new
    @user = User.new
  end

  def create
    if user_params[:password] != :password_confirmation
      render json: "Oops" , status: 500
    else  
      @user = User.new(user_params)
      if @user.save
        sign_in(user)
        render :status 200
      else
        render json: "Oops", status: 500
      end
    end
  end

  private
  def user_params
    params.require(:user).permit(:email, :name, :password, :password_confirmation)
  end 
end
