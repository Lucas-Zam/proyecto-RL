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
//                 datosAlDOM(datos);
//             }
//         }
//     }
// };

//-------------------------------------------------------------
//función que trae la información del archivo productos.json
function traerDatosServer() {
    debugger;
    const URLJSON = "./imagenes/productos.json";
    $.getJSON(URLJSON, function (respuesta, estado) {
        console.log(estado);
        debugger;
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
        $('tbody').append(
            `<tr>
                <td>${item.codigo}</td>
                <td>${item.descripcion}</td>
                <td>${item.precio}</td>
                <td class="estado">${item.rubro}</td>
                <td>${item.auto}</td>
                <td>${item.cod_original}</td>
            </tr>`);
    }    
};