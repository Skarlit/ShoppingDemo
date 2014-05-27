class Api::CommentsController < ApplicationController

	def index
		@item = Item.find(params[:id])
		@comments = @item.comments
		render 'api/comments/index'
	end
end
