$(document).ready(function() {

    class moldeProductos {
        constructor(id, imagen, codigo, descripcion, precio, rubro, auto, marca, cod_original, oferta, carrousel) {
            this.id = id;
            this.imagen = imagen;
            this.codigo = codigo;
            this.descripcion = descripcion;
            this.precio = precio;
            this.rubro = rubro;
            this.auto = auto;
            this.marca = marca;
            this.cod_original = cod_original;
            this.oferta = oferta;
            this.carrousel = carrousel;
        }
    }
    
vectorProductos = [];
cargarJSON();


//-------------------------------------------------------------
//función que guarda en localStorage el vectorCompra
function guardarProductosLocalStorage() {
    localStorage.removeItem("vectorProductos");
    const enJSON = JSON.stringify(vectorProductos);
    localStorage.setItem("vectorProductos", enJSON);
}


//-----------------------------------------------------------------------------------------------------
//función que llena vectorCarrousel con los datos del archivo productos.json
function llenarVectorProductos(datos) {
    let j = -1;
    for (let it of datos) {     
        j += 1;
        vectorProductos.push(new moldeProductos(j,it.imagen,it.codigo,it.descripcion,it.precio,it.rubro,it.auto,it.marca,it.cod_original,it.oferta,it.carrousel));
    }
};


//-----------------------------------------------------------------------------------------------------
//función que trae la información del archivo productos.json
function cargarJSON() {

    $.ajax({
        url: "productos.json",
        type: "get",
        dataType: "json",
        cache: false,
        contentType: false,
        processData: false,
        beforeSend : function(){
            $('#carrousel').text('Cargando...');
        }
    })
    .done( function(data) {//cuando ya está ready
        llenarVectorProductos(data);
        guardarProductosLocalStorage();
    })
    .fail( function(data) {//si el archivo no se encuentra
        if (data.status == 404) {
            $('#carrousel').text('no se encuentra el archivo de productos...');
            localStorage.removeItem("vectorProductos");
        }
    });
};

});

