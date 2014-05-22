class Api::InfosController < ApplicationController

  def feeds
    render json: Feed.all
  end
end
