// eliminarRow(e) -- eliminar la fila seleccionada de la tabla de productos
// ingresoCantidad(e) -- ingresa las cantidades de cada producto al vectorCompra

// seguirComprando() -- (BOTON) regresa a 7.compras.html para continuar eligiendo productos
// eliminarCompra() -- (BOTON) regresa a 7-compras.html borrando localStorage para recomenzar
// realizarCompra() -- (BOTON) EN CONSTRUCCION

// llenarTabla() -- crea la tabla en el DOM con el vectorCompra
// eliminarTabla() -- elimina tbody, tr y td del DOM

// getLocalStorage() -- desde localStorage se obtiene el vectorCompra
// saveInLocalStorage() -- guarda el vectorCompra en localStorage


// ------------------------------------------------------------------------------------------
// 8-procesocompra.js
// ------------------------------------------------------------------------------------------
let Total1 = 0;
let canti = [];
debugger;
getLocalStorage();
if (vectorCompra.length == 0) {
    eliminarCompra();
}
llenarTabla();
const inputs = document.querySelectorAll('#ingCanti input');
const icoTabla = document.querySelectorAll('#icono img');

document.getElementById('tot1').innerHTML='$ '+Total1.toFixed(2);
document.getElementById('tot2').innerHTML='$ '+IVA.toFixed(2);
document.getElementById('tot3').innerHTML='$ '+Total2.toFixed(2);


//-------------------------------------------------------------
//función que elimina la fila elegida de la tabla 
const eliminarRow = (e) => {
    e.preventDefault();
    if (vectorCompra.length == 1) {
        eliminarCompra();
    }else{
        let indice = e.target.name;
        vectorCompra.splice(indice,1);
        localStorage.clear();
        saveInLocalStorage();
        window.location.reload();
        // eliminarTabla();
        // llenarTabla();
    }
}


//-------------------------------------------------------------
//función que ingresa las cantidades de cada producto al vectorCompra
//para ubicar el índice se utilizó poner name=(nro) en el input
//generado en la función llenarTabla()
const ingresoCantidad = (e) => {
    e.preventDefault();
    let valor;
    let valido = !(isNaN(e.target.valueAsNumber));// si el número es un nro. es true
    if ((valido) && (e.target.value > 0)) {
        valor = e.target.value;
    }else{
        valor = 1;
        e.target.value = 1;
    }
    canti[e.target.name] = valor;

    if (canti[e.target.name] != vectorCompra[e.target.name].cantidad) {
        vectorCompra[e.target.name].cantidad = valor;
        localStorage.clear();
        saveInLocalStorage();
        window.location.reload();
    }
}


//-------------------------------------------------------------
//función que obtiene de localStorage el vectorCompra
function getLocalStorage() {
    debugger;
//function getLocalStorage(key) {
//function getLocalStorage("vectorCompra") {
    //Obtenemos el listado de productos almacenado
    const almacenados = JSON.parse(localStorage.getItem("vectorCompra"));
    if (almacenados != null) {
        //Iteramos almacenados con for...of para transformar todos sus objetos a tipo producto.
        // for (const ifila of almacenados) {
        //     vectorCompra.push(new Producto(ifila.codigo,ifila.nombre,ifila.precio,ifila.cantidad));
        // }
        //o sino que es lo mismo
        almacenados.forEach(ifila => {
            vectorCompra.push(new Producto(ifila.codigo,ifila.nombre,ifila.precio,ifila.cantidad));
        });
    }        
}
//-------------------------------------------------------------
//función que guarda el vectorCompra en localStorage
function saveInLocalStorage() {
//function saveInLocalStorage(key, item) {
//function saveInLocalStorage("vectorCompra",vectorCompra) {
    if (vectorCompra.length != 0) {
        const enJSON = JSON.stringify(vectorCompra);
        localStorage.setItem("vectorCompra", enJSON);
        // console.log(enJSON); // {"id":2,"producto":"Arroz"}
        // console.log(typeof vectorCompra); // object
        // console.log(typeof enJSON);    // string
    }
}


//-------------------------------------------------------------
//función que elimina el tbody de la tabla
function eliminarTabla() {
    let borrar1;
    let borrar2;
    let borrar3;
    let borrar4;
    let borrar5;
    let tbody;
    let padreTbody;
    // por si quiero hacer el proceso sin que se vea
    // const datProd = document.getElementById('datProd');
    // datProd.classList.add('noveo');
    do {// elimino todos los td de la tabla tbody con id datTDProd
        borrar1 = document.querySelectorAll('#datTDProd')[0];
        if (borrar1) {
            borrar1.parentNode.removeChild(borrar1);
        }
    } while (borrar1);
    do {// elimino todos los td de la tabla tbody con id ingCanti
        borrar2 = document.querySelectorAll('#ingCanti')[0];
        if (borrar2) {
            borrar2.parentNode.removeChild(borrar2);
        }
    } while (borrar2);
    do {// elimino todos los td de la tabla tbody con id icono
        borrar3 = document.querySelectorAll('#icono')[0];
        if (borrar3) {
            borrar3.parentNode.removeChild(borrar3);
        }
    } while (borrar3);
    do {// elimino todos los tr de la tabla tbody con id datTRProd
        borrar4 = document.querySelectorAll('#datTRProd')[0];
        if (borrar4) {
            borrar4.parentNode.removeChild(borrar4);
        }
    } while (borrar4);
    // busco el tbody con id datProd
    borrar5 = document.querySelectorAll('#datProd')[0];
    // borro el tbody
    borrar5.parentNode.removeChild(borrar5);
    // creo un nuevo elemento tbody
    tbody = document.createElement("tbody");
    // al elemento tbody le pongo el id datProd
    tbody.id = "datProd";
    // busco el padre de tbody por el tag name thead
    padreTbody = document.getElementsByTagName('thead')[0].parentNode;
    // al padre le agrego un hijo tbody al final
    padreTbody.appendChild(tbody);
    // restituyo la visibilidad del tbody (si no lo hubiera borrado)
    // datProd.classList.remove('noveo');
}

//-------------------------------------------------------------
//función que crea y llena la tabla
function llenarTabla() {
    debugger;
    Total1 = 0;
    canti = [];
    for (let i=0; i<vectorCompra.length; i++) {
        canti[i] = vectorCompra[i].cantidad;
    }
    const tbody = document.querySelector('tbody');// indico una tbody
    for (let fila in vectorCompra) {
        const row = document.createElement('tr');

        Total1 += vectorCompra[fila].precio * vectorCompra[fila].cantidad;
        row.innerHTML = `
            <td id="datTDProd">${vectorCompra[fila].codigo}</td>
            <td id="datTDProd">${vectorCompra[fila].nombre}</td>
            <td id="datTDProd"><label>$ ${vectorCompra[fila].precio}</label></td>
            <td id="ingCanti">
                <input type="number" name=${fila} class="form-control cantidad" min="1" max="200" value=${canti[fila]}>
            </td>
            <td id="datTDProd"><label>$ ${vectorCompra[fila].precio * canti[fila]}</label></td>
            <td id="icono">
                <a href="#" class="borrar-producto fas fa-times-circle" data-id="${fila}">
                    <img src="./imagenes/ico5.png" class="iconox" name=${fila} alt="icono">
                </a>
            </td>
        `;
        row.id = "datTRProd";
        tbody.appendChild(row);// tr hijo de tbody   
    }    

    IVA = Total1 * 0.2;
    Total2 = Total1 + IVA;
    debugger;
}


//-------------------------------------------------------------
//función que regresa a 7-compras.html para continuar eligiendo productos
function seguirComprando() {
    window.location.href="7-compras.html";
}
//-------------------------------------------------------------
//función que regresa 7-compras.html borrando localStorage para recomenzar
function eliminarCompra() {
    localStorage.clear();
    window.location.href="7-compras.html";
}
//-------------------------------------------------------------
//función de realizar la compra (EN CONSTRUCCION)
function realizarCompra() {
    debugger;
}


// -----------------------------------------------------------------------------
// EVENTOS

// (1) Evento para los inputs de cantidad de productos a comprar
inputs.forEach((unInput) => {// compruebo cada input del formulario, y de acuerdo a que sea se hace una función
	unInput.addEventListener('mouseout', ingresoCantidad);// se hace la fc. cuando el mouse se va del campo
    // input.addEventListener('focusout', ingresoCantidad);// se hace la fc. cuando salgo del campo
});

// (2) Evento para los íconos de eliminar filas de la tabla
icoTabla.forEach((unIcono) => {
    unIcono.addEventListener('click', eliminarRow);// se hace la fc. cuando hago click sobre el ícono
    // unIcono.addEventListener('click', eliminarRow);// se hace la fc. cuando hago click sobre el ícono
});

//-------------------------------------------------------------------------------












// LO QUE ESTA DESDE AQUI, NO CUMPLE NINGUNA FUNCION
// SON EJEMPLOS DE FUNCIONES 

//-------------------------------------------------------------
function procesarCompra1() {// EJEMPLO PARA VER, NO SE USA
    const productos = [{ id: 1,  producto: "Arroz", precio: 125 },
                    {  id: 2,  producto: "Fideo", precio: 70 },
                    {  id: 3,  producto: "Pan"  , precio: 50},
                    {  id: 4,  producto: "Flan" , precio: 100}];

    const guardarLocal = (clave, valor) => { localStorage.setItem(clave, valor) };

    //Almacenar producto por producto
    for (const producto of productos) {
        guardarLocal(producto.id, JSON.stringify(producto));
    }
    // o almacenar array completo
    guardarLocal("listaProductos", JSON.stringify(productos));
}
//-------------------------------------------------------------
function obtenerObjAlmacenado() {// EJEMPLO PARA VER, NO SE USA
    class Producto {
        constructor(obj) {
            this.nombre  = obj.producto.toUpperCase();
            this.precio  = parseFloat(obj.precio);
        }
        sumaIva() {
            this.precio = this.precio * 1.21;
        }
    }
    //Obtenemos el listado de productos almacenado
    const almacenados = JSON.parse(localStorage.getItem("listaProductos"));
    const productos = [];
    //Iteramos almacenados con for...of para transformar todos sus objetos a tipo producto.
    for (const objeto of almacenados)
        productos.push(new Producto(objeto));
    //Ahora tenemos objetos productos y podemos usar sus métodos
    for (const producto of productos)
        producto.sumaIva();
}
//-------------------------------------------------------------
function leerStorage() {// EJEMPLO PARA VER, NO SE USA
//Ciclo para recorrer las claves almacenadas en el objeto localStorage
    for (let i = 0; i < localStorage.length; i++) {
        let clave = localStorage.key(i);
        console.log("Clave: "+ clave);
        console.log("Valor: "+ localStorage.getItem(clave));
    }
}
//-------------------------------------------------------------
function transJSONaString() {// EJEMPLO PARA VER, NO SE USA
//transformar JSON.parse transformo string en objeto javascript
const enJSON    = '{"id":2,"producto":"Arroz"}';
const producto1 = JSON.parse(enJSON);

console.log(typeof enJSON);     // string
console.log(typeof producto1);  // object
console.log(producto1.producto); // Arroz

const producto2 = JSON.parse(localStorage.getItem("producto1"));
console.log(producto2.id);  // 2    
}

// localStorage.setItem('bienvenida', '¡Hola Code!');
// sessionStorage.setItem('esValido', true);

// localStorage.removeItem('bienvenida');
// sessionStorage.removeItem('esValido');
// localStorage.clear()    //elimina toda la información
// sessionStorage.clear() //elimina toda la información


