// eliminarRow(e) -- eliminar la fila seleccionada de la tabla de productos
// evalCant(e) -- evalua la cantidad ingresada y la ingresa al vectorCompra, a la tabla y al localStorage

// seguirComprando() -- (BOTON) regresa a 7.compras.html para continuar eligiendo productos
// eliminarCompra() -- (BOTON) regresa a 7-compras.html borrando localStorage para recomenzar
// realizarCompra() -- (BOTON) EN CONSTRUCCION

// llenarTabla() -- crea la tabla en el DOM con el vectorCompra
// eliminarTabla() -- elimina tbody, tr y td del DOM

// getLocalStorage() -- desde localStorage se obtiene el vectorCompra
// saveInLocalStorage() -- guarda el vectorCompra en localStorage

// mostrarTotales() -- muestra los totales finales de la planilla


// ------------------------------------------------------------------------------------------
// 8-procesocompra.js
// ------------------------------------------------------------------------------------------
let Total1 = 0;
let canti = [];
getLocalStorage();
if (vectorCompra.length == 0) {
    eliminarCompra();
}
llenarTabla();
const inputCant = document.querySelectorAll('#ingCanti input');
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

//--------------------------------------------------------------------------------------------
//función que evalua la cantidad ingresada y la ingresa al array, a la tabla y al localStorage
const evalCant = (e) => {
    let fila = e.target.name;
    let valido = !(isNaN(e.target.value));// true significa que SI es nro, false significa que NO es nro.
    let valor = Number(e.target.value);
    let subTotalFila = 0;
    debugger;
    if (valido) {
        if (valor > 200) {//si la cantidad es mayor a 200, se utilizará 200 como máximo
            e.target.value = 200;
            valor = Number(e.target.value);
        }
        canti[fila] = valor;
    }else{
        e.target.value = "";
        valor = "";
        canti[fila] = 0;
    }        
    if (canti[fila] != vectorCompra[fila].cantidad) {
        vectorCompra[fila].cantidad = valor;
        subTotalFila = vectorCompra[fila].precio * canti[fila];
        localStorage.clear();
        saveInLocalStorage();
        // mostrar valores modificados
        document.querySelectorAll('#subTDProd')[fila].innerHTML = "$ " + subTotalFila;
        mostrarTotales();
        // window.location.reload();
    }        
}


//----------------------------------------------------------------------------------------------------
//función que evalua las cantidades del array vectorCompra y si hay alguna con 0 entonces lo pone en 1
//(NO ESTA EN USO)
const evalCant333 = (e) => {
    e.preventDefault();
    for (let iterar = 0; iterar < vectorCompra.length; iterar++) {
        if (vectorCompra[iterar].cantidad < 1) {
        vectorCompra[iterar].cantidad = 1;
        }
    }
    localStorage.clear();
    saveInLocalStorage();
    window.location.reload();
}


//-------------------------------------------------------------
//función que obtiene de localStorage el vectorCompra
function getLocalStorage() {
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
    Total1 = 0;
    canti = [];
    for (let i=0; i<vectorCompra.length; i++) {
        canti[i] = vectorCompra[i].cantidad;
    }
    const tbody = document.querySelector('tbody');// indico una tbody
    for (let fila in vectorCompra) {
        const row = document.createElement('tr');
        // <input type="number" name=${fila} class="inp-bor cantidad" min="1" max="200" value=${canti[fila]}>

        Total1 += vectorCompra[fila].precio * vectorCompra[fila].cantidad;
        row.innerHTML = `
            <td id="datTDProd">${vectorCompra[fila].codigo}</td>
            <td id="datTDProd">${vectorCompra[fila].nombre}</td>
            <td id="datTDProd"><label>$ ${vectorCompra[fila].precio}</label></td>
            <td id="ingCanti">
                <input type="text" name=${fila} class="inp-bor cantidad" 
                value=${canti[fila]}>
            </td>
            <td id="subTDProd"><label>$ ${vectorCompra[fila].precio * canti[fila]}</label></td>
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
}


//-------------------------------------------------------------
//muestra subTotal Parcial, IVA y Total
const mostrarTotales = () => {
    let tot1 = 0;
    for (let iterar = 0; iterar < vectorCompra.length; iterar++) {
        tot1 += vectorCompra[iterar].precio * vectorCompra[iterar].cantidad;  
    }
    let tot2 = tot1 * 0.2;
    let tot3 = tot1 + tot2;
    document.getElementById('tot1').innerHTML='$ '+tot1.toFixed(2);
    document.getElementById('tot2').innerHTML='$ '+tot2.toFixed(2);
    document.getElementById('tot3').innerHTML='$ '+tot3.toFixed(2);
}


//-------------------------------------------------------------
//función que regresa a 7-compras.html para continuar eligiendo productos
function seguirComprando() {
    window.location.href="7-Compras.html";
}
//-------------------------------------------------------------
//función que regresa 7-compras.html borrando localStorage para recomenzar
function eliminarCompra() {
    localStorage.clear();
    window.location.href="7-Compras.html";
}
//-------------------------------------------------------------
//función de realizar la compra (EN CONSTRUCCION)
function realizarCompra() {
    debugger;
}


// -----------------------------------------------------------------------------
// EVENTOS
// (1) Evento para los inputs de cantidad de productos a comprar
inputCant.forEach((input) => {// compruebo cada input de la tabla, y de acuerdo a que sea se hace una función
    input.addEventListener('keyup', evalCant);//cuando yo levanto la tecla presionada, se ejecutará evalCant
    // input.addEventListener('blur', evalCant333);//cuando pierde el foco, se ejecutará evalCant333
    // input.addEventListener('mousemove', evalCant333);//cuando pierde el foco, se ejecutará evalCant333
});
// (2) Evento para los íconos de eliminar filas de la tabla
icoTabla.forEach((unIcono) => {
    unIcono.addEventListener('click', eliminarRow);// se hace la fc. cuando hago click sobre el ícono
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


