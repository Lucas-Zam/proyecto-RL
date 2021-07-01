class Producto {
    constructor(codigo, nombre, precio, cantidad) {
        this.codigo = codigo;
        this.nombre = nombre;
        this.precio = precio;
        this.cantidad = cantidad;
    }
}

vectorCompra = [];






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
