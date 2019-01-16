// const nomJugador = document.getElementById('nomJugador')
const punMaximo = document.getElementById('punMaximo')
const nivelMax = document.getElementById('nivelMax')
const celeste = document.getElementById('celeste')
const violeta = document.getElementById('violeta')
const naranja = document.getElementById('naranja')
const verde = document.getElementById('verde')
const input = document.getElementById('input')
const btnEmpezar = document.getElementById('btnEmpezar')
const LAST_LEVEL = 20
const PUNTOS = 4
const puntInicial = 0
// const PUNTAJEMAXIMO = 0
localStorage.setItem('puntos', puntInicial)

class Juego {
    constructor() {
        this.inicializar()
        this.generarSecuencia()
        setTimeout(this.nextLevel, 1000)
    }
    
    inicializar() {
        this.maxScore = localStorage.getItem('puntos')
        this.maxPlayer = localStorage.getItem('jugador')
        if (this.maxScore != null && this.maxPlayer != null){
            punMaximo.innerHTML = `${this.maxScore} de ${this.maxPlayer}`
            // console.log(`${this.maxScore} de ${this.maxPlayer}`)
        } 

        this.nextLevel = this.nextLevel.bind(this)
        this.inicializar = this.inicializar.bind(this)
        this.elegirColor = this.elegirColor.bind(this)
        btnEmpezar.classList.toggle('hide')
        this.nivel = 1
        this.puntos = 0
        this.colores = {
            celeste,
            violeta,
            naranja,
            verde
        }
    }

    generarSecuencia () {
        this.secuencia = new Array(LAST_LEVEL).fill(0).map(n => Math.floor(Math.random() * 4))
    }

    nextLevel() {
        this.subnivel = 0
        this.iluminarSecuencia()
        this.agregarEventosClick()
    }

    transforNumeroAColor(num){
        switch (num) {
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

    transforColorANumero(color){
        switch (color) {
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

    iluminarSecuencia() {
        for (let i = 0; i < this.nivel; i++) {
            const color = this.transforNumeroAColor(this.secuencia[i])
            setTimeout(() => this.iluminarColor(color), 1000 * i)
        }
    }

    iluminarColor(color) {
        this.colores[color].classList.add('light')
        this.colores[color].classList.add('hover')
        setTimeout(() => this.apagarColor(color), 350)
    }

    apagarColor(color) {
        this.colores[color].classList.remove('light')
        this.colores[color].classList.remove('hover')
    }

    agregarEventosClick() {
        this.colores.celeste.addEventListener('click', this.elegirColor)
        this.colores.violeta.addEventListener('click', this.elegirColor)
        this.colores.naranja.addEventListener('click', this.elegirColor)
        this.colores.verde.addEventListener('click', this.elegirColor)
    }

    removeClick() {
        this.colores.celeste.removeEventListener('click', this.elegirColor)
        this.colores.violeta.removeEventListener('click', this.elegirColor)
        this.colores.naranja.removeEventListener('click', this.elegirColor)
        this.colores.verde.removeEventListener('click', this.elegirColor)
    }


    elegirColor(ev) {
        // console.log(ev)
        const nombreColor = ev.target.dataset.color
        const numeroColor = this.transforColorANumero(nombreColor)
        this.iluminarColor(nombreColor)
        if (numeroColor === this.secuencia[this.subnivel]) {
            this.subnivel++
            if (this.subnivel === this.nivel) {
                this.nivel++
                nivelMax.innerHTML = this.nivel 
                this.puntos += PUNTOS
                this.removeClick()
                
                if (this.nivel === (LAST_LEVEL + 1)) {
                    swal("Escribe tu nombre:", {
                        content: "input",
                    })
                    .then((value) => {
                        // swal(`You typed: ${value}`);
                        this.nombreJugador = `${value}`
                        localStorage.setItem('jugador', this.nombreJugador)
                        this.ganoElJuego();
                    })
                }else{
                    setTimeout(this.nextLevel, 2000)
                }
            }
        }else{
            this.removeClick()
            if (this.puntos > this.maxScore) {
                swal("Escribe tu nombre:", {
                    content: "input",
                })
                .then((value) => {
                    // swal(`You typed: ${value}`);
                    this.nombreJugador = `${value}`
                    localStorage.setItem('jugador', this.nombreJugador)
                    this.perdioElJuego()
                })
            }else {
                this.perdioElJuego()
            }
        }
    }

    ganoElJuego(){
        swal('Platzi', 'Felicitaciones, has gando el juego', 'success')
            .then(() => {
                punMaximo.innerHTML = `Puntaje máximo: ${this.puntos}`
                this.inicializar()
            })
    }

    perdioElJuego(){
        
        if (this.puntos > this.maxScore) {
            // console.log(this.maxScore)
            const maximo = this.maxScore
            localStorage.setItem('puntos', this.puntos)
            var maxPlayer = localStorage.getItem('jugador')
            swal('Simon Dice:', `Hola ${maxPlayer} Has superado el puntaje máximo: ${maximo}`, 'success')
                .then(() => {
                    // punMaximo.innerHTML = `Puntaje: ${this.puntos}`
                    this.inicializar()
                })
        }else {
            swal('Simon Dice', `Has perdido el juego. Requieres más concentración tu puntaje es: ${this.puntos}`, 'error')
                .then(() => {
                    // punMaximo.innerHTML = `Puntaje: ${this.puntos}`
                    this.inicializar()
                })
        }
    }

}

function empezarJuego() {
    window.juego = new Juego()
}

(function() {
    let maxScore = localStorage.getItem('puntos')
    let maxPlayer = localStorage.getItem('jugador')

    // if (maxScore != null) punMaximo.innerHTML = maxScore     
    if (maxScore != null && maxPlayer != null) punMaximo.innerHTML = `${maxScore} de ${maxPlayer}`   
})();