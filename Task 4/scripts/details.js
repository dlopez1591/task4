import { render, crearCards, crearCheckBoxes } from './module/funciones.js'
const titulo = document.getElementById('titulo')
const main = document.getElementById('main-js')
const params = new URLSearchParams(location.search)
const id = params.get('id')
fetch('https://amazing-events.onrender.com/api/events')
    .then( res => res.json() )
    .then( ( { events } ) => {
        let evento = events.find( event => event._id === id )
        console.log(evento)
        document.title += ` - ${evento.name}`
        titulo.innerHTML = evento.name
        main.innerHTML = `
            <div class="card border-secondary px-2 py-3 m-3 d-flex col-11 flex-row flex-wrap">
                <img class="card-img-top ancho" src="${evento.image}" alt="Title">
                <div class="card-body d-flex flex-column ancho">
                <h4 class="card-title">${evento.name}</h4>
                <p class="card-text">${evento.description}</p>
                    <p class="card-text">Category : ${evento.category}</p>
                    <p class="card-text">Date : ${evento.date}</p>
                    <p class="card-text">Capacity : ${evento.capacity}</p>
                    <p class="card-text">${evento.estimate ? 'estimate': 'assistance'} : ${evento.estimate || evento.assistance}</p>
                    <p class="card-text">Price : ${evento.price}</p>
                </div>
            </div>
        `
    } )
    .catch(err=>console.log(err))
