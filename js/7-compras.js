let seVeTabla = false;// true se esta viendo, false está oculta

$(document).ready(function() {

    //Si localStorage tiene datos, entonces creo vectorCompra y creo carrito
    const almacenados = JSON.parse(localStorage.getItem("vectorCompra"));
    if (almacenados != null) {
        // //Iteramos almacenados con for...of para transformar todos sus objetos a tipo moldeProducto.
        for (const item of almacenados) {
            if (item.cantidad != 0) {
                vectorCompra.push(new moldeProducto(item.imagen,item.codigo,item.nombre,item.precio,item.cantidad));
            }
        }
        if (vectorCompra.length != 0) {
            guardarLocalStorage();
            crearCarrito();
            seVeTabla = false;
            verCarrito();
        }
    }    
    totProductos();
    
});


//-----------------------------------------------------------------------------
//función que ingresa el producto elegido al objeto vectorCompra y localStorage
function addProd(a,b,c,d,e) {
    if (vectorCompra.length == 0) {
        // pregunto si el objeto está vacío, si true entonces ingreso el producto
        vectorCompra.push(new moldeProducto(a,b,c,d,e));
        guardarLocalStorage();
        totProductos();
    }else{
        // busco si el producto a agregar estaba ya ingresado
        const encontrado = vectorCompra.find(encontrado => encontrado.codigo === b);
        if (!encontrado) {// si no está, lo ingreso
            vectorCompra.push(new moldeProducto(a,b,c,d,e));
            guardarLocalStorage();
            totProductos();
        }
    }
    // carrito actualizado con este último ingreso
    eliminarCarrito();
    crearCarrito();
}


//-----------------------------------------------------------------
//función que crea la tabla carrito al hacer click en ícono carrito
function crearCarrito() {
    if (vectorCompra.length != 0) {
        for (let fila in vectorCompra) {        
            $('tbody#datProd').append(`<tr id="datTRProd">
                <td id="datTDProd">${vectorCompra[fila].imagen}</td>
                <td id="datTDProd">${vectorCompra[fila].codigo}</td>
                <td id="datTDProd">${vectorCompra[fila].nombre}</td>
                <td id="datTDProd">${vectorCompra[fila].precio}</td>
                <td id="datTDProd">${vectorCompra[fila].cantidad}</td>
            </tr>`);
        }
        $('td#datTDProd:nth-child(5n-4)').hide();//oculta imagen en la tabla
        $('td#datTDProd:nth-child(5n)').hide();//oculta cantidad en la tabla
    }
    // if (vectorCompra.length != 0) {
    //     const tbody = document.querySelector('tbody');// indico una tbody
    //     for (let fila in vectorCompra) {
    //         const row = document.createElement('tr');
    //         row.innerHTML = `
    //             <td id="datTDProd" class="noveo">${vectorCompra[fila].imagen}</td>
    //             <td id="datTDProd">${vectorCompra[fila].codigo}</td>
    //             <td id="datTDProd">${vectorCompra[fila].nombre}</td>
    //             <td id="datTDProd">${vectorCompra[fila].precio}</td>
    //             <td id="datTDProd" class="noveo">${vectorCompra[fila].cantidad}</td>
    //         `;
    //         row.id = "datTRProd";
    //         tbody.appendChild(row);// tr hijo de tbody   
    //     }    
    // }
}


//--------------------------------------------------------------------
//función que elimina la tabla carrito al hacer click en ícono carrito
function eliminarCarrito() {
    // $('#datProd').addClass('noveo');
    $('#datProd').hide();
    $('tbody#datProd').empty();//borra los elementos hijos, pero no el tbody
    $('#datProd').show();
    // $('#datProd').removeClass('noveo');

    // let arrayTD;
    // let arrayTR;
    // let iterar = 0;
    // const datProd = document.getElementById('datProd');
    // datProd.classList.add('noveo');
    // // elimino todos los td de la tabla tbody
    // arrayTD = document.querySelectorAll('#datTDProd');
    // for (iterar = 0; iterar < arrayTD.length; iterar++) {
    //     arrayTD[iterar].parentNode.removeChild(arrayTD[iterar]);
    // }
    // // elimino todos los tr de la tabla tbody
    // arrayTR = document.querySelectorAll('#datTRProd');
    // for (iterar = 0; iterar < arrayTR.length; iterar++) {
    //     arrayTR[iterar].parentNode.removeChild(arrayTR[iterar]);
    // }
    // datProd.classList.remove('noveo');
}


//-------------------------------------------------------------
//función que muestra o no muestra la tabla carrito al hacer click en ícono carrito
function verCarrito () {
    if (seVeTabla) {// si se ve, oculto la tabla carrito y los botones
        // $('#carrito').removeClass('veo');// $('#carrito').addClass('noveo');
        // $('#carrito').toggle();o // $('#carrito').hide();
        $('#carrito').slideUp(50);
        seVeTabla = false;
    }else{// si no se ve, muestro la tabla carrito y los botones
        // $('#carrito').removeClass('noveo');// $('#carrito').addClass('veo');
        // $('#carrito').toggle();o // $('#carrito').show();
        $('#carrito').slideDown(50);
        seVeTabla = true;
    }
    totProductos();
}        


//-------------------------------------------------------------
//función que vacía el objeto vectorCompra, elimina del DOM la
// tabla carrito y vacía el localStorage
function vaciarCarrito() {
    vectorCompra.splice(0,vectorCompra.length);
    eliminarCarrito();
    totProductos();
    localStorage.clear();
}


//-------------------------------------------------------------
//función que salta a 8-procesocompra.html
function procesarCompra() {
    if (vectorCompra.length != 0) {
        window.location.href="8-procesocompra.html";
    }
}


//-------------------------------------------------------------
//función que guarda en localStorage el vectorCompra
function guardarLocalStorage() {
    if (vectorCompra.length != 0) {
        localStorage.clear();
        const enJSON    = JSON.stringify(vectorCompra);
        // console.log(enJSON); // {"id":2,"producto":"Arroz"}
        // console.log(typeof vectorCompra); // object
        // console.log(typeof enJSON);    // string
        localStorage.setItem("vectorCompra", enJSON);
    }
}


//---------------------------------------------------------------------
//función que pone un cartel al lado del carrito del total de productos
function totProductos() {
    let mensaje = "";
    let tot = vectorCompra.length;
    if (tot == 0) {
        if (seVeTabla) {
            mensaje = "carrito vacío (<= click para ocultarlo)";
        }else{
            mensaje = "carrito vacío (<= click para verlo)";
        }
    }else if (tot == 1) {
        mensaje = tot + " producto en carrito";
    }else{
        mensaje = tot + " productos en carrito";
    }
    $('button#loteProd').text(`${mensaje}`);
    // document.getElementById('loteProd').innerHTML = mensaje;
}


// $('button#loteProd').on('click', () => {
//     verCarrito();
// });

// $('button#vaciarCarrito').on('click', () => {
//     vaciarCarrito();
// });

// $('button#abrirCarrito').on('click', () => {
//     procesarCompra();
// });


















// DE AQUI PARA ABAJO NO SE USA, SON EJEMPLOS

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
