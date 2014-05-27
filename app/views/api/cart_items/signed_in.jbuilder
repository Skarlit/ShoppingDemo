json.array!(@cart_items) do |cart_item|
  json.quantity cart_item.quantity
  json.title cart_item.item.title
  json.item_id cart_item.item_id
  json.price cart_item.item.price
end