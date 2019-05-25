class Particle{
    constructor(pos, v, ctx, colour, isExploded, size){
        this.pos = pos
        this.v = v
        this.a = new Vector(0, 0.1)
        this.ctx = ctx
        this.colour = colour
        this.isExploded = isExploded
        this.size = size
        this.fadeCount = 255
    }
    update(){
        this.pos.add(this.v)
        this.v.add(this.a)
        if(this.isExploded){
            this.fadeCount -= 5
        }
    }
    getAlpha(){
        const digits = "0123456789abcdef"
        let d1 = Math.floor(this.fadeCount/16)
        let d2 = Math.floor((this.fadeCount-16*d1)/16)
        return digits[d1]+digits[d2]
    }
    show(){
        this.ctx.beginPath()
        this.ctx.fillStyle = this.colour+this.getAlpha()
        this.ctx.arc(this.pos.x, this.pos.y, this.size, 0, 2*Math.PI)
        this.ctx.fill()
        this.ctx.closePath()
    }
}