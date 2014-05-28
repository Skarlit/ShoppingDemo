class Api::CommentsController < ApplicationController

	def index
		@item = Item.find(params[:id])
		@comments = @item.comments
		render 'api/comments/index'
	end

	def create
		comment = Comment.new(comment_params)
		if signed_in?
		  comment.user_id = current_user.id
		else
			comment.user_id = 0
		end
		if comment.save
			render json: {status: "ok"}
		else
			render status: 402
		end
	end

	private 
	def comment_params
		params.require(:comment).permit(:item_id, :title, :body, :rating)
	end
end
