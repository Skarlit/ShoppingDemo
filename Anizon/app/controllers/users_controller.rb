class UsersController < ApplicationController

  def new
    @user = User.new
  end

  def create
    if user_params[:password] != user_params[:password_confirmation]
      render json: "Oops" , status: 422
    else  
      @user = User.new(
        email: user_params[:email], 
        name: user_params[:name],
        password: user_params[:password]
         )
      if @user.save
        sign_in(@user)
        render json: {name: @user.name}
      else
        render json: @user.error.full_messages, status: 422
      end
    end
  end

  private
  def user_params
    params.require(:user).permit(:email, :name, :password, :password_confirmation)
  end 
end
