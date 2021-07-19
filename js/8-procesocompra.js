// handleDeleteRow(e)       -- eliminar la fila seleccionada de la tabla de productos
// handleEvaluarCantidad(e) -- evalua la cantidad ingresada y la ingresa al vectorCompra, a la tabla y al localStorage

// handleSeguirComprando()  -- (BOTON) regresa a 7.compras.html para continuar eligiendo productos
// handleEliminarCompra()   -- (BOTON) regresa a 7-compras.html borrando localStorage para recomenzar
// handleRealizarCompra()   -- (BOTON) EN CONSTRUCCION

// fillTable()              -- crea la tabla en el DOM con el vectorCompra
// deleteTable()            -- elimina la tabla del DOM, elimina los tr y los td

// getLocalStorage()        -- desde localStorage se obtiene el vectorCompra
// saveInLocalStorage()     -- guarda el vectorCompra en localStorage

// showTotals()             -- muestra los totales finales de la planilla
// handleRemoveZeros()      -- saca los ceros a izquierda en los campos de cantidad


// ------------------------------------------------------------------------------------------
// 8-procesocompra.js
// ------------------------------------------------------------------------------------------
let Total1 = 0;
let canti = [];
getLocalStorage();
if (vectorCompra.length == 0) {
    handleEliminarCompra();
}
fillTable();
$('#tot1').text('$ '+`${Total1.toFixed(2)}`);
$('#tot2').text('$ '+`${IVA.toFixed(2)}`);
$('#tot3').text('$ '+`${Total2.toFixed(2)}`);
// pongo el foco en el primer input y saco ceros a izquierda si tuviera
let primerInput = Number($('#0').val());//obtengo el valor numérico del primer input de la tabla
$('#0').focus().val("").val(primerInput);//pongo el cursor a la derecha de ese input


//-------------------------------------------------------------
//función que elimina la fila elegida de la tabla 
function handleDeleteRow(e) {
    e.preventDefault();
    if (vectorCompra.length == 1) {
        handleEliminarCompra();
    }else{
        let indice = e.target.name;
        vectorCompra.splice(indice,1);
        localStorage.clear();
        saveInLocalStorage();
        window.location.reload();
        // deleteTable();
        // fillTable();
    }
}

//--------------------------------------------------------------------------------------------
//función que evalua la cantidad ingresada y la ingresa al array, a la tabla y al localStorage
function handleEvaluarCantidad(e) {
    let fila = e.target.name;
    let valido = !(isNaN(e.target.value));// true significa que SI es nro, false significa que NO es nro.
    let valor = Number(e.target.value);
    let subTotalFila = 0;
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
        // document.querySelectorAll('#subTDProd')[fila].innerHTML = "$ " + subTotalFila;
        $("td#subTDProd label").eq(fila).text("$ " + subTotalFila);
        showTotals();
        // window.location.reload();
    }
    let teclaPress = e.originalEvent.keyCode;// última tecla presionada
    if ( teclaPress == 13) {//si presiono enter o tab, voy al próximo input
        $('#'+fila).focus().val("").val(valor);//en el input actual saco los ceros de la izquierda
        let proxInput = Number(e.target.name) + 1;//próximo input
        if (proxInput > vectorCompra.length-1) {//si me paso, voy al comienzo
            proxInput = 0;
        }
        let proxInputValor = Number($('#'+proxInput).val());//obtengo el valor del próximo input
        $('#'+proxInput).focus().val("").val(proxInputValor);//pongo el cursor a la derecha de el próximo input
    }        
}


//--------------------------------------------------------------------------------
//función que saca los ceros a izquierda en los campos de cantidad
function handleRemoveZeros() {
    for (row in vectorCompra) {
        let inputValor = Number($('#'+row).val());//obtengo el valor del input
        $('#'+row).val("").val(inputValor);//limpio el valor y le pongo el nro inputValor
    }
}


//----------------------------------------------------------------------------------------------------
//función que evalua las cantidades del array vectorCompra y si hay alguna con 0 entonces lo pone en 1
//(NO ESTA EN USO)
function handleEvaluarCantidad333(e) {
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
// function getLocalStorage() {
//function getLocalStorage(key) {
//function getLocalStorage("vectorCompra") {
    //Obtenemos el listado de productos almacenado
    const almacenados = JSON.parse(localStorage.getItem("vectorCompra"));
    if (almacenados != null) {
        //Iteramos almacenados con for...of para transformar todos sus objetos a tipo producto.
        // for (const ifila of almacenados) {
        //     vectorCompra.push(new moldeProducto(ifila.codigo,ifila.nombre,ifila.precio,ifila.cantidad));
        // }
        //o sino que es lo mismo
        almacenados.forEach(ifila => {
            vectorCompra.push(new moldeProducto(ifila.imagen,ifila.codigo,ifila.nombre,ifila.precio,ifila.cantidad));
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
//función que elimina el tbody de la tabla (NO ESTA EN USO)
function deleteTable() {
    $('tbody').empty();//borra los elementos hijos, pero no el tbody

    // let arrayTD;
    // let arrayIngCanti;
    // let arrayIcono;
    // let arrayTR;
    // let borrar5;
    // let tbody;
    // let padreTbody;
    // let iterar = 0;
    // por si quiero hacer el proceso sin que se vea
    // const datProd = document.getElementById('datProd');
    // datProd.classList.add('noveo');

    // elimino todos los td de la tabla tbody con id datTDProd
    // arrayTD = document.querySelectorAll('#datTDProd');
    // for (iterar = 0; iterar < arrayTD.length; iterar++) {
    //     arrayTD[iterar].parentNode.removeChild(arrayTD[iterar]);
    // }
    // // elimino todos los td de la tabla tbody con id ingCanti
    // arrayIngCanti = document.querySelectorAll('#ingCanti');
    // for (iterar = 0; iterar < arrayIngCanti.length; iterar++) {
    //     arrayIngCanti[iterar].parentNode.removeChild(arrayIngCanti[iterar]);
    // }
    // // elimino todos los td de la tabla tbody con id icono
    // arrayIcono = document.querySelectorAll('#icono');
    // for (iterar = 0; iterar < arrayIcono.length; iterar++) {
    //     arrayIcono[iterar].parentNode.removeChild(arrayIcono[iterar]);
    // }
    // // elimino todos los tr de la tabla tbody con id datTRProd
    // arrayTR = document.querySelectorAll('#datTRProd');
    // for (iterar = 0; iterar < arrayTR.length; iterar++) {
    //     arrayTR[iterar].parentNode.removeChild(arrayTR[iterar]);
    // }
    // // busco el tbody con id datProd
    // borrar5 = document.querySelectorAll('#datProd')[0];
    // // borro el tbody
    // borrar5.parentNode.removeChild(borrar5);
    // // creo un nuevo elemento tbody
    // tbody = document.createElement("tbody");
    // // al elemento tbody le pongo el id datProd
    // tbody.id = "datProd";
    // // busco el padre de tbody por el tag name thead
    // padreTbody = document.getElementsByTagName('thead')[0].parentNode;
    // // al padre le agrego un hijo tbody al final
    // padreTbody.appendChild(tbody);
    // // restituyo la visibilidad del tbody (si no lo hubiera borrado)
    // // datProd.classList.remove('noveo');
}

//-------------------------------------------------------------
//función que crea y llena la tabla
function fillTable() {
    Total1 = 0;
    canti = [];
    for (fila in vectorCompra) {
        canti[fila] = vectorCompra[fila].cantidad;
        Total1 += vectorCompra[fila].precio * vectorCompra[fila].cantidad;
        $('tbody').append(`<tr id="datTRProd">
            <td id="datTDProd"><img src=./imagenes/${vectorCompra[fila].imagen} width="100" alt="## imagen no disponible ##"/></td>
            <td id="datTDProd">${vectorCompra[fila].codigo}</td>
            <td id="datTDProd">${vectorCompra[fila].nombre}</td>
            <td id="datTDProd"><label>$ ${vectorCompra[fila].precio}</label></td>
            <td id="ingCanti">
                <input type="text" id=${fila} name=${fila} class="inp-bor cantidad" 
                value=${canti[fila]}>
            </td>
            <td id="subTDProd"><label>$ ${vectorCompra[fila].precio * canti[fila]}</label></td>
            <td id="icono">
                <a href="#" class="borrar-producto fas fa-times-circle" data-id="${fila}">
                    <img src="./imagenes/ico5.png" class="iconox" name=${fila} alt="icono">
                </a>
            </td>
        </tr>`);
    }    
    IVA = Total1 * 0.2;
    Total2 = Total1 + IVA;
}

//-------------------------------------------------------------
//función que crea y llena la tabla
// function fillTable() {
//     Total1 = 0;
//     canti = [];
//     for (let i=0; i<vectorCompra.length; i++) {
//         canti[i] = vectorCompra[i].cantidad;
//     }    
//     const tbody = document.querySelector('tbody');// indico una tbody
//     for (let fila in vectorCompra) {
//         const row = document.createElement('tr');
//         Total1 += vectorCompra[fila].precio * vectorCompra[fila].cantidad;
//         row.innerHTML = `
//             <td id="datTDProd">${vectorCompra[fila].imagen}</td>
//             <td id="datTDProd">${vectorCompra[fila].codigo}</td>
//             <td id="datTDProd">${vectorCompra[fila].nombre}</td>
//             <td id="datTDProd"><label>$ ${vectorCompra[fila].precio}</label></td>
//             <td id="ingCanti">
//                 <input type="text" name=${fila} class="inp-bor cantidad" 
//                 value=${canti[fila]}>
//             </td>
//             <td id="subTDProd"><label>$ ${vectorCompra[fila].precio * canti[fila]}</label></td>
//             <td id="icono">
//                 <a href="#" class="borrar-producto fas fa-times-circle" data-id="${fila}">
//                     <img src="./imagenes/ico5.png" class="iconox" name=${fila} alt="icono">
//                 </a>
//             </td>
//         `;
//         row.id = "datTRProd";
//         tbody.appendChild(row);// tr hijo de tbody   
//     }    
//     IVA = Total1 * 0.2;
//     Total2 = Total1 + IVA;
// }

//-------------------------------------------------------------
//muestra subTotal Parcial, IVA y Total
function showTotals() {
    let tot1 = 0;
    for (fila in vectorCompra) {
        tot1 += vectorCompra[fila].precio * vectorCompra[fila].cantidad;  
    }
    let tot2 = tot1 * 0.2;
    let tot3 = tot1 + tot2;
    // document.getElementById('tot1').innerHTML='$ '+tot1.toFixed(2);
    // document.getElementById('tot2').innerHTML='$ '+tot2.toFixed(2);
    // document.getElementById('tot3').innerHTML='$ '+tot3.toFixed(2);
    $('#tot1').text('$ '+`${tot1.toFixed(2)}`);
    $('#tot2').text('$ '+`${tot2.toFixed(2)}`);
    $('#tot3').text('$ '+`${tot3.toFixed(2)}`);
}


//-------------------------------------------------------------
//función que regresa a 7-compras.html para continuar eligiendo productos
function handleSeguirComprando() {
    window.location.href="7-Compras.html";
}
//-------------------------------------------------------------
//función que regresa 7-compras.html borrando localStorage para recomenzar
function handleEliminarCompra() {
    localStorage.clear();
    window.location.href="7-Compras.html";
}
//-------------------------------------------------------------
//función de realizar la compra (EN CONSTRUCCION)
function handleRealizarCompra() {
    debugger;
}


// -----------------------------------------------------------------------------
// EVENTOS
// Al comienzo de página:
// const inputCant = document.querySelectorAll('#ingCanti input');
// const icoTabla = document.querySelectorAll('#icono img');
// -----------------------------------------------------------------------------
// (1) Evento para los inputs de cantidad de productos a comprar
// inputCant.forEach((input) => {// compruebo cada input de la tabla, y de acuerdo a que sea se hace una función
    // input.addEventListener('keyup', handleEvaluarCantidad);//cuando yo levanto la tecla presionada, se ejecutará handleEvaluarCantidad
    // input.addEventListener('blur', handleEvaluarCantidad333);//cuando pierde el foco, se ejecutará handleEvaluarCantidad333
    // input.addEventListener('mousemove', handleEvaluarCantidad333);//cuando pierde el foco, se ejecutará handleEvaluarCantidad333
// });
$('#ingCanti input').each(function() {
    $(this).on('keyup', handleEvaluarCantidad);
});

// (2) Evento para los íconos de eliminar filas de la tabla
// icoTabla.forEach((unIcono) => {
    // unIcono.addEventListener('click', handleDeleteRow);// se hace la fc. cuando hago click sobre el ícono
// });
$('#icono img').each(function() {
    $(this).on('click', handleDeleteRow);
});

// (3) Evento botón de seguir comprando
$('button#seguirComprando').on('click', () => {
    handleSeguirComprando();
});

// (4) Evento botón de eliminar compra
$('button#eliminarCompra').on('click', () => {
    handleEliminarCompra()
});

// (5) Evento botón de realizar compra (EN CONSTRUCCION)
$('button#realizarCompra').on('click', () => {
    handleRealizarCompra();
});

// (6) Evento del mouse sobre el contenedor que saca los ceros a izquierda de los inputs de cantidad
$('.contenedor').on('mousemove', () => {
    handleRemoveZeros();
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


