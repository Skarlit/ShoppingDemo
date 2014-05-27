json.array!(@items) do |item|
  json.quantity item[1]
  json.title item[0].title
  json.item_id item[0].id
  json.price item[0].price
end