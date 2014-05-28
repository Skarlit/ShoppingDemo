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
			Item.find(comment.item_id).updateRating(comment)
			render json: {status: "ok"}
		else
			render json: {status: "error"}, status: 402
		end
	end

	private 
	def comment_params
		params.require(:comment).permit(:item_id, :title, :body, :user_rating)
	end
end
