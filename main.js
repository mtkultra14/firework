class Project{
    constructor(){
        this.canvas = document.getElementById("canvas")
        this.ctx = this.canvas.getContext("2d")
        //centering canvas
        this.canvas.width = "600"
        this.canvas.height = "600"
        this.canvas.style.left = String(window.innerWidth*0.5-300)
        this.canvas.style.top = String(window.innerHeight*0.5-300)

        this.particles = []
    }
    getRandomColor() {
        const letters = '456789ABCDEF';
        let color = '#';
        for (var i=0;i<6;i++){
          color += letters[Math.floor(Math.random()*12)];
        }
        return color;
    }
    createParticle(x, y, vx, vy, colour, isExploded, size){
        this.particles.push(new Particle(new Vector(x, y), new Vector(vx, vy), this.ctx, colour, isExploded, size))
    }
    randomBetween(a, b){
        return Math.floor(Math.random()*(b-a))+a
    }
    randomVector2D(){
        let angle = Math.random()*2*Math.PI
        return new Vector(Math.cos(angle), Math.sin(angle))
    }
    updateParticles(){
        if(Math.random() > 0.98){
            this.createParticle(this.randomBetween(25, 575), 600, 0, this.randomBetween(-10, -8), this.getRandomColor(), false, 4)
        }
        this.ctx.fillStyle = "rgba(0, 0, 0, 0.2)"
        this.ctx.fillRect(0, 0, 600, 600)
        for(let i=this.particles.length-1;i>=0;i--){
            this.particles[i].update()
            this.particles[i].show()
            //delete particles that have fallen out
            if(this.particles[i].pos.y >= 600 || this.particles[i].fadeCount == 0){
                this.particles.splice(i, 1)
                continue
            }
            //check for explosion
            if(!this.particles[i].isExploded && this.particles[i].v.y <= 0 && this.particles[i].v.y >= -1){
                //create new particles in a heart shape
                for(let x=-2;x<2;x+=0.02){
                    this.createParticle(this.particles[i].pos.x, this.particles[i].pos.y,  x,  -Math.acos(1-Math.abs(x))+Math.PI, this.particles[i].colour, true, 2)
                    this.createParticle(this.particles[i].pos.x, this.particles[i].pos.y,  x,  -Math.sqrt(1-Math.pow(Math.abs(x)-1, 2)), this.particles[i].colour, true, 2)
                }
                this.particles.splice(i, 1)
            }
        }
        requestAnimationFrame(this.updateParticles.bind(this))
    }
}
myProject = new Project()
myProject.updateParticles()