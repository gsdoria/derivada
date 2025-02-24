class eqb{
    constructor(v=null, a=null, b=null){
        this.v = v
        this.a = a
        this.b = b
    }
    show(){
        let s = ""
        
        if ( this.a && this.b ){

            s += "( " + this.a.show() + " "
    
            s += this.v + " "
    
            s += this.b.show() + " ) "

        }

        else if (this instanceof x){
            s += "x"
        }
        else if (this instanceof con){
            s += String(this.a)
        }
        else if (this.a && !this.b){
            s += this.v + "( " + this.a.show() + " ) "
        }

        return s
    }

    binSearchSum(){

        let num = 0
        if (this instanceof sum) num = this.a.binSearchSum() + this.b.binSearchSum()
        else if (this instanceof con) num = this.a
        return num

    }

    internalCutSum(){
        if (this instanceof sum){
            this.a = this.a.internalCutSum()
            this.b = this.b.internalCutSum()

            if (this.a instanceof con){
                return this.b.internalCutSum()
            }
            if (this.b instanceof con){
                return this.a.internalCutSum()
            }
        }
        return this
    }

    cutSum(){
        if (this.a instanceof con && this.b instanceof con) return new con(this.a.a + this.b.a)
        return new sum( new con(this.binSearchSum()) , this.internalCutSum() )
    }

    clean(){
        if (this instanceof sum){
            this.a.cutSum()
            this.b.cutSum()
            // console.log("clean sum")
            this.a = this.a.clean()
            this.b = this.b.clean()

            let soma = this.binSearchSum()

            if (this.a instanceof con){
                if (this.b instanceof con){
                    return new con( this.a.a + this.b.a )
                }
                else if (this.a.a == 0){
                    return this.b.clean()
                }
            }
            else if (this.b instanceof con && this.b.a == 0){
                return this.a.clean()
            }




            return this
        }
        else if (this instanceof pro){
            // console.log("clean pro")

            this.a = this.a.clean()
            this.b = this.b.clean()

            if (this.a instanceof con){
                if (this.b instanceof con){
                    // console.log("ac bc")
                    // console.log(this.a, this.b)
                    return new con( this.a.a * this.b.a )
                }
                else if (this.a.a == 1)
                    return this.b.clean()
                else if (this.a.a == 0)
                    return new con(0)

                else if (this.b instanceof pro){
                    // console.log("bpro")
                    if (this.b.a instanceof con){
                        return new pro(
                            new con(this.a.a * this.b.a.a),
                            this.b.b
                        )
                    }
                    else if (this.b.b instanceof con){
                        return new pro(
                            this.a.a * this.b.b.a,
                            this.b.a
                        )
                    }
                }
            }

            else if (this.b instanceof con){
                if (this.b.a == 1)
                    return this.a.clean()
                else if (this.b.a == 0)
                    return new con(0)
                else if (this.a instanceof pro){
                    console.log("apro")
                    if (this.a.a instanceof con){
                        return new pro(
                            new con(this.b.a * this.a.a.a),
                            this.a.b
                        )
                    }
                    else if (this.a.b instanceof con){
                        return new pro(
                            this.b.a * this.a.b.a,
                            this.a.a
                        )
                    }
                }
            }
            return this
        }
        else if (this instanceof div){
            // console.log("clean div")
            this.a = this.a.clean()
            this.b = this.b.clean()
            if (this.b instanceof con){
                if (this.a instanceof con)
                    return new con( this.a.a / this.b.a )
                else if (this.b.a == 1)
                    return this.a.clean()
            }
            return this
        }
        else if (this instanceof exp){
            // console.log("clean exp")
            this.a = this.a.clean()
            this.b = this.b.clean()
            if (this.a instanceof con && this.b instanceof con){
                return new con( this.a.a ** this.b.a )
            }
            else if (this.b instanceof con && this.b.a == 1){
                return this.a.clean()
            }
            else if (this.b instanceof con && this.b.a == 0){
                return new con(1)
            }
            return this
        }
        else{
            return this
        }
    }
}

class con extends eqb{
    constructor(a){
        super("c", a)
        delete this.b
    }
    derivate(){
        return new con(0)
    }
}

class x extends eqb{
    constructor(){
        super("x")
        delete this.a
        delete this.b
    }
    derivate(){
        return new con(1)
    }
}

class sum extends eqb{
    constructor(a=null, b=null){
        super("+", a, b)
    }
    derivate(){
        let d = new sum(this.a.derivate(),  this.b.derivate())
        d = d.clean()
        return d
    }
}

class pro extends eqb{
    constructor(a=null, b=null){
        super("*", a, b)
    }
    derivate(){
        let d = new sum(
            new pro(
                this.a.derivate(),
                this.b
            ),
            new pro(
                this.a,
                this.b.derivate()
            )
        )
        d = d.clean()
        return d
    }
}

class div extends eqb{
    constructor(a=null, b=null){
        super("/", a, b)
    }
    derivate(){
        let d = new div(new sum(
                new pro(
                    this.a.derivate(), this.b
                ),
                new pro(
                    new con(-1),
                    new pro(
                        this.a, this.b.derivate()
                    )
                )
            ),
            new exp( this.b, new con(2))
        )
        d = d.clean()

        return d
    }
}

class exp extends eqb{
    constructor(a, b){
        super("^", a,b)
    }
    derivate(){
        let d = new pro( new pro(this.b, this.a.derivate()), new exp(this.a, new sum( this.b, new con(-1) ) ) )
        d = d.clean()
        return d
    }
}

class sin extends eqb{
    constructor(a){
        super("sin", a)
        delete this.b
    }
    derivate(){
        let d = new pro(this.a.derivate(), new cos(this.a))
        d = d.clean()

        return d
    }
}

class cos extends eqb{
    constructor(a){
        super("cos", a)
        delete this.b
    }
    derivate(){
        let d = new pro(new pro(new con(-1), this.a.derivate()), new sin(this.a))
        d = d.clean()
        return d
    }
}

// a fazer
let equation = eq => {

    n = 0
    for(let l of eq){
        console.log(l)
        
        if (!isNaN(l)){
            n = n*10 + Number(l)
        }
        else{
            
            switch (l) {
                case "+":
                    
                    break;
            
                default:
                    break;
            }

        }
    }
    console.log(n)

}


// let a = new exp( new con(2), new x )
// let a = equation("2+x+1")
// let a = new sum(new con(2), new sum(new x, new sum(new x, new con(1) ) ))
// let a = new sum(new con(1), new sum( new sum( new con(1), new x), new x ))
// a = a.clean()
// console.log(a)
// console.log(a.show())
// console.log(a.binSearchSum())
// console.log(a.cutSum().show())

console.log(equation("21+x"))
