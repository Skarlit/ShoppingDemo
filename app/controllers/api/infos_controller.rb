class Api::InfosController < ApplicationController

  def feeds
  	@feeds = Feed.all
  	@feeds.each do |feed|
  		feed.created_at = feed.created_at.to_formatted_s('%B %Y')
  	end
    render json: @feeds
  end

  def popular
  end
end
