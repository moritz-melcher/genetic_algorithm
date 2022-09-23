#Simulating Natural Selection in JavaScript

##Genetic Algorithm

This genetic algorithm is a very simple presentation of Charles Darwin's theory of evolution. I created a fun little web-application that shows how circles learn to reach a target and get better with each generation. Although it's a very arbitrary task, it demonstrates the fundamental principles of natural selection. At this point I have to mention that I worked very closely off a blogpost by Luke Carrigan that I will link down below. 

##How it works

1. I created a 2d-canvas and a square as our goal.
2. Create the first generation of balls on a spawn-point. Their genes are random 2d vectors which will determine their direction
3. Calculate the fitness of each individual by using Pythagoras-Theorem to determine their distance to the goal
4. Reproduce a new Generation by creating a pool of genetic material. This pool contains an amount of every individual exponential to their (normalized) fitness. Then choosing 2 random individuals out of that pool and crossing over their genetic material. This way we have equal representation of the parents genetic material.
5. Lastly we do have to factor in a very small chance of mutation which occurs in 4% of the crossovers.
6. The last thing to do is watch them learn and reach the goal more and more efficiently.

