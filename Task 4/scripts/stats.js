// Variables

const tablaUno = document.getElementById("tabla-uno")
const tablaDos = document.getElementById("tabla-dos")
const tablaTres = document.getElementById("tabla-tres")
let estructura = {
    porcentajeMasAlto:{nombre:'', porcentaje: 0},
    porcentajeMasBajo:{nombre:'', porcentaje: null},
    masCapacidad:{nombre:'', capacity: 0},
    upcoming:{},
    past: {}
}

//API fetch
fetch('https://mindhub-xj03.onrender.com/api/amazing')
    .then( res => res.json() )
    .then( ( { events, currentDate } ) => {
        const verificar = (estadisticas, evento) => {
            //determino asistencia o estimado de asistencia 
            let propiedad = evento.date > currentDate ? 'estimate' : 'assistance'
            // uso metodo number para volver numeros    
            let porcentaje = Number(( evento[propiedad] / (evento.capacity / 100)).toFixed(2))
            // to fixed para mover los decimales
            let revenues = evento.price * evento[propiedad]
            let categoria = evento.category
            let fecha = evento.date > currentDate ? 'upcoming' : 'past'
            if(!estadisticas[fecha][categoria]) estadisticas[fecha][categoria] =  { revenues,porcentaje, count:1}
            else{
                estadisticas[fecha][categoria].revenues += revenues
                estadisticas[fecha][categoria].porcentaje += porcentaje
                estadisticas[fecha][categoria].count += 1
            }
            if(estadisticas.masCapacidad.capacity < evento.capacity){
                estadisticas.masCapacidad.capacity = evento.capacity
                estadisticas.masCapacidad.nombre = evento.name
            }
            if(estadisticas.porcentajeMasAlto.porcentaje < porcentaje){
                estadisticas.porcentajeMasAlto.porcentaje = porcentaje
                estadisticas.porcentajeMasAlto.nombre = evento.name
            }
            if(estadisticas.porcentajeMasBajo.porcentaje > porcentaje || !estadisticas.porcentajeMasBajo.porcentaje ){
                estadisticas.porcentajeMasBajo.porcentaje = porcentaje
                estadisticas.porcentajeMasBajo.nombre = evento.name
            }
        
            return estadisticas
        }

        let stats = events.reduce( verificar , estructura)


        tablaUno.innerHTML += `
            <tr>
                <td>${stats.porcentajeMasAlto.nombre} ${stats.porcentajeMasAlto.porcentaje}</td>
                <td>${stats.porcentajeMasBajo.nombre} ${stats.porcentajeMasBajo.porcentaje}</td>
                <td>${stats.masCapacidad.nombre} ${stats.masCapacidad.capacity}</td>
            </tr>
        `
        renderTabla(stats.upcoming, tablaDos)
        renderTabla(stats.past, tablaTres)

    } )
    .catch(err=>console.log("Something is wrong try back later"))

//Funciones
function renderTabla (data, tabla){
        let template = ''
        for(let categoria in data){
            template += `
            <tr>
                <td>${categoria}</td>
                <td>${data[categoria].revenues}</td>
                <td>${data[categoria].porcentaje / data[categoria].count}</td>
            </tr>
            `
        }
        tabla.innerHTML += template
    }



