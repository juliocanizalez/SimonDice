const celeste = document.getElementById('celeste')
const violeta = document.getElementById('violeta')
const naranja = document.getElementById('naranja')
const verde = document.getElementById('verde')
const btnEmpezar = document.getElementById('btnEmpezar')
const LAST_LEVEL = 30
class Juego {

    constructor() {
        this.generateSeq()
        this.initialize()  
        setTimeout(() => {
            this.nextLevel()
        }, 4500);
    }

    initialize() {
        this.nextLevel() = this.nextLevel.bind(this)
        this.chooseColor = this.chooseColor.bind(this)
        this.level = 1
        this.colors = {
            celeste, 
            violeta, 
            naranja, 
            verde
        }
        this.counter()    
    }

    counter(){ 
        let count = 3
        var countdown = setInterval(function(){
            document.getElementById('btnEmpezar').innerHTML=count
            count--
            if(count<0){
                clearInterval(countdown)
                btnEmpezar.classList.add('hide')
            }
        },1000)      
    }
    
    generateSeq(){
        this.sequence = new Array(LAST_LEVEL).fill(0).map(n => Math.floor(Math.random() * 4))
    }

    nextLevel(){
        this.subLevel = 0
        this.illuminateSeq()
        this.addClickEvent()
    }

    transformNumberToColor(number){
        switch(number){
            case 0:
                return 'celeste'
            case 1:
                return 'violeta'
            case 2:
                return 'naranja'
            case 3:
                return 'verde'
        }
    }

    transformColorToNumber(color){
        switch(color){
            case 'celeste':
                return 0
            case 'violeta':
                return 1
            case 'naranja':
                return 2
            case 'verde':
                return 3
        }
    }

    illuminateSeq(){
        for(let i=0; i < this.level; i++){
            const color = this.transformNumberToColor(this.sequence[i])
            setTimeout(() => this.illuminateColor(color), 1000 * i );
        }
    }

    illuminateColor(color){
        this.colors[color].classList.add('light')
        setTimeout(() => this.shutDownColor(color), 350)
    }

    shutDownColor(color){
        this.colors[color].classList.remove('light')
    }

    addClickEvent(){
        this.colors.celeste.addEventListener('click', this.chooseColor)
        this.colors.verde.addEventListener('click', this.chooseColor)
        this.colors.violeta.addEventListener('click', this.chooseColor)
        this.colors.naranja.addEventListener('click', this.chooseColor)
    }

    deleteClickEvent(){
        this.colors.celeste.removeEventListener('click', this.chooseColor)
        this.colors.verde.removeEventListener('click', this.chooseColor)
        this.colors.violeta.removeEventListener('click', this.chooseColor)
        this.colors.naranja.removeEventListener('click', this.chooseColor)
    }

    chooseColor(evt){
        const colorName = evt.target.dataset.color
        const colorNumber = this.transformColorToNumber(colorName)
        this.illuminateColor(colorName)
        if(colorNumber === this.sequence[this.subLevel]){
            this.subLevel++
            if(this.subLevel ===this.level){
                this.level++
                //this.deleteClickEvts()
                if(this.level===(LAST_LEVEL+1)){
                    //WIN!
                }else{
                    setTimeout(this.nextLevel(), 900)
                }
            }
        }else{
            //LOSE
        }

    }

}

function startGame() {
    var juego = new Juego()
}