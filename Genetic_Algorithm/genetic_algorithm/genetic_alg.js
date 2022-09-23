
generation = 0;
averageFitness = 0;
balls = [];

document.addEventListener("DOMContentLoaded", setup);

class Ball{
    
    constructor(x,y,ctx){
        this.x = x;
        this.y = y;
        this.ctx = ctx;
        this.radius = 10;
        
        this.count = 0;
        this.fitness = 0;
        this.done = false;
    }

    draw(){//draw the balls
        this.ctx.fillStyle = 'rgb(242,184,216)';
        if(this.done){
            this.ctx.fillStyle = 'rgb(136,255,0)';
        }
        this.ctx.beginPath();
        this.ctx.arc(this.x,this.y,this.radius,0,2*Math.PI,false);
        this.ctx.fill();
    }

    update(){ 
         
        if(this.x < 320 && this.x > 280 && this.y > 530 && this.y < 570){
            this.done = true;
            this.count++;
            
        }
        else if(this.count < 250) {
            this.x += 25 * this.genes[this.count][0]; 
            this.y += 25 * this.genes[this.count][1];
            this.count++;
        }
    }

    setGenes(genes){
        this.genes = genes;
    }

    randomGenes(){
        this.genes = [];
        for(let i=0; i < 250; i++){
            this.genes[i] = [Math.random() - 0.5, Math.random() - 0.5];
        }
    }

    calculateIndividualFitness(){
        var calc = Math.sqrt((this.x-300)**2 + (this.y-550)**2);
        var norm = 1-(calc/600);
       // if(norm<0){
         //   this.fitness = 0;
        //}
        //else{
        //    this.fitness = norm;
        //}
        this.fitness = Math.max(0, norm);
    }
}



function setup(){
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');

    for(let i = 0; i < 100; i++){
        var b = new Ball(295, 30, ctx);
        b.randomGenes();
        balls.push(b);
    }
    run();
}


function run(){
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');

    requestAnimationFrame(run);
    ctx.clearRect(0,0,canvas.width,canvas.height);
    
    for(let i=0; i < 100; i++){
        var x = balls[i];
        x.update();
        x.draw();
    }
    //goal-square
    ctx.fillStyle = 'rgb(242,184,216)';
    ctx.fillRect(280, 530, 40, 40); 
    ctx.fillStyle = 'rgb(255,255,255)';
    ctx.font = '22px Helvetica';
    ctx.fillText("Generation: " + generation.toString(), 15, 475);
    ctx.fillText("Average Fitness: " + averageFitness.toFixed(2).toString(), 15, 500);


    if(balls[0].count == 250){
        nextGeneration()
    }
}

function nextGeneration(){
    generation++;
    console.log("Current generation: ", generation);

    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');

    //create pool of potential mating partners
    var potentials = [];
    var totalFitness = 0;

    
    for(let i=0; i<100; i++){
        var b = balls[i];
        b.calculateIndividualFitness();
        totalFitness += b.fitness;
        for(let j=0; j < (2**(b.fitness * 10)); j++){ //add ball x amount of times exponential to its fitness
            potentials.push(b);
        }
        
    }

    averageFitness = totalFitness / 100; 
    console.log("Average Fitness: ", averageFitness);

    //creating new balls
    var newIndividuals = [];    
    for(let i=0; i<100; i++){    
        
        var dad = potentials[Math.floor(Math.random() * potentials.length)];
        var mom = potentials[Math.floor(Math.random() * potentials.length)];
        var baby = new Ball(295, 30, ctx);
    
        //mix genes of mom and dad
        var genome = [];
        for(let y = 0; y < 250; y++){
            if(Math.random() < 0.04){//mutation rate of 4%
                var g = [Math.random() - 0.5, Math.random() - 0.5]
                genome.push(g);
            }
            if(y%2){//evens from dad
                genome.push(dad.genes[y]);
            }
            else{//odds from mom
                genome.push(mom.genes[y]);
            }
        }
        baby.setGenes(genome);
        newIndividuals.push(baby);
    }
    //set new Generation
    balls = newIndividuals;
}
    





