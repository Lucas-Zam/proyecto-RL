$(document).ready(function() {

class armadoCarrousel {
    constructor(id, imagen, codigo, descripcion, precio, auto, marca, cod_original) {
        this.id = id;
        this.imagen = imagen;
        this.codigo = codigo;
        this.descripcion = descripcion;
        this.precio = precio;
        this.auto = auto;
        this.marca = marca;
        this.cod_original = cod_original;
    }
}

vectorCarrousel = [];
var paso = -1;
var textoHabilitado = true;
cargarJSON();


//--------------------------------------------------------------------------------------------------------------------
//función que modifica la barra superior, la imagen ,el texto y los indicadores del carrousel según el valor de "paso"
function procesoCarrousel() {
    if (vectorCarrousel.length !=0) {
        paso += 1;

        //porcentaje a mostrar en barra superior
        let porcentaje_base = 100 / vectorCarrousel.length;
        let porcentaje_actual = (paso+1)*porcentaje_base;
        $('#barra-sup').css('width',`${porcentaje_actual}%`);

        //se muestra la imagen
        img1.src = "imagenes/"+vectorCarrousel[paso].imagen;
        //cuando muestro la primer imagen, entonces el título "Novedades" está habilitado
        if (textoHabilitado) {
            $('#carrousel').addClass('tituh2');
            $('#carrousel').css('font-weight', 700);
            $('#carrousel').text('Novedades');
            textoHabilitado = false;
        }
        
        //se muestran los datos del producto elegido por "paso"
        $("#codigos").text("Cód.: "+vectorCarrousel[paso].codigo);
        $("#articulos").text(vectorCarrousel[paso].descripcion);
        $("#auto").text(vectorCarrousel[paso].auto);
        $("#codoriginal").text("Cód. Original: "+vectorCarrousel[paso].cod_original);
        $("#precios").text("$ "+vectorCarrousel[paso].precio);
        
        //limpio todos los indicadores que tengan resaltado
        for (let limpio=0; limpio<vectorCarrousel.length; limpio++) {
            $('div#'+limpio).removeClass('resaltado');
        }

        //resalto el div según "paso"
        $('div#'+paso).addClass('resaltado');

        //averiguo si variable "paso" llego al final, para reiniciarla
        if (paso >= vectorCarrousel.length-1){paso=-1;}
    }
};

//-----------------------------------------------------------------------------------------------------
//función que crea los divs necesarios para usar dentro del div "indicadores"
function crearDOMindicadores() {
    if (vectorCarrousel.length != 0) {
        for (let index in vectorCarrousel) {
            $('#indicadores').append(`<div id="${index}" class="circulos"></div>`);
        }
    }
};

//-----------------------------------------------------------------------------------------------------
//función que llena vectorCarrousel con los datos del archivo productos.json
function llenarVectorCarrousel(datos) {
    let j = -1;
    for (let it of datos) {     
        if (`${it.carrousel}` == "si") {//solo se cargarán los que tienen "si" en campo carrousel
            j += 1;
            vectorCarrousel.push(new armadoCarrousel(j,it.imagen,it.codigo,it.descripcion,it.precio,it.auto,it.marca,it.cod_original));
        }
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
            $('#carrousel').removeClass('tituh2');
            $('#carrousel').css('font-weight', 400);
            $('#carrousel').text('Cargando...');
        }
    })
    .done(function(data) {//cuando ya está ready
        // console.log(data);
        llenarVectorCarrousel(data);
        crearDOMindicadores();
        // $('#carrousel').text('Novedades');
        // console.log(vectorCarrousel);
        setInterval(procesoCarrousel, 3500);
    })
    .fail(function(data) {//si el archivo no se encuentra
        if (data.status == 404) {
            $('#carrousel').text('Novedades');
        }
    });
};

});

