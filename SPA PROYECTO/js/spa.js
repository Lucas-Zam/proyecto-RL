document.addEventListener("DOMContentLoaded", router);
window.addEventListener('hashchange', router);

const HomeComponent = {
    render: () => {
		let stringHtML = `
            <section class="novedades colspan-2 rowspan-1 m576-colspan-3">			
                <div id="carrousel" class="texto-centrado"></div>
                <div id="caja-barra-sup">
                    <div id="barra-sup"></div>
                </div>
                <div id="slideshow">
                    <img src="" alt="" id="img1">
                    <div id="descripcion">
                        <div id="codigos"></div>
                        <div id="articulos"></div>
                        <div id="auto"></div>
                        <div id="codoriginal"></div>
                        <div id="precios"></div>
                    </div>
                </div>
                <div id="indicadores"></div>
            </section>

            <section class="ofertas colspan-1 rowspan-3 m576-colspan-3">
                <div class="ofertas__tit-ofertas texto-centrado">
                    <h2><b><a href="4-Ofertas.html"></a>Ofertas</b></h2>
                </div>	
                <div class="ofertas__logo-OF">
                    <img class="ofertas__logo-OF__img" src="./imagenes/logo-p70132.jpg" alt="imagen de Oferta 1" width="270" />
                </div>
                <div class="ofertas__des-OF">
                    <h4><b>Barra de dirección Chevrolet Corsa $1200</b></h4>
                </div>
                <div class="ofertas__logo-OF">
                    <img class="ofertas__logo-OF__img" src="./imagenes/logo-p11412.jpg" alt="imagen de Oferta 2" width="270" />
                </div>
                <div class="ofertas__des-OF">
                    <h4><b>Bobina HELLUX Opel Astra Corsa Tigra Vectra $5500</b></h4>
                </div>
                <div class="ofertas__logo-OF">
                    <img class="ofertas__logo-OF__img" src="./imagenes/logo-p13799.jpg" alt="imagen de Oferta 3" width="270" />
                </div>
                <div class="ofertas__des-OF">
                    <h4><b>Soporte Motor Central Chevrolet Cruze Nacional $2040</b></h4>
                </div>
                <div class="ofertas__logo-OF">
                    <img class="ofertas__logo-OF__img" src="./imagenes/logo-pSTV30.jpg" alt="imagen de Oferta 4" width="270" />
                </div>
                <div class="ofertas__des-OF">
                    <h4><b>Cable de Bujía Chevrolet Spark $2160</b></h4>
                </div>
            </section>

            <section class="clientes colspan-2 rowspan-1 m576-colspan-3 grid col-4 row-1">
                <div class="clientes__tit-cliente colspan-4 rowspan-1">
                    <h2><b><a href="5-Clientes.html" >Solicitud de Cliente</a></b></h2>
                </div>
                <div class="clientes__logo-cliente colspan-1">
                    <img src="./imagenes/logo-cliente.png" alt="imagen de estrechar manos"/>
                </div>
                <div class="clientes__texto-cliente colspan-3">
                    <h4><b>Si Ud. desea ser Cliente de esta empresa y 	quiere que le estemos enviando nuestro Catálogo en forma digital, complete la solicitud y luego de aceptada, se lo estaremos enviando via email.</b></h4>
                </div>
            </section>

            <section class="laempresa colspan-2 rowspan-1 m576-colspan-3 grid col-9 row-3">
                <div class="laempresa__logo1-LE colspan-2 rowspan-1">
                    <img class="laempresa__logo1-LE__img" src="./imagenes/logo-RL-negro.png" alt="Logo Chevrolet" width="65" />
                </div>
                <div class="laempresa__tit-LE colspan-4 rowspan-1">
                    <h2><ins><b>La Empresa</b></ins></h2>
                </div>
                <div class="laempresa__logo2-LE colspan-3 rowspan-1">
                    <img src="./imagenes/logo-chevrolet.png" alt="Logo Chevrolet"/>
                </div>
                <div class="laempresa__texto-LE colspan-9 rowspan-1">
                    <h4><b>REPUESTOS LUCAS, minorista de autopartes línea CHEVROLET para todos los modelos presentes en el país, tiene sus comienzos como un emprendimiento familiar de su fundador Sr. Roque V. Zambelli hace más de una década.</b></h4>
                    <h4><b>Actualmente le dán continuidad a este emprendimiento su hijo y nietos.</b></h4>
                    <br>
                    <h4><b>Esta empresa cuenta actualmente con personal altamente capacitado, con muchos años de experiencia en el conocimiento de autopartes.</b></h4>
                    <br>
                    <h4><b>Tenemos representación de importantes marcas de reconocidos fabricantes que encontraron en Repuestos Lucas, una empresa seria y responsable en la cual confiar la comercialización de sus productos.</b></h4>
                    <br>
                    <h4><b>Nuestra extensa gama de repuestos está centralizada en el establecimiento ubicado en la Ciudad Autónoma de Buenos Aires, República Argentina. Desde ese punto atendemos a todo el territorio nacional.</b></h4> 
                    <br>
                    <h4><b>Tenemos como objetivo brindar un servicio de calidad a nuestros clientes.</b></h4>	
                </div>
                <div class="laempresa__video-LE colspan-9 rowspan-1">
                    <video width="400" controls> 
                    <source src="./imagenes/video-RL.mp4" type="video/mp4">
                    Su navegador no soporta este formato de video
                    </video>
                </div>
            </section>
            `
        return (stringHtML);
    }
}

