let amigos = [];
const botonCopiar = document.getElementById('copiarResultado');

function agregarAmigo() {
    const input = document.getElementById('amigo');
    const nombre = input.value.trim();

    if (nombre === "") {
        alert("Por favor, ingresa un nombre válido.");
        return;
    }

    if (amigos.includes(nombre)) {
        alert("Este nombre ya está en la lista. ¡Ingresa un nombre diferente!");
        return;
    }

    amigos.push(nombre);
    input.value = "";

    actualizarLista();
}

function actualizarLista() {
    const lista = document.getElementById('listaAmigos');
    const botonLimpiar = document.getElementById('limpiarLista');

    lista.innerHTML = "";

    if (amigos.length > 0) {
        botonLimpiar.style.display = "inline-block";
    } else {
        botonLimpiar.style.display = "none";
    }

    amigos.forEach((amigo, index) => {
        const item = document.createElement('li');
        item.textContent = amigo;
        item.classList.add('name-item');

        const botonEliminar = document.createElement('button');
        botonEliminar.textContent = "Eliminar";
        botonEliminar.classList.add('button-remove');
        botonEliminar.onclick = () => eliminarNombre(index);

        item.appendChild(botonEliminar);
        lista.appendChild(item);
    });
}

function eliminarNombre(index) {
    amigos.splice(index, 1);
    actualizarLista();
}

function limpiarLista() {
    amigos = [];
    actualizarLista();
    botonCopiar.style.display = "none";
    const resultado = document.getElementById('resultado');
    resultado.innerHTML = "";
}

function sortearAmigo() {
    const resultado = document.getElementById('resultado');

    if (amigos.length === 0) {
        alert("No hay nombres en la lista. Agrega algunos primero.");
        return;
    }

    if (amigos.length === 1) {
        resultado.innerHTML = `<li class="result-item">¡Solo hay una persona en la lista: <strong>${amigos[0]}</strong>! Agrega más amigos para hacer un sorteo.</li>`;
        botonCopiar.style.display = "none";
        return;
    }

    const indiceAleatorio = Math.floor(Math.random() * amigos.length);
    const amigoSecreto = amigos[indiceAleatorio];

    resultado.innerHTML = `<li class="result-item">¡El amigo secreto es: <strong>${amigoSecreto}</strong>!</li>`;

    botonCopiar.style.display = "inline-block";
}

function copiarResultado() {
    const resultado = document.getElementById('resultado').textContent;
    navigator.clipboard.writeText(resultado)
        .then(() => alert("Resultado copiado al portapapeles."))
        .catch(() => alert("No se pudo copiar el resultado."));
}