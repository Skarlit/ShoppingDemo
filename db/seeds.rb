# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

Cat.create(name: "Geometry")  #1
Cat.create(name: "Algebra")  #2
Cat.create(name: "Probability") #3
Cat.create(name: "Numerical")  #4
Cat.create(name: "Analysis")  #5


Item.create(
  title: "Lie Groups, Lie Algebras, and Representations: An Elementary Introduction",
  price: 45.84,
  cat_id: 2,
  clicks: 0
  )

Item.create(
  title: "Probability (Graduate Texts in Mathematics) (v. 95)",
  price: 69.22,
  cat_id: 3,
  clicks: 0
  )

Item.create(
  title: "Numerical Analysis ",
  price: 253.07,
  cat_id: 4,
  clicks: 0
  )

Item.create(
  title: "An Introduction to Measure Theory (Graduate Studies in Mathematics)",
  price: 35.05,
  cat_id: 5,
  clicks: 0
  )

Item.create(
  title: "Probability and Measure",
  price: 106.45,
  cat_id: 3,
  clicks: 0
  )

Feed.create(
  title: 'Currents on locally conformally Kähler manifolds',
  url: 'http://arxiv.org/pdf/1405.5502.pdf' 
  )

Feed.create(
  title: 'Bolza quaternion order and asymptotics of systoles along congruence subgroups',
  url: 'http://arxiv.org/pdf/1405.5454.pdf' 
  )

Feed.create(
  title: 'Stable capillary hypersurfaces in a wedge',
  url: 'http://arxiv.org/pdf/1405.5407.pdf' 
  )