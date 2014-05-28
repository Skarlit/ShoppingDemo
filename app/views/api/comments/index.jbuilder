json.array!(@comments) do |json, comment|
  json.title comment.title
  json.body comment.body
  json.user_rating comment.user_rating
  json.author comment.author.name
  json.author_id comment.user_id
end