const OfertasComponent = {
    render: () => {
        $('#app').removeClass().addClass('grid col-1 row-2');
        let stringHtML = `
            <main id="cartel" class="tituloPrincipal colspan-3 rowspan-1">
                <div class="titulo texto-centrado"><h2><b>Ofertas</b></h2></div>
            </main>	

            <main id="colector" class="contenido colspan-3 rowspan-1 grid col-4 m576-col-3 m341-col-2">
            `
            let hayOfertas = false;
            const almacen = JSON.parse(localStorage.getItem("vectorProductos"));
            for (let it of almacen) {     
                if (it.oferta == "si") {//solo se mostrarán los que tienen "si" en campo oferta
                    hayOfertas = true;
                    stringHtML += `
                        <div class="colspan-1 rowspan-1">
                            <img src=./imagenes/${it.imagen} width="270" alt="## imagen no disponible ##"/>
                            <p>Cód. ${it.codigo}</p>
                            <p>${it.descripcion}</p>
                            <p>$ ${it.precio}</p>
                        </div>    
                    `
                }
            }
            if (!hayOfertas) {//se muestra cartel en caso que no haya ninguna oferta
                $('main#cartel h2').text('No hay ofertas disponibles ahora');
            }
            stringHtML += `</main>`
        return (stringHtML);

    }
}

