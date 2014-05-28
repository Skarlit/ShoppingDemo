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

  def user_info
    if signed_in?
      user_info = current_user.user_info
      if user_info
        render json: user_info
      else
        render json: {status: "Looks like you don't have a shipping address\n please fill in the form below"}, status: 404
      end
    else
      render json: {status: "For one time user, please fill in the form below"}, status: 404
    end
  end

  def create_user_info

  end

end
