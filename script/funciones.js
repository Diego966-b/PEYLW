// Declaracion de variables
var colProductos, carrito, precioEnvio, divNotificacion;
// Incializacion de variables
precioEnvio = 0;
carrito = [];
colProductos = [];
colProductos = 
[
  {"id":0, "cantidad": 1, "precioUnitario": 10000, "precio": 10000, "nombre": "Salmon Rosado", "descripcion": "Proveniente de Chile, rico en omega 3", "foto": "../img/salmonRosado.jpeg"},
  {"id":1, "cantidad": 1, "precioUnitario": 5000, "precio": 5000, "nombre": "Atun", "descripcion": "Rico en vitaminas A,D, grupo B. De Noruega a tu mesa",  "foto": "../img/atun.jpg"},
  {"id":2, "cantidad": 1, "precioUnitario": 3000,"precio": 3000, "nombre": "Merluza", "descripcion": "Aporta minerales a tu dieta, baja en calorias",  "foto": "../img/merluza.jpg"},
  {"id":3, "cantidad": 1, "precioUnitario": 1500, "precio": 1500, "nombre": "Rabas", "descripcion":"Rebozadas, listas para freir", "foto": "../img/rabas.jpg"},
  {"id":4, "cantidad": 1, "precioUnitario": 3000, "precio": 3000, "nombre": "Milanesas de Pescado", "descripcion":"Sin espinas, rebozadas con finas hierbas",  "foto": "../img/milanesas.jpg"},
  {"id":5, "cantidad": 1, "precioUnitario": 4000, "precio": 4000, "nombre": "Medallones de Merluza", "descripcion":"Aporta minerales a tu dieta, baja en calorias",  "foto": "../img/medallones.jpeg"},
  {"id":6, "cantidad": 1, "precioUnitario": 6500, "precio": 6500, "nombre": "Langostino", "descripcion":"Delicioso, proveniente de nuestro mar patag&oacute;nico",  "foto": "../img/langostino.jpg"},
  {"id":7, "cantidad": 1, "precioUnitario": 5000, "precio": 5000, "nombre": "Camaron", "descripcion":"Ideales para una rica picada",  "foto": "../img/camaron.webp"},
  {"id":8, "cantidad": 1, "precioUnitario": 7000, "precio": 7000, "nombre": "Calamar", "descripcion":"Gran fuente de proteinas, bajos en calor&iacute;as y grasas", "foto": "../img/Calamar.jpeg"}
]

/*
  FUNCIONES PARA VALIDAR FORMULARIO: 
*/

/**
 * Valida los datos de contactanos
 */
function validar ()
{
    var nombre, apellido, email, telefono, dia, mes, anio;
    var nombreVacio, apellidoVacio, emailVacio, telefonoVacio, emailValido, telefonoValido;
    var diaVacio, mesVacio, anioVacio, diaValido, mesValido, anioValido;
    var formulario;
    // Busco por ID al nombre, apellido, email, telefono y mensaje
    nombre = document.getElementById("nombre");
    apellido = document.getElementById("apellido");
    email = document.getElementById("email");
    telefono = document.getElementById("telefono");
    dia = document.getElementById("dia");
    mes = document.getElementById("mes");
    anio = document.getElementById("anio");
    // Verifico si estan vacios los campos obligatorios
    nombreVacio = estaVacio (nombre);
    apellidoVacio = estaVacio (apellido);
    emailVacio = estaVacio (email);
    telefonoVacio = estaVacio (telefono);
    diaVacio = estaVacio (dia);
    mesVacio = estaVacio (mes);
    anioVacio = estaVacio (anio); 
    // Verifico que el email sea válido
    emailValido = validarEmail (email);
    // Verifico que el numero de telefono contenga solo numeros
    telefonoValido = validarNumero (telefono);
    // Verifico la fecha
    fechaValida = validarFecha (dia, mes, anio);
    // Verifico que el dia, mes y anio sean numeros y enteros positivos 
    diaValido = validarNumero (dia);
    mesValido = validarNumero (mes);
    anioValido = validarNumero (anio);
    
    if ((!nombreVacio) && (!apellidoVacio) && (!emailVacio) && (!telefonoVacio) && (!diaVacio) && 
    (!mesVacio) && (!anioVacio) && (emailValido) && (telefonoValido) && (fechaValida) && 
    (diaValido) && (mesValido) && (anioValido)) 
    {
      formulario = document.getElementById("formulario");
      formulario.reset();
      pintar (nombre, "black", "1px");
      pintar (apellido, "black", "1px");
      pintar (email, "black", "1px");
      pintar (telefono, "black", "1px");
      pintar (dia, "black", "1px");
      pintar (mes, "black", "1px");
      pintar (anio, "black", "1px");
      notificacion ("<h2>Mensaje enviado</h2>", "OK");
    }
    // Hace que no se envie el formulario
    event.preventDefault(); 
}

/**
 * Este método verifica si un año es biciesto o no.
 * Retorna un booleano.
 */
function verifAnioBiciesto (anio)
{
    var esBiciesto;
    esBiciesto = false;
    if (((anio.value % 4 == 0) && (anio.value % 100 == 0) && (anio.value % 400 == 0)) || ((anio.value % 4 == 0) && (anio.value % 100 != 0) 
    && (anio.value % 400 != 0)))
    {
        esBiciesto = true;
    }
    return esBiciesto;
}

/**
 * Este método verifica que una fecha sea valida.
 * Retorna un booleano
 */
function validarFecha (dia, mes, anio)
{
    var fechaValida, cantDiasDelMes, esBiciesto, mesValido, diaValido;

    cantDiasDelMes = [];
    cantDiasDelMes =  {1 : 31, 2 : 28, 3 : 31, 4 : 30, 5 : 31, 6 : 30, 7 : 31, 8 : 31, 9 : 30, 10 : 31, 11 : 30, 12 : 31};
    fechaValida = false;
    mesValido = false;
    diaValido = false;

    esBiciesto = verifAnioBiciesto (anio);

    if (esBiciesto)
    {
        // Reviso si el año es biciesto
        cantDiasDelMes [2]= 29;
    }

    if (parseInt(mes.value) < 13)
    {
        mesValido = true;
    }

    if (parseInt(dia.value) <= cantDiasDelMes [mes.value])
    {
        diaValido = true;
    }

    if ((mesValido) && (mes.style.borderColor == "red"))
    {
        pintar (mes, "green", "2px")
    }
    else if (!mesValido)
    {
        pintar (mes, "red", "2px")
    }

    if ((diaValido) && (dia.style.borderColor == "red"))
    {
        pintar (dia, "green", "2px")
    }
    else if  (!diaValido)
    {
        pintar (dia, "red", "2px")
    }

    if ((diaValido) && (mesValido))
    {
        fechaValida = true;
    }
    return fechaValida;
}

/**
 * Este método verifica que un numero sea un numero y un entero positivo.
 */
function validarNumero (numero)
{
    var esValido, noEsNumero;
    esValido = false;

    noEsNumero = isNaN(numero.value);
    if (noEsNumero)
    {
        // No es un numero
        pintar (numero, "red", "2px");
        esValido = false;
    }
    else if ((numero.value <= 0) || (numero.value % 1 != 0))
    {
        // Es un numero pero el valor es menor a 0 o tiene decimales
        pintar (numero, "red", "2px");
        esValido = false;
    }
    else
    {
        // Es un numero y entero
        esValido = true;
    }
    
    return esValido;
}

/**
 * Este método recibe por párametro un email y retorna un booleano.
 */
function validarEmail (email)
{
    var emailRegex, esValido;
    emailRegex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
    esValido = true;

    if (!emailRegex.test(email.value))
    {
        pintar (email, "red", "2px");
        esValido = false;
    }

    return esValido;
}

/**
 * Este módulo recibe un elemento por párametro y retorna un
 * booleano si esta vacío o no. 
 * Cambia el color del borde del elemento segun el resultado y retorna un booleano.
 */
function estaVacio (elemento)
{
    var vacio;
    vacio = false;
    if (elemento.value == "")
    {
        pintar (elemento, "red", "2px");
        vacio = true;
    }
    // Podria preguntar si el color es rojo pero da error.
    else if ((elemento.style.borderColor == "red") && (elemento.value != ""))
    {
        pintar (elemento, "green", "2px");
        vacio = false;
    }
    return vacio;
}

/**
 * Pinta el borde de un elemento
 */
function pintar (elemento, color, ancho)
{
    elemento.style.borderColor = color;
    elemento.style.borderWidth = ancho;
}



/*
  FUNCIONES PARA EL CARRITO DE COMPRAS: 
*/



/**
 * Agrega 1 item al carrito con el id que llega por parametro
 */
function agregarItem (idProducto)
{
  var productoSeleccionado, productoExistente;
  productoSeleccionado = colProductos.find (function (producto)
  {
    return producto.id == idProducto;
  }
  );

  productoExistente = carrito.find(function (item) {
    return item.id == idProducto;
  }
  );
  if (!productoExistente) 
  {
    // Entro aca si el producto no existe en el carrito
    carrito.push (productoSeleccionado);
    guardarCarrito();
  } 
  else
  {
    // Entro aca si el producto ya existe en el carrito
    productoExistente.cantidad+=1;
    productoExistente.precio+=productoExistente.precioUnitario
    guardarCarrito();
  }
  notificacion("<h2>Producto agregado al carrito</h2>", "");
} 

/**
 * Transforma los contendios del objeto carrito a una cadena de texto
 * JSON y lo guarda en sesionStorage (almacenamiento de la sesion, se borra si actualizo)
 */
function guardarCarrito() 
{
  sessionStorage.setItem ("carrito", JSON.stringify(carrito));
}

/**
 * Actualiza el obj carrito. Recupera de sessionStorage el obj Carrito 
 * (que esta en forma de cadena JSON, y lo guarda en carritoSS) y luego 
 * lo guarda nuevamente en carrito
 */
function actualizarCarrito ()
{
  var carritoSS;
  carritoSS = sessionStorage.getItem ("carrito");
  if (carritoSS != null)
  {
    carrito = JSON.parse(carritoSS);
  }
  return carrito;
}

/**
 * Recupera el obj carrito y lo muestra en  la pagina
 */
function mostrarCarrito ()
{
  // Declaracion de variables
  var divCarrito, divProducto, divCuentas, divEnvio;
  var nombreItem, descripcionItem;
  var precioItem, precioUnitario, subTotal;
  var cantidadItem;
  // Inicializacion de variables
  subTotal = 0;
  carrito = actualizarCarrito ();
  divCarrito = document.getElementById ("carritoItems");
  divCuentas = document.getElementById ("cuentas");
  divEnvio = document.getElementById("envio");
  if (carrito.length != 0)
  {
    // Si hay por lo menos 1 item en el carrito entro aca.
    carrito.forEach(item => 
    {
      divProducto = document.createElement("div");
      divProducto.classList.add ("divProducto");
      nombreItem = item ["nombre"];
      precioItem = item ["precio"];
      precioUnitario = item  ["precioUnitario"]
      fotoItem = item ["foto"];
      descripcionItem = item ["descripcion"];
      cantidadItem = item ["cantidad"];
      subTotal = subTotal + precioItem; 
      divProducto.innerHTML = 
      "<img src = " + fotoItem + ">" + 
      "<h4>" + nombreItem + "</h4>" + 
      "<p>Descripcion: " + descripcionItem + "</p>" +
      "<p>Precio: $ " + precioItem + "</p>" + 
      "<p>Precio unitario: $ " + precioUnitario + "</p>" + 
      "<p class=cantidadItem>Cantidad: </p>" + 
      "<button class = botonCantidad onclick = \"sumarProducto(" + item.id + ")\">↑</button>" + cantidadItem +
      "<button class = botonCantidad onclick = \"disminuirProducto (" + item.id + ")\">↓</button>" +
      "<p><button class= botonEliminar onclick = \"eliminarProducto (" + item.id + ")\">Eliminar del carrito</button></p>";
      divCarrito.appendChild (divProducto);
    });
    if (precioEnvio == 0)
    {
      divCuentas.innerHTML = 
      "<p>Subtotal: $ "+subTotal+"</p>";
      divEnvio.innerHTML = 
      "<form> <p class = block>Seleccione su zona para calcular el envio: </p>" +
      "<select id = zonaEnvio>" +
        "<option value=\"\"></option>" +
        "<option value=centro id = centro>Centro</option>" +
        "<option value=oeste id = oeste>Oeste</option>" +
        "<option value=rioGrande id = rioGrande>Rio Grande</option>" +
      "</select> " +
      "<button id = botonEnvio onclick = \"calcularEnvio()\">Calcular Envio</button>" + 
      "</form>";
    }
    else
    {
      divCuentas.innerHTML = 
      "<p>Subtotal: $ "+subTotal+"</p>" + 
      "<p id = envio>Envio: $ "+precioEnvio+"</p>" + 
      "<p id = totalPagar>Total a pagar: $ "+(parseFloat(subTotal) + parseFloat(precioEnvio))+"</p>" + 
      "<button id = botonPagar class = block onclick = \"pagarCarrito()\">Pagar</button>"  +
      "<a href = productos.html>Continuar Comprando</a>";
      divEnvio.innerHTML = 
      "<form> <p class = block>Seleccione su zona para calcular el envio: </p>" +
      "<select id = zonaEnvio>" +
        "<option value=\"\"></option>" +
        "<option value=centro id = centro>Centro</option>" +
        "<option value=oeste id = oeste>Oeste</option>" +
        "<option value=rioGrande id = rioGrande>Rio Grande</option>" +
      "</select> " +
      "<button id = botonEnvio onclick = \"calcularEnvio()\">Calcular Envio</button>" + 
      "</form>";
    }
  }
  else
  {
    divCarrito.innerHTML = 
    "<h3>Tu carrito esta vacio</h3>" +
    "<p>Tenemos productos de las siguientes categorias a la venta:</p>" +
    "<p><a href = productos.html>Pescados Frescos</a></p>" +
    "<p><a href = productosMariscos.html>Mariscos</a></p>" +
    "<p><a href = productosCongelados.html>Congelados</a></p>";
    divCuentas.innerHTML = "";
    divEnvio.innerHTML = "";
  }
}

/**
 * Agrega 1 producto del mismo tipo
 */
function sumarProducto (idProducto)
{
  var producto, indiceProducto;

  indiceProducto = carrito.findIndex (function (item) 
  {
    return item.id == idProducto;
  });
  producto = carrito [indiceProducto];

  producto.cantidad += 1;
  producto.precio += producto.precioUnitario;

  carrito [indiceProducto] = producto;

  guardarCarrito();
  vaciarCarrito ();
  mostrarCarrito();
}

/**
 * Disminuye 1 producto del mismo tipo
 */
function disminuirProducto (idProducto)
{
  var producto, indiceProducto;

  indiceProducto = carrito.findIndex (function (item) 
  {
    return item.id == idProducto;
  });

  producto = carrito [indiceProducto];

  if (producto.cantidad != 1)
  {
    producto.cantidad -= 1;
    producto.precio -= producto.precioUnitario;
  
    carrito [indiceProducto] = producto;
  
    guardarCarrito();
    vaciarCarrito ();
    mostrarCarrito();
  }
}

/**
 * Elimina 1 producto del mismo tipo
 */
function eliminarProducto (idProducto)
{
  var indiceProducto;
  carrito = actualizarCarrito ();

  indiceProducto = carrito.findIndex (function (item) 
  {
    return item.id == idProducto;
  });
  if (carrito.length == 1)
  {
    carrito.splice(indiceProducto, 1);
  }
  else
  {
    carrito.splice(indiceProducto, 1);
  }
  
  guardarCarrito();
  vaciarCarrito ();
  mostrarCarrito();
}

/**
 * Borra todos los items del carrito
 */
function vaciarCarrito ()
{
  var divCarrito;
  carrito = actualizarCarrito ();
  if (carrito.length != 0)
  {
    divCarrito = document.getElementById ("carritoItems");
    while (divCarrito.firstChild) 
    {
      divCarrito.removeChild (divCarrito.firstChild);
    }
  }
}

/**
 * Paga el carrito
 */
function pagarCarrito ()
{
  carrito = actualizarCarrito ();
  vaciarCarrito();
  if (carrito.length != 0)
  {
    carrito.splice(0,carrito.length);
    guardarCarrito();
    mostrarCarrito();
    notificacion ("<h2>Gracias por tu compra!</h2>", "Cerrar");
  } 
  
}

/**
 * Notifica al usuario con un div.
 * Como paremtro pide el innerHTML de lo que se quiera mostrar.
 */
function notificacion (mensaje, textoBoton)
{
  var divContenido;
  divContenido = document.getElementById("contenido");
  
  if (divContenido.contains(divNotificacion))
  {
    divNotificacion.remove();
  } 
  else
  {
    if (textoBoton != "")
    {
      divNotificacion = document.createElement("div");
      divNotificacion.classList.add ("notificacion");
      divNotificacion.innerHTML = 
      mensaje + "<button id = botonOk onclick = \"notificacion()\">"+textoBoton+"</button>";
      divContenido.appendChild (divNotificacion);
    }
    else
    {
      divNotificacion = document.createElement("div");
      divNotificacion.classList.add ("notificacion");
      divNotificacion.innerHTML = 
      mensaje + "<button id = botonOk onclick = \"notificacion()\">OK</button>";
      divContenido.appendChild (divNotificacion);
    }
  }
}

/**
 * Calcula el envio de la zona seleccionada.
 */
function calcularEnvio ()
{
  var zonaEnvio, zonaVacia;
  zonaEnvio = document.getElementById("zonaEnvio");
  zonaVacia = estaVacio (zonaEnvio);
  if (!zonaVacia)
  {
    if (zonaEnvio.value == "centro")
    {
      precioEnvio = 700;
    }
    else if (zonaEnvio.value == "oeste")
    {
      precioEnvio = 500;
    }
    else if (zonaEnvio.value == "rioGrande")
    {
      precioEnvio = 300;
    }
    guardarCarrito();
    vaciarCarrito ();
    mostrarCarrito();
  }
  event.preventDefault(); 
}