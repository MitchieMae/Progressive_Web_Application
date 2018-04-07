function RangeMap(srcMin,srcMax,destMin,destMax){
    this.ratio = ( destMax - destMin ) / ( srcMax - srcMin );
    console.log(this.ratio);
    this.map = function(x){
        return (x-srcMin) * this.ratio + destMin; 
    }
    
}