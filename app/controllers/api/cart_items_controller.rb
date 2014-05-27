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
end
