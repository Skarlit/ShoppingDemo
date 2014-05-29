require 'nokogiri'
require 'open-uri'


doc = Nokogiri::HTML(open("http://www.barnesandnoble.com/s/science?dref=838%2C5822%2C6269", 'user-agent' => "chrome"))
File.open("algebra_books", "w") do |f|
  doc.css(".main").each do |book|
    f.puts book.css("a").attr("href").value
  end
end

