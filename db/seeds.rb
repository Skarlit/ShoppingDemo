# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

Cat.create(name: "geometry")  #1
Cat.create(name: "glgebra")  #2
Cat.create(name: "probability") #3
Cat.create(name: "numerical")  #4
Cat.create(name: "analysis")  #5

clicks = (0..1000)

itemTitle1 = [
  ["Sub-Riemannian Geometry and Optimal Transport", 39.99],
  ["Manifolds of Nonpositive Curvature", 69.99]
]

itemTitle2 =  [
  ["Lie Groups, Lie Algebras, and Representations: An Elementary Introduction",45.84],


]

itemTitle3 = [
  ["Probability (Graduate Texts in Mathematics) (v. 95)", 69.22],
  ["An Introduction to Measure Theory (Graduate Studies in Mathematics)", 35.05],
  ["Stochastic Differential Equations: An Introduction with Applications", 41.08],
  ["Brownian Motion Calculus", 25.15],
  ["Stochastic Processes (Cambridge Series in Statistical and Probabilistic Mathematics)", 65.73]

]

itemTitle4 = [
  ["Numerical Analysis ", 253.07],
  ["Spectral Mapping Theorems",54.99],
  ["Classical Banach Spaces II", 69.99],
  ["Linear Integral Equations", 59.99],
  ["Basic Operator Theory", 69.95],
  ["Partial Differential Equations II", 119.00],
  ["Foundations of the Classical Theory of Partial Differential Equations", 79.99],
  ["Probability (Graduate Texts in Mathematics) (v. 95)", 69.22],
  ["An Introduction to Measure Theory (Graduate Studies in Mathematics)", 35.05],
  ["Stochastic Differential Equations: An Introduction with Applications", 41.08],
  ["Brownian Motion Calculus", 25.15],
  ["Stochastic Processes (Cambridge Series in Statistical and Probabilistic Mathematics)", 65.73],
  ["Lie Groups, Lie Algebras, and Representations: An Elementary Introduction",45.84],
  ["Sub-Riemannian Geometry and Optimal Transport", 39.99],
  ["Manifolds of Nonpositive Curvature", 69.99]
]


itemTitle4.each do |item4|
  Item.create(title: item4[0], price: item4[1], cat_id: 4)
end
