class Column
{
    constructor(x,y,width,height)
    {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.queue=[];
        this.color={
            r:236,
            g:64,
            b:122
        };
    }
    moveTo(loc,yOffset=1,frameCount=10)
    {
        for(let i=1;i<=frameCount;i++)
        {
            const t=i/frameCount;
            const u = Math.sin(t*Math.PI);
            this.queue.push({
                x:lerp(this.x,loc.x,t),
                y:lerp(this.y,loc.y,t)+
                u*this.width/2*yOffset,
                r:lerp(236,0,u),
                g:lerp(64,151,u),
                b:lerp(122,167,u)
                
            });
        }
    }
    jump(frameCount=15)
    {
        for(let i=1;i<=frameCount;i++)
        {
            const t=i/frameCount;
            const u = Math.sin(t*Math.PI);
            this.queue.push({
            x:this.x,
            y:this.y - u*this.width,
            r:lerp(236,23,u),
            g:lerp(64,64,u),
            b:lerp(122,122,u)
            });
        }
    }
    draw(ctx)
    {
        let changed = false;
        if(this.queue.length>0)
        {
            const {x,y,r,g,b} = this.queue.shift();
            this.x=x;
            this.y=y;
            this.color={r,g,b};
            changed=true;
        }
    const left = this.x - this.width/2 ;
    const top = this.y - this.height ;
    const right = this.x + this.width/2 ;
    ctx.beginPath();
    const {r,g,b} = this.color;
    ctx.fillStyle = `rgb(${r},${g},${b})`;
    ctx.moveTo(left,top);
    ctx.lineTo(left,this.y);
    ctx.ellipse(this.x,this.y,this.width/2,this.width/4,0,Math.PI,Math.PI*2,true);
    ctx.lineTo(right,top);
    ctx.ellipse(this.x,top,this.width/2,this.width/4,0,0,Math.PI*2,true);
    ctx.fill();
    ctx.stroke();
    return changed;
    }
}