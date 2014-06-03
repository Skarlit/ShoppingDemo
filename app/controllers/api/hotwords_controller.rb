class Api::HotwordsController < ApplicationController
  def index
    render json: {queries: Hotword.all.pluck(:query)}
  end

  def search
    if params[:found] == "true"
      @query = Hotword.find_by_query(params[:query])
      @items = [];
      @query.result.split(",").map(&:to_i).each do |id|
        @items << Item.find(id)
      end 
      render json: @items
    else
      if(params[:query].length > 4)
        items = Item.where("title ILIKE ?", "%#{params[:query]}%")
        Hotword.create(query: params[:query], result: items.pluck(:id).join(","))
        render json: items
      else
        items = Item.where("title ILIKE ?", "%#{params[:query]}%").limit(10)
        Hotword.create(query: params[:query], result: items.pluck(:id).join(","))
        render json: items
      end
    end
  end
end
