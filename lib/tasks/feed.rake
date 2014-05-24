namespace :feed do
  desc "TODO"
  task arxiv: :environment do
  	feed = FeedNormalizer::FeedNormalizer.parse open('http://export.arxiv.org/rss/math')

  	20.times do |i|
  		Feed.create(
  			title: feed.entries[i].title.sub(/\(arXiv.*\]\)/,''), 
  			url: feed.entries[i].urls.first.sub('abs','pdf') + "v1"
  			)
  	end
  end

end
