class Api::ItemsController < ApplicationController
  def book_by_category
    @items = Cat.find_by(name: params[:cat]).items.page(params[:page])
    render "/api/items/items_by_cat"
  end
end
