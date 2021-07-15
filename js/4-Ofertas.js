traerDatosServer();
//-------------------------------------------------------------
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
//             $('main#cartel h2').text('No se encuentra el archivo');
//         }else{
//             if (this.readyState == 4 && this.status == 200) {// si se cumplen, la respuesta está lista
//                 let datos = JSON.parse(this.responseText);//responseText = retorna respuesta de datos como string
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
    let hayOfertas = false;
    for (let item of datos) {     
        if (`${item.oferta}` == "si") {//solo se mostrarán los que tienen "si" en campo oferta
            hayOfertas = true;
            $('#colector').append(
                `<div class="colspan-1 rowspan-1">
                    <img src=./imagenes/${item.imagen} width="270" alt="## imagen no disponible ##"/>
                    <p>Cód. ${item.codigo}</p>
                    <p>${item.descripcion}</p>
                    <p>$ ${item.precio}</p>
                </div>`);
        }
    }
    if (!hayOfertas) {//se muestra cartel en caso que no haya ninguna oferta
        $('main#cartel h2').text('No hay ofertas disponibles ahora');
    }
};
