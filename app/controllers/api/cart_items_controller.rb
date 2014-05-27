class Api::CartItemsController < ApplicationController
  def index
    p cookies
    if(signed_in?)
      @cart_items = current_user.cart_items
      render 'api/cart_items/signed_in'
    elsif cookies[:cart_item]
      items_param = cookies.split(" ")
      @items = []
      items_param.each do |pair|
        id, quantity = pair.split("&").map{ |char| char.to_i }
        item = Item.find(id)
        if item
          @items << [item, quantity]
        end
      end
      render 'api/cart_items/by_cookies'
    end
  end

  def create
    if signed_in?
      new_cart_item = CartItem.new(
        item_id: cart_item_params[:item_id],
        quantity: cart_item_params[:quantity],
        user_id: current_user.id)

      if new_cart_item.save
        render json: {status: "new item added to cart"}
      else
        render json: {status: "Cart item not saved due to network error"}, status: 402
      end
    else
      render json: {}, status: 402;
    end
  end

  def update
    if signed_in?
      cart_item = CartItem.find(params[:id])
      if cart_item.save
        render json: {status: "item updated"}
      else
        render json: {status: "Cart item not updated due to network error"}, status: 402
      end
    else
      render json: {}, status: 402;
    end
  end

  def destroy
    if signed_in?
      if CartItem.find(params[:id]).destroy
        render json: {status: "Item removed successfully"}
      else
        render json: {status: "something went wrong"}, status: 402
      end
    end
  end

  private
  def cart_item_params
    params.require(:cart_item).permit(:item_id, :quantity)
  end
end
