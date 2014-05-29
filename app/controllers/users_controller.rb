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
        #parse cookie cart
        p cookies[:cart_items]
        if cookies[:cart_item]
          items_param = cookies[:cart_item].split(" ")
          items_param.each do |pair|
            item_id, quantity = pair.split("&").map(&:to_i)

            cart_item = CartItem.create(user_id: current_user.id, item_id: item_id, quantity: quantity)
            if cart_item.valid?
              cart_item.save
            end
          end
        end
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
