let seVeTabla = false;// true se esta viendo, false está oculta
var posicion;

//Si localStorage tiene datos, entonces creo vectorCompra y creo carrito
const almacenados = JSON.parse(localStorage.getItem("vectorCompra"));
debugger;
if (almacenados != null) {
    // //Iteramos almacenados con for...of para transformar todos sus objetos a tipo producto.
    for (const i of almacenados) {
        if (i.cantidad != 0) {
            vectorCompra.push(new Producto(i.codigo,i.nombre,i.precio,i.cantidad));
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



//-----------------------------------------------------------------------------
//función que ingresa el producto elegido al objeto vectorCompra y localStorage
function addProd(a,b,c,d) {
    if (vectorCompra.length == 0) {
        // pregunto si el objeto está vacío, si true entonces ingreso el producto
        vectorCompra.push(new Producto(a,b,c,d));
        guardarLocalStorage();
        totProductos();
    }else{
        // busco si el producto a agregar estaba ya ingresado
        const encontrado = vectorCompra.find(encontrado => encontrado.codigo === a);
        if (!encontrado) {// si no está, lo ingreso
            vectorCompra.push(new Producto(a,b,c,d));
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
        const tbody = document.querySelector('tbody');// indico una tbody
        for (let fila in vectorCompra) {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td id="datTDProd">${vectorCompra[fila].codigo}</td>
                <td id="datTDProd">${vectorCompra[fila].nombre}</td>
                <td id="datTDProd">${vectorCompra[fila].precio}</td>
                <td id="datTDProd" class="noveo">${vectorCompra[fila].cantidad}</td>
            `;
            row.id = "datTRProd";
            tbody.appendChild(row);// tr hijo de tbody   
        }    
    }
}


//--------------------------------------------------------------------
//función que elimina la tabla carrito al hacer click en ícono carrito
function eliminarCarrito() {
    let borrar1;
    let borrar2;
    const datProd = document.getElementById('datProd');
    datProd.classList.add('noveo');
      // elemento.className += "noveo";
    do {// elimino todos los td de la tabla tbody
        borrar1 = document.querySelectorAll('#datTDProd')[0];
        if (borrar1) {
            borrar1.parentNode.removeChild(borrar1);
        }
    } while (borrar1);
    do {// elimino todos los tr de la tabla tbody
        borrar2 = document.querySelectorAll('#datTRProd')[0];
        if (borrar2) {
            borrar2.parentNode.removeChild(borrar2);
        }
    } while (borrar2);
    datProd.classList.remove('noveo');
}


//-------------------------------------------------------------
//función que muestra o no muestra la tabla carrito al hacer click en ícono carrito
function verCarrito () {
    if (seVeTabla) {// si se ve, oculto la tabla carrito y los botones
        document.getElementById('carrito').classList.remove('veo');
        document.getElementById('carrito').classList.add('noveo');
        seVeTabla = false;
    }else{// si no se ve, muestro la tabla carrito y los botones
        document.getElementById('carrito').classList.remove('noveo');
	    document.getElementById('carrito').classList.add('veo');
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
    document.getElementById('loteProd').innerHTML = mensaje;
}























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
