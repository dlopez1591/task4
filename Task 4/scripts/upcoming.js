const main = document.getElementById('main-js')
const search = document.getElementById('search-js')
const checkboxes = document.getElementById('checkboxes-js')
let eventos;
fetch('https://amazing-events.onrender.com/api/events')
    .then( res => res.json() )
    .then( ( { events, currentDate} ) => {
        eventos = events.filter( event => event.date > currentDate )
        render( crearCheckBoxes( new Set( eventos.map( event => event.category) ) ), checkboxes)
        render( crearCards( eventos ) , main )
    } )
    .catch(err=>console.log(err))


search.addEventListener( 'input', () => {
    let filtrados = filtrar( eventos, search.value )
    filtrados.length > 0 
        ? render( crearCards( filtrados ) , main )
        : main.innerHTML = `<h3 class="text-white text-center"> There are no events matching your search </h3>`
})
checkboxes.addEventListener( 'change', () => {
    let filtrados = filtrar( eventos, search.value )
    filtrados.length > 0 
        ? render( crearCards( filtrados ) , main )
        : main.innerHTML = `<h3 class="text-white text-center"> There are no events matching your search </h3>`
} )

//Funciones


function filtrar(eventos, value){
    let checked = [...document.querySelectorAll( 'input[type="checkbox"]:checked' )].map( check => check.value)
    return eventos.filter( evento => (checked.includes( evento.category)) && evento.name.toLowerCase().includes( value.toLowerCase() ) )
}

const render = (template, elemento) => elemento.innerHTML = template


 function crearCheckBoxes(categorias){
    let template = ''
    for( let categoria of categorias){
        template += `
        <input type="checkbox"  value="${categoria}" id="check-${categoria}" autocomplete="off">
        <label class="checkBoxes">${categoria}</label>
        `
    }
    return template
}

function crearCards(events){
    let template = ''
    for( let event of events){
        template += `
            <div class="card border-secondary pt-3 col-10 col-md-5 col-xl-3">
                    <img class="card-img-top w-100 h-50" src="${event.image}" alt="Title">
                    <div class="card-body d-flex flex-column">
                    <h4 class="card-title">${event.name}</h4>
                    <p class="card-text">Price : ${event.price}</p>
                    <a href="./details.html?id=${event._id}" class="btn btn-secondary col-4 align-self-center">View More</a>
                    </div>
            </div>
        `
    }
    return template
}