require 'nokogiri'
require 'open-uri'


doc = Nokogiri::HTML(open("data"))
File.open("analysis_books", "w") do |f|
  doc.css(".main").each do |book|
    f.puts book.css("a").attr("href").value
  end
end

