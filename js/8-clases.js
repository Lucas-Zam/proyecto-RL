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
