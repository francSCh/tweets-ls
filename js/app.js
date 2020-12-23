//VARIABLES
const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');
let tweets = [];




//EVEN LISTENERS
eventListeners();

function eventListeners() {
    formulario.addEventListener('submit', agregarTweet);
    document.addEventListener('DOMContentLoaded', () => {
        tweets = JSON.parse(localStorage.getItem('tweets')) || [];
        console.log('tweets');

        crearHTML();
    });
}



//FUNCIONES
function agregarTweet(e) {
    e.preventDefault();

    //Textarea donde el usuario escribe
    const tweet = document.querySelector('#tweet').value;

    if (tweet === '') {
        const error = document.querySelector('p.error');
        if (error) {
            error.remove();
        }
        mostrarError('Un mensaje no puede ir vacío');

        return; //evita que se ejecuten más líneas de código
    }

    const tweetObj = {
        id: Date.now(),
        tweet //Como llave y valor son iguales, puedes dejar solamente uno
    }

    //Añadir el mensaje al arreglo de tweets
    tweets = [...tweets, tweetObj];

    crearHTML();

    //Reiniciamos el formulario
    formulario.reset();
}

function mostrarError(error) {
    const mensajeError = document.createElement('p');
    mensajeError.textContent = error;
    mensajeError.classList.add('error');

    const contenido = document.querySelector('#contenido');
    contenido.appendChild(mensajeError);

    setTimeout(() => {
        mensajeError.remove();
    }, 3000);
}

function crearHTML() {

    limpiarHTML();

    if (tweets.length > 0) {
        tweets.forEach(tweet => {
            const btnEliminar = document.createElement('a');
            btnEliminar.classList.add('borrar-tweet');
            btnEliminar.innerText = 'X';
            btnEliminar.onclick = () => {
                borrarTweet(tweet.id);
            };

            const li = document.createElement('li'); //Creamos el HTML
            li.innerText = tweet.tweet; //Añadimos el texto
            li.appendChild(btnEliminar); //Le añadimos el botón de eliminar
            listaTweets.appendChild(li); //Lo insertamos en el HTML
        });
    }

    sincronizarStorage();
}

function sincronizarStorage() {
    localStorage.setItem('tweets', JSON.stringify(tweets));
}

function borrarTweet(id) {
    tweets = tweets.filter(tweet => tweet.id !== id);
    crearHTML();
}

function limpiarHTML() {
    while (listaTweets.firstChild) {
        listaTweets.removeChild(listaTweets.firstChild);
    }
}