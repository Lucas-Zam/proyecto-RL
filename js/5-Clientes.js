"use strict";
var inputs;
var semaforo = [0,0,0,0,0,0,0,0,0];
const expresiones = {
	NomAp: /^[a-zA-ZÀ-ÿ0-9\s\_\-]{5,40}$/, // Letras, numeros, acentos, espacio, guión bajo y guión
	Cuit: /^\d{2}-\d{8}-\d{1}$/, // 99-12345678-9
	NomEmp: /^[a-zA-ZÀ-ÿ0-9\s\_\-]{5,40}$/, // Letras, numeros, acentos, espacio, guión bajo y guión
	Postal: /^\d{4}$/, // 4 números.
	Dire: /^[a-zA-ZÀ-ÿ0-9\s\_\-]{5,40}$/, // Letras, numeros, acentos, espacio, guión bajo y guión
	// Email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	Email: /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/,
	Loca: /^[a-zA-ZÀ-ÿ0-9\s\_\-]{5,40}$/, // Letras, numeros, acentos, espacio, guión bajo y guión
	Tfono: /^\d{8,14}$/, // 8 a 14 numeros.
	listaprov: /^[a-zA-ZÀ-ÿ]{5,40}$/, // Letras, acentos
}


// Función para evaluar el campo Nombre y Apellido
const evalNomAp = (e) => {
	let posiSem = 0;
	let valorCampo = $('input#NomAp').val().trimStart();
	$('input#NomAp').val(`${valorCampo}`);	
	let long = valorCampo.length;
	if (long == 0) {
		semaforo[posiSem] = 0;
		cartel('NomAp', 1, 0);
	}else{
		if ( (valorCampo == null) || long <= 4) {
			semaforo[posiSem] = 0;
		}else{
			if ( valorCampo.match(expresiones.NomAp) ) {
				semaforo[posiSem] = 1;
			}else{
				semaforo[posiSem] = 0;
			}
		}
		cartel('NomAp',semaforo[posiSem], 1);
	}
};
// Función para evaluar el campo Cuit
const evalCuit = (e) => {
	let posiSem = 1;
	let valorCampo = $('input#Cuit').val().trimStart();
	$('input#Cuit').val(`${valorCampo}`);	
	let long = valorCampo.length;
	// se utiliza el algoritmo módulo 11 para verificar el dígito verificador
	let tipo = [20,23,24,27,30,33,34];// valores permitidos para el array tipo de control
	let soyNro2 = !(isNaN(Number(valorCampo.substr(0,2))));// si el dato es un nro. es true
	let soyNro8 = !(isNaN(Number(valorCampo.substr(3,8))));// si el dato es un nro. es true
	let soyNro0 = !(isNaN(Number(valorCampo.substr(12,1))));// si el dato es un nro. es true
	let cuit2 = Number(valorCampo.substr(0,2));// tipo ingresado
	let cuit0 = Number(valorCampo.substr(12,1));// dígito verificador ingresado
	let estoyEnTipo = false;
	let digitoVerif = 0;
	let digito = 0;
	let suma = 0;
	let n27 = 2;
	let iCount = 0;

	if (long == 0) {
		semaforo[posiSem] = 0;
		cartel('Cuit', 1, 0);		
	}else{
		if ( valorCampo.match(expresiones.Cuit) ) {
			while (iCount <= 6) {// verifico que el tipo sea igual a alguno del array tipo de control
				if (cuit2 == tipo[iCount]) {
					estoyEnTipo = true;
					iCount = 7;
				}else{
					iCount++;
				}
			}
			if (estoyEnTipo) {
				for (let iDF = 10; iDF >= 0; iDF--) {// aqui comienza la verificación del dígito verificador 
					if (iDF != 2) {// la posición 2 es un guión y no hay que tenerlo en cuenta
						digito = Number(valorCampo.substr(iDF,1));
						suma += digito * n27;
						n27++; 
						if (n27 == 8) {n27 = 2;}
					}	
				}
				digitoVerif = 11 - (suma % 11);			
				if (digitoVerif == 11) {
					digitoVerif = 0;
				}else{
					if (digitoVerif == 10) {
						digitoVerif = 1;
					}
				}
				if (digitoVerif != cuit0) {// comparo el digito verificador obtenido con el ingresado
					semaforo[posiSem] = 0;
				}else{
					semaforo[posiSem] = 1;// devuelvo verdadero si es igual
				}
			}else{
				semaforo[posiSem] = 0;
			}			
		}else{
			semaforo[posiSem] = 0;
		}
		cartel('Cuit',semaforo[posiSem], 1);
	}
};
// Función para evaluar el campo Nombre de Empresa
const evalNomEmp = (e) => {
	let posiSem = 2;
	let valorCampo = $('input#NomEmp').val().trimStart();
	$('input#NomEmp').val(`${valorCampo}`);	
	let long = valorCampo.length;
	if (long == 0) {
		semaforo[posiSem] = 0;
		cartel('NomEmp', 1, 0);
	}else{
		if ( (valorCampo == null) || long <= 4) {
			semaforo[posiSem] = 0;
		}else{
			if ( valorCampo.match(expresiones.NomEmp) ) {
				semaforo[posiSem] = 1;
			}else{
				semaforo[posiSem] = 0;
			}
		}
		cartel('NomEmp',semaforo[posiSem], 1);
	}
};
// Función para evaluar el Código Postal
const evalPostal = (e) => {
	let posiSem = 3;
	let valorCampo = $('input#Postal').val().trimStart();
	$('input#Postal').val(`${valorCampo}`);
	let soyNro = !(isNaN(valorCampo));// true significa que SI es nro, false significa que NO es nro.
	let long = valorCampo.length;
	if (long == 0) {
		semaforo[posiSem] = 0;
		cartel('Postal', 1, 0);
	}else{
		if (long != 4 || Number(soyNro)<=0) {
			semaforo[posiSem] = 0;
		}else{
			if ( valorCampo.match(expresiones.Postal) ) {
				semaforo[posiSem] = 1;
			}else{
				semaforo[posiSem] = 0;
			}
		}
		cartel('Postal',semaforo[posiSem], 1);
	}
};
// Función para evaluar el campo Dirección
const evalDire = (e) => {
	let posiSem = 4;
	let valorCampo = $('input#Dire').val().trimStart();
	$('input#Dire').val(`${valorCampo}`);	
	let long = valorCampo.length;
	if (long == 0) {
		semaforo[posiSem] = 0;
		cartel('Dire', 1, 0);
	}else{
		if ( (valorCampo == null) || long <= 4) {
			semaforo[posiSem] = 0;
		}else{
			if ( valorCampo.match(expresiones.Dire) ) {
				semaforo[posiSem] = 1;
			}else{
				semaforo[posiSem] = 0;
			}
		}
		cartel('Dire',semaforo[posiSem], 1);
	}
};
// Función para evaluar el campo Email
const evalEmail = (e) => {
	let posiSem = 5;
	let valorCampo = $('input#Email').val().trimStart();
	$('input#Email').val(`${valorCampo}`);	
	let long = valorCampo.length;
	if (long == 0) {
		semaforo[posiSem] = 0;
		cartel('Email', 1, 0);
	}else{
		if ( (valorCampo == null) || long <= 5) {
			semaforo[posiSem] = 0;
		}else{
			if ( valorCampo.match(expresiones.Email) ) {
				semaforo[posiSem] = 1;
			}else{
				semaforo[posiSem] = 0;
			}
		}
		cartel('Email',semaforo[posiSem], 1);
	}
};
// Función para evaluar el campo Localidad
const evalLoca = (e) => {
	let posiSem = 6;
	let valorCampo = $('input#Loca').val().trimStart();
	$('input#Loca').val(`${valorCampo}`);	
	let long = valorCampo.length;
	if (long == 0) {
		semaforo[posiSem] = 0;
		cartel('Loca', 1, 0);
	}else{
		if ( (valorCampo == null) || long <= 4) {
			semaforo[posiSem] = 0;
		}else{
			if ( valorCampo.match(expresiones.Loca) ) {
				semaforo[posiSem] = 1;
			}else{
				semaforo[posiSem] = 0;
			}
		}
		cartel('Loca',semaforo[posiSem], 1);
	}
};
// Función para evaluar el campo Teléfono
const evalTfono = (e) => {
	let posiSem = 7;
	let valorCampo = $('input#Tfono').val().trimStart();
	$('input#Tfono').val(`${valorCampo}`);
	let soyNro = !(isNaN(valorCampo));// true significa que SI es nro, false significa que NO es nro.
	let long = valorCampo.length;
	if (long == 0) {
		semaforo[posiSem] = 0;
		cartel('Tfono', 1, 0);
	}else{
		if (long > 11 || long < 8 || Number(soyNro)<=0) {
			semaforo[posiSem] = 0;
		}else{
			if ( valorCampo.match(expresiones.Tfono) ) {
				semaforo[posiSem] = 1;
			}else{
				semaforo[posiSem] = 0;
			}
		}
		cartel('Tfono',semaforo[posiSem], 1);
	}
};
// Función para evaluar el campo Provincia
const evallistaprov = (e) => {
	let posiSem = 8;
	let indice = $('select').children('option:selected').index();
	let cualProv = $('select option:selected').val(indice).text();
	if (cualProv != "Provincia") {
		semaforo[posiSem] = 1;
	}else{
		semaforo[posiSem] = 0;		
	}
	cartel('listaprov',semaforo[posiSem], 1);
};


// Función que muestra un cartel en el campo que se está ingresando datos, con la información correcta
// de ingreso y que colorea el borde de ese campo según esté bien o mal.
// ok=1 no hay error, ok=0 hay error
// icos=1 se muestran iconos, icos=0 no se muestran iconos
const cartel = ( campo, ok, icos ) => {
	let cualCampo = "grupo__" + campo;
	if (ok == 1) {
		$(`#${cualCampo}`).removeClass('formu__grupo-incorrecto');
		$(`#${cualCampo}`).addClass('formu__grupo-correcto');
		$(`#${cualCampo} .formu__input-error`).removeClass('formu__input-error-activo');// borro el párrafo del error
		if (icos == 1) {
			$(`#${cualCampo} i`).addClass('fa-check-circle');// muestro ícono verde correcto
			$(`#${cualCampo} i`).removeClass('fa-times-circle');// borro ícono rojo incorrecto
		}else{
			$(`#${cualCampo} i`).removeClass('fa-check-circle');// borro ícono verde correcto
			$(`#${cualCampo} i`).removeClass('fa-times-circle');// borro ícono rojo incorrecto
		}
	}else {
		$(`#${cualCampo}`).addClass('formu__grupo-incorrecto');
		$(`#${cualCampo}`).removeClass('formu__grupo-correcto');
		$(`#${cualCampo} .formu__input-error`).addClass('formu__input-error-activo');// muestro el párrafo del error
		if (icos == 1) {
			$(`#${cualCampo} i`).removeClass('fa-check-circle');// borro ícono verde correcto
			$(`#${cualCampo} i`).addClass('fa-times-circle');// muestro ícono rojo incorrecto
		}else{
			$(`#${cualCampo} i`).removeClass('fa-check-circle');// borro ícono verde correcto
			$(`#${cualCampo} i`).removeClass('fa-times-circle');// borro ícono rojo incorrecto
		}
	}
}
// Función para distribuir la validación a cada campo
const validarFormu = (e) => {
	switch (e.target.name) {
		case "NomAp": evalNomAp(e); break;
		case "Cuit": evalCuit(e); break;
		case "NomEmp": evalNomEmp(e); break;
		case "Postal": evalPostal(e); break;
		case "Dire": evalDire(e); break;
		case "Email": evalEmail(e); break;
		case "Loca": evalLoca(e); break;
		case "Tfono": evalTfono(e); break;
	}
}



////////////////////////////// E V E N T O S ///////////////////////////////////////////////////////////

// (1) Evento automático que se ejecuta cuando todo el DOM ya está cargado------------------------------
// y pone el foco en el primer elemento, sin que se haya presionado alguna tecla------------------------
$(document).ready(function() {
	$('#NomAp').focus();
})

// (2) Evento VALIDARPROV ------------------------------------------------------------------------------
// Evento que ejecuta la función evallistaprov cuando detecta un cambio en el campo de Provincia--------
$('#listaprov').on('change',evallistaprov);

// (3) Evento VALIDARFORMU Y enter----------------------------------------------------------------------
// Evento que ejecuta la función de validar los campos de input cada vez que se levanta una tecla-------
// y también cuando se presiona enter-------------------------------------------------------------------
$('#login-form input').each(function() {
	$(this).on('keyup', validarFormu);
	$(this).keydown( function(e) {
		let key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
		if (key == 13) {
			e.preventDefault();
 			inputs = $(this).closest("form").find(":input:visible");
 			inputs.eq( inputs.index(this)+1).focus();
		}
		validarFormu(e);	
	});	
});

// (4) Evento SUBMIT O ENVIAR --------------------------------------------------------------------------
// Evento que se ejecuta al hacer click en el botón enviar y determina si los ingresos están correctos--
// para ser mandados o en caso de haber algún error, devuelve el foco a ese campo para reingresarlo.----
$('form button#submit').on('click', function(e) {
	e.preventDefault(); //cuando clic, NO envía los datos

	let cualCampo = semaforo.indexOf(0); //devuelve el índice donde aparece el primer 0. Si no hay devuelve -1.
	$('html, body').animate({scrollTop: $(document).height()},1000);

	if (cualCampo == -1) {//si -1, entonces todos los campos están bien
		if ( $('#terminos').is(':checked') ) {
			//muestro mensaje de enviado correctamente
			$('#formu__mensaje-exito').addClass('formu__mensaje-exito-activo');
			setTimeout(() => {
				$('#formu__mensaje-exito').removeClass('formu__mensaje-exito-activo');
			}, 2000);
			// voy al comienzo de la página luego de 2 segundos
			setTimeout(() => {
				$('html, body').animate({scrollTop: "0"},2000);
			}, 2000);
			setTimeout(() => {	
				// borro cada uno de los íconos de éxito
				$('.formu__grupo').removeClass('formu__grupo-correcto');
				$('select').removeClass('formu__grupo-correcto');
				// reseteo todos los input, el select y el checkbox
				$('#login-form input').val('');
				$('select option:first').prop('selected',true);
				$('#terminos').prop('checked', false);		
			}, 2000);
		}else{
			//muestro mensaje de q falta tildar términos
			$('#formu__mensaje1').addClass('formu__mensaje-term-activo');
			setTimeout(function() {
				$('#formu__mensaje1').removeClass('formu__mensaje-term-activo');
			}, 2000);
			// pongo el foco en el botón de submit, esperando que tilde el checkbox de términos
			$('form button#submit').focus();
		}
	}else{//voy al campo a corregir
		// muestro mensaje de error que hay algún elemento vacío o mal cargado
		$('#formu__mensaje').addClass('formu__mensaje-activo');
		setTimeout(() => {
			$('#formu__mensaje').removeClass('formu__mensaje-activo');
		}, 2000);
		// voy al campo a corregir luego de 2 segundos
		setTimeout(function() {
			switch ( cualCampo ) {
				case 0: cartel('NomAp',0,1);
						$('input#NomAp').focus(); break;
				case 1: cartel('Cuit',0,1);
						$('input#Cuit').focus(); break;
				case 2: cartel('NomEmp',0,1);
						$('input#NomEmp').focus(); break;
				case 3: cartel('Postal',0,1);
						$('input#Postal').focus(); break;
				case 4: cartel('Dire',0,1);
						$('input#Dire').focus(); break;
				case 5: cartel('Email',0,1);
						$('input#Email').focus(); break;
				case 6: cartel('Loca',0,1);
						$('input#Loca').focus(); break;
				case 7: cartel('Tfono',0,1);
						$('input#Tfono').focus(); break;
				case 8: cartel('listaprov',0,1);
						$('select#listaprov').focus(); break;
			}
		}, 2000);
	}	
});
