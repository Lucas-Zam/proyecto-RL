class moldeProducto {
    constructor(imagen, codigo, nombre, precio, cantidad) {
        this.imagen = imagen;
        this.codigo = codigo;
        this.nombre = nombre;
        this.precio = precio;
        this.cantidad = cantidad;
    }
}

vectorCompra = [];


traerDatosServer();


//---------------------------------------------------------------------------------------------
//función que trae la información del archivo productos.json
// status ( 200 ok, 403 forbidden, 404 not found)
// readyState (0 request not initialized, 1 conexión establecida con server
// 2 request received, 3 processing request, 4 request finished and response is ready)
// function traerDatosServer() {
//     const xhttp = new XMLHttpRequest();// crea el objeto integrado para solicitar datos al server
//     xhttp.open('GET', './imagenes/productos.json',true);//especifica el tipo de request
//     xhttp.send();//envía el request al server
//     xhttp.onreadystatechange = function() {// define una función que se ejecutará cuando la propiedad readyState cambia
//         if (this.status == 404) {// status 404 = archivo no se encuentra
//             $('div h2 b').text('No se encuentra el archivo');
//         }else{
//             if (this.readyState == 4 && this.status == 200) {// si se cumplen, la respuesta está lista
//                 let datos = JSON.parse(this.responseText);//responseText = retorna respuesta de datos como string
//                 debugger;
//                 datosAlDOM(datos);
//             }
//         }
//     }
// };

//-------------------------------------------------------------
//función que trae la información del archivo productos.json
function traerDatosServer() {
    const URLJSON = "productos.json";
    $.getJSON(URLJSON, function (respuesta, estado) {
        if (estado === "success") {
            let datos = respuesta;
            datosAlDOM(datos);
        }
    }
)};


//---------------------------------------------------------------------------------------------
// función que coloca en el DOM los datos recibidos del archivo producto.json
function datosAlDOM(datos) {
    for (let item of datos) { 
        $('div#colector').append(
            `<div class="artsombra colspan-1 rowspan-1">
                <img src=./imagenes/${item.imagen} alt="## imagen no disponible ##"/>
                <button class="btn btn-block btn-primary" onclick="addProd('${item.imagen}','${item.codigo}','${item.descripcion}',${item.precio},1)">Comprar</button>
                <p>Cód. ${item.codigo}</p>
                <p>${item.descripcion}</p>
                <h3 class="card-title">$ <span>${item.precio}</span></h3>
            </div>`);
    }
};



//--------------------------------------------------------
//Para guardar en el localStorage. 2 formas:
    // const ArrayProductos = {
    //     {id:1, tipoprod: 'Arroz', precio: 125},
    //     {id:2, tipoprod: 'Fideos', precio: 70},
    //     {id:3, tipoprod: 'Pan', precio: 50},
    //     {id:4, tipoprod: 'Flan', precio: 100},
    // }

    // (1) Guardar de a 1 producto------------------------
    // ArrayProductos.forEach(producto => {
        // saveInLocalStorage(producto.id, producto);
    //})

    // (2) Guardar el array completo----------------------
        // saveInLocalStorage('listaProductos', productos)


//FUNCIONES PARA OBTENER Y GUARDAR LOCALSTORAGE

// function getLocalStorage(key) {
    //return JSON.parse(localStorage.getItem(key))
//}

// function saveInLocalStorage(key,item) {
    //let stringifiedItem = JSON.stringify(item);
    //localStorage.setItem(key, stringifiedItem);
//}



// class Persona{
//     constructor(nombre, edad, calle) {
//         this.nombre = nombre;
//         this.edad   = edad;
//         this.calle  = calle;
//     }
//     hablar(){
//         console.log("HOLA SOY "+ this.nombre);
//     }
// }
// const persona1 = new Persona("Homero", 39, "Av. Siempreviva 742");
// persona1.hablar();



// function add(codigo, nombre, precio) {
//     console.log(codigo, nombre, precio);
//     products.push(codigo);
//     total = total + precio;
//     debugger;
//     // document.getElementById("checkout").innerHTML = `Pagar $${total}`
// }

// function pay() {
//     window.alert(products.join(", \n"));
// }