const ClientesComponent = {
    render: () => {
        let stringHtML = `
            <main id="cartel" class="tituloPrincipal colspan-3 rowspan-1">
            <div class="titulo texto-centrado"><h2><b>Clientes</b></h2></div>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates doloribus tempora voluptate consequatur magni minima. Et commodi illum repellendus! Totam laudantium minima ipsum quibusdam sapiente eius tempore rem eum neque!</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates doloribus tempora voluptate consequatur magni minima. Et commodi illum repellendus! Totam laudantium minima ipsum quibusdam sapiente eius tempore rem eum neque!</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates doloribus tempora voluptate consequatur magni minima. Et commodi illum repellendus! Totam laudantium minima ipsum quibusdam sapiente eius tempore rem eum neque!</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates doloribus tempora voluptate consequatur magni minima. Et commodi illum repellendus! Totam laudantium minima ipsum quibusdam sapiente eius tempore rem eum neque!</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates doloribus tempora voluptate consequatur magni minima. Et commodi illum repellendus! Totam laudantium minima ipsum quibusdam sapiente eius tempore rem eum neque!</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates doloribus tempora voluptate consequatur magni minima. Et commodi illum repellendus! Totam laudantium minima ipsum quibusdam sapiente eius tempore rem eum neque!</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates doloribus tempora voluptate consequatur magni minima. Et commodi illum repellendus! Totam laudantium minima ipsum quibusdam sapiente eius tempore rem eum neque!</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates doloribus tempora voluptate consequatur magni minima. Et commodi illum repellendus! Totam laudantium minima ipsum quibusdam sapiente eius tempore rem eum neque!</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates doloribus tempora voluptate consequatur magni minima. Et commodi illum repellendus! Totam laudantium minima ipsum quibusdam sapiente eius tempore rem eum neque!</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates doloribus tempora voluptate consequatur magni minima. Et commodi illum repellendus! Totam laudantium minima ipsum quibusdam sapiente eius tempore rem eum neque!</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates doloribus tempora voluptate consequatur magni minima. Et commodi illum repellendus! Totam laudantium minima ipsum quibusdam sapiente eius tempore rem eum neque!</p>
        </main>
        `
        return (stringHtML);
    }
}
const ComprasComponent = {
    render: () => {
        let stringHtML = `
            <main id="cartel" class="tituloPrincipal colspan-3 rowspan-1">
            <div class="titulo texto-centrado"><h2><b>Compras</b></h2></div>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates doloribus tempora voluptate consequatur magni minima. Et commodi illum repellendus! Totam laudantium minima ipsum quibusdam sapiente eius tempore rem eum neque!</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates doloribus tempora voluptate consequatur magni minima. Et commodi illum repellendus! Totam laudantium minima ipsum quibusdam sapiente eius tempore rem eum neque!</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates doloribus tempora voluptate consequatur magni minima. Et commodi illum repellendus! Totam laudantium minima ipsum quibusdam sapiente eius tempore rem eum neque!</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates doloribus tempora voluptate consequatur magni minima. Et commodi illum repellendus! Totam laudantium minima ipsum quibusdam sapiente eius tempore rem eum neque!</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates doloribus tempora voluptate consequatur magni minima. Et commodi illum repellendus! Totam laudantium minima ipsum quibusdam sapiente eius tempore rem eum neque!</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates doloribus tempora voluptate consequatur magni minima. Et commodi illum repellendus! Totam laudantium minima ipsum quibusdam sapiente eius tempore rem eum neque!</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates doloribus tempora voluptate consequatur magni minima. Et commodi illum repellendus! Totam laudantium minima ipsum quibusdam sapiente eius tempore rem eum neque!</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates doloribus tempora voluptate consequatur magni minima. Et commodi illum repellendus! Totam laudantium minima ipsum quibusdam sapiente eius tempore rem eum neque!</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates doloribus tempora voluptate consequatur magni minima. Et commodi illum repellendus! Totam laudantium minima ipsum quibusdam sapiente eius tempore rem eum neque!</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates doloribus tempora voluptate consequatur magni minima. Et commodi illum repellendus! Totam laudantium minima ipsum quibusdam sapiente eius tempore rem eum neque!</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates doloribus tempora voluptate consequatur magni minima. Et commodi illum repellendus! Totam laudantium minima ipsum quibusdam sapiente eius tempore rem eum neque!</p>
            </main>
        `
        return (stringHtML);
    }
}
const ListadoComponent = {
    render: () => {
        $('#app').removeClass().addClass('grid col-1 row-2');
        let stringHtML = `
		    <div class="tituloPrincipal colspan-1 rowspan-1">
			    <div class="titulo texto-centrado"><h2><b>Listado de Productos</b></h2></div>
		    </div>            

            <table class="colspan-1 rowspan-1"><!--Tabla de listado de productos-->
                <thead><!--Cabecera o Títulos-->
                    <tr>
                        <th>Imagen</th>
                        <th>Cód.</th>
                        <th>Descrip.</th>
                        <th>Venta &dollar;</th>
                        <th class="estado">Rubro</th>
                        <th>Auto</th>
                        <th>Cód. Orig.</th>
                    </tr>
                </thead>
                <tbody>
        `
            const almacen = JSON.parse(localStorage.getItem("vectorProductos"));
            for (let item of almacen) { 
                stringHtML += `            
                    <tr>
                        <td><img src=./imagenes/${item.imagen} width="270" alt="## imagen no disponible ##"/></td>
                        <td>${item.codigo}</td>
                        <td>${item.descripcion}</td>
                        <td>${item.precio}</td>
                        <td class="estado">${item.rubro}</td>
                        <td>${item.auto}</td>
                        <td>${item.cod_original}</td>
                    </tr>
        `
            } 
        stringHtML += `</tbody></table>`
        return (stringHtML);
    }
}

const ErrorComponent = {
    render: () => {
        let stringHtML = `
            <main id="cartel" class="tituloPrincipal colspan-3 rowspan-1">
                <div class="titulo texto-centrado"><h2><b>Página no encontrada</b></h2></div>
            </main>
        `
        return (stringHtML);
    }
}

const rutas = [
    {path: '/', component: HomeComponent },
    {path: '/ofertas', component: OfertasComponent },
    {path: '/clientes', component: ClientesComponent },
    {path: '/compras', component: ComprasComponent },
    {path: '/listado', component: ListadoComponent },
];

// Leemos la "url" //
// const parseLocation = () => location.hast.slice(1) || '/';
function parseLocation() {
    return location.hash.slice(1) || '/';
}

// Busco el componente asociado al path //
function findComponent (userPath) {
    return rutas.find ( ruta => ruta.path === userPath );
}

function router() {
    // Leer la url que accedió el usuario //
    const userPath = parseLocation();

    // SIN DESTRUCTURING //
    // Buscamos el componente correspondiente //
    // let component;
    // if (findComponent(userPath)) {
        // component = findComponent(userPath).component;
    //}else{
        // component = ErrorComponent;
    //}
    
    // CON DESTRUCTURING //
    const { component = ErrorComponent } = findComponent(userPath) || {};

    const app = $('#app');
    // app.innerHTML = component.render();
    $('#app').empty();
    $('#app').append(`${component.render()}`);
}

