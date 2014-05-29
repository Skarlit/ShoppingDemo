require 'rubygems'
require 'open-uri'
require 'nokogiri'

urls = File.readlines("algebra_books").map(&:chomp)

File.open("algebra.rb", "w") do |f|
  urls.each_with_index do |url, i|
    begin
      puts "trying #{url}..."
      doc = Nokogiri::HTML(open(url, "User-Agent" => "my robot"))

      img = doc.css("#product-image-smaller-1-viewer").css("#viewer-image-1").attr("data-bn-src-url").value #image link
      price = doc.css("#product-details-textbook-1").css('li')[0].text[/\d+\.\d+/] #price
      isbn = doc.css("#product-details-textbook-1").css('li')[1].text[/\d+/]  #isbn
      edition = doc.css("#product-details-textbook-1").css('li')[3].text[/\d+/]  #edition
      published = doc.css("#product-details-textbook-1").css('li')[4].text[/(?<=\:\s).*/]  #Published format=>  April 2009
      publisher = doc.css("#product-details-textbook-1").css('li')[5].text[/(?<=\:\s).*/] #Publisher format=> Cambridge University Press
      title = doc.css("#product-title-1").css(".milo").css("h1").text.gsub(/\/|\n|\s{2,} /,"") #title
      author = doc.css(".contributors").text.gsub(/by|\n|\s{2,}/,"")  # author
      overview = doc.css(".fade-to-more").css(".content.box").css(".simple-html")[0].text


      str = "item = Item.create(title: \"#{title}\", price: #{price}, img: \"#{img}\", cat_id: 2, clicks: 0, rating: 0)"
      str1 = "ItemInfo.create(item_id: item.id, isbn: \"#{isbn}\", published: \"#{published}\", publisher: \"#{publisher}\", author: \"#{author}\", overview: \"#{overview}\")"
      puts str
      puts str1
      f.puts str
      f.puts str1

      puts "sleeping"
      sleep(3)
    rescue
      next
    end
  end
end

