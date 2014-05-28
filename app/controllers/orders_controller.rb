class OrdersController < ApplicationController
  def create
    if signed_in?
      user_info = UserInfo.find_by_user_id(current_user.id)
      if user_info
        if user_info.update_attributes({
            zipcode: user_info_params[:zipcode],
            address: user_info_params[:address],
            state: user_info_params[:state],
            country: user_info_params[:country],
            user_id: current_user.id
          })

          place_order
          render json: {status: "order placed"}
        else

          render json: {status: "failed to create order of such address"}, status: 402
        end
      else
        new_info = UserInfo.new({
            zipcode: user_info_params[:zipcode],
            address: user_info_params[:address],
            state: user_info_params[:state],
            country: user_info_params[:country],
            user_id: current_user.id
        })
        if new_info.save
          place_order
          render json: {status: "order placed"}
        else
          render json: {status: "failed to create address"}, status: 402
        end
      end
    else

    end
  end

  private
  def user_info_params
    params.require(:user_info).permit(:name, :address, :zipcode, :state, :country)
  end

  def place_order
    total = 0
    current_user.cart_items.each {|item| total += item.price * item.quantity}

    order = Order.create({user_id: current_user.id, total: total, status: "PENDING"})
    current_user.cart_items.destroy_all
  end
end
