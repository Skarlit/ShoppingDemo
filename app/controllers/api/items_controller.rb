class Api::ItemsController < ApplicationController
  def book_by_category
    @items = Cat.find_by(name: params[:cat]).items.page(params[:page]).per(10)
    render "/api/items/items_by_cat"
  end

  def show
    @item = Item.find(params[:id])
    @info = @item.item_info
    if @item && @info
      render json: @info
    else
      render json: {status: "Error"}, status: 402
    end
  end

  def update
    @item = Item.find(params[:id])
    if @item && @item.update_attributes(click_params)
      render json: {status: "ok"}
    else
      render json: {status: "error"}, status: 402
    end
  end

  def popular
    render json: Item.where("clicks > 0").order(:clicks => :desc).limit(15)
  end

  def ranking
    render json: Item.where("rating > 0").order(:rating => :desc).limit(15)
  end

  private 
  def click_params
    params.require(:item).permit(:clicks)
  end
end
