cuentas=[
    {numeroCuenta:"02234567", cedula:"1714616123",nombre:"Juan",apellido:"Perez",saldo:0.0},
    {numeroCuenta:"02345211",cedula:"1281238233",nombre:"Felipe",apellido:"Caicedo",saldo:0.0}
]

movimientos=[
    {numeroCuenta:"02234567",monto:10.24,tipo:"D"},
    {numeroCuenta:"02345211",monto:45.90,tipo:"D"},
    {numeroCuenta:"02234567",monto:65.23,tipo:"C"},
    {numeroCuenta:"02345211",monto:65.23,tipo:"C"},
    {numeroCuenta:"02345211",monto:12.0,tipo:"D"},
]
cargar=function(){
     ocultarComponente("divCuentas");
    ocultarComponente("divMovimientos");
    ocultarComponente("divTransacciones");
}
cargarCuenta=function(){
    mostrarComponente("divCuentas");
    ocultarComponente("divMovimientos");
    ocultarComponente("divTransacciones");
    mostrarCuentas();
}

cargarMovimientos=function(){
    mostrarComponente("divMovimientos");
    ocultarComponente("divCuentas");
    ocultarComponente("divTransacciones");
    
}
cargarTransaccion = function() {
    mostrarComponente("divTransacciones");
    ocultarComponente("divCuentas");
    ocultarComponente("divMovimientos");
    deshabilitarComponente("btnDepositar");
    deshabilitarComponente("btnRetirar");
    deshabilitarComponente("txtMonto");

}
// INICIO CUENTAS
mostrarCuentas=function(){
    let cmpTabla=document.getElementById("tablaCuentas");
    let contenidoTabla="<table><tr>"+
    "<th>NUMERO CUENTA</th>"+
    "<th>NOMBRE</th>"+
    "<th>SALDO</th>"+
    "</tr>";
    for(let i=0; i<cuentas.length; i++){
        elementoCuentas=cuentas[i];
        contenidoTabla+="<tr><td>"+elementoCuentas.numeroCuenta+"</td>"
        +"<td>"+elementoCuentas.nombre+" "+elementoCuentas.apellido+"</td>"
        +"<td>"+elementoCuentas.saldo+"</td>"
        +"</tr>"
    }
    contenidoTabla+="</table>"
    cmpTabla.innerHTML=contenidoTabla;
    /*
    Muestra en pantalla una tabla con la información de todas las cuentas del arreglo.
    Columnas: NUMERO CUENTA, NOMBRE, SALDO
    En la columna NOMBRE concatenar el nombre y el apellido
*/
}


buscarCuenta=function(numeroCuenta){
        /*
    Busca la cuenta en el arreglo en función del número de cuenta,
    si existe retorna el objeto cuenta, caso contrario retorna null. 
*/
    let cuentaEncontrada=null;

    for(let i=0; i<cuentas.length; i++){
        if(cuentas[i].numeroCuenta==numeroCuenta){
            cuentaEncontrada=cuentas[i];
        }
    }
    return cuentaEncontrada;

}

agregarCuenta=function(cuenta){
    //Si ya existe mostrar un alert CUENTA EXISTENTE
    //Si se agrega, mostrar un alert CUENTA AGREGADA

    let buscaCuenta=buscarCuenta(cuenta.numeroCuenta);

    if(buscaCuenta==null){
        cuentas.push(cuenta);
        alert("CUENTA AGREGADA");
    }else{
        alert("CUENTA EXISTENTE");
    }
    /*
    Agrega una cuenta al arreglo, solamente si no existe otra cuenta con el mismo numero.
    No retorna nada
*/
}

agregar=function(){
    //Toma los valores de las cajas de texto, sin validaciones
    //Crea un objeto cuenta y agrega los atributos con los valores de las cajas respectivas
    //Invoca a agregarCuenta
    //Invoca a mostrarCuentas

    let cedula=recuperarTexto("txtCedula");
    let nombre=recuperarTexto("txtNombre");
    let apellido=recuperarTexto("txtApellido");
    let cuenta=recuperarTexto("txtCuenta");

    let nuevaCuenta=[];

    nuevaCuenta.numeroCuenta=cuenta;
    nuevaCuenta.cedula=cedula;
    nuevaCuenta.nombre=nombre;
    nuevaCuenta.apellido=apellido;
    nuevaCuenta.saldo=0.0;

    agregarCuenta(nuevaCuenta);
    mostrarCuentas();
}

//FIN CUENTAS

//INICIO TRANSACCIONES
ejecutarBusqueda = function() {
    //toma el numero de cuenta de la caja de texto
    let valorNumeroCuenta = recuperarTexto("txtNumeroCuenta");
    //invoca a buscarCuenta y guarda el resultado en una variable
    let cuentaEncontrada = buscarCuenta(valorNumeroCuenta);
    //Si el resultado es diferente de null, muestra en pantalla, caso contrario muestra un alert
    if (cuentaEncontrada != null) {
        alert("CUENTA ENCONTRADA");
        habilitarComponente("btnDepositar");
        habilitarComponente("btnRetirar");
        habilitarComponente("txtMonto");
        mostrarInformacionCuentaEcontrada(cuentaEncontrada);
    } else {
        alert("CUENTA INEXISTENTE");
        let cmp = document.getElementById("tbInformacion");
        cmp.innerHTML = "";
    }
}

depositar = function(numeroCuenta, monto) {
    let cuentaAfectada;
    //invoca a buscarCuenta, guarda el resultado en la variable cuentaAfectada;
    cuentaAfectada = buscarCuenta(numeroCuenta);
    //Al saldo actual de la cuenta afectada, le suma el monto que recibe como parámetro
    cuentaAfectada.saldo += monto;
    mostrarInformacionCuentaEcontrada(cuentaAfectada);
}

ejecutarDeposito = function() {
    //Toma el numero de cuenta ingresado en la caja de texto
    let valorNumeroCuenta = recuperarTexto("txtNumeroCuenta");
    //Toma el monto ingresado en la caja de texto
    let valorMonto = recuperarFloat("txtMonto");
    //invoca a depositar
    depositar(valorNumeroCuenta, valorMonto);
    //Muestra un mensaje TRANSACCION EXITOSA
    alert("TRANSACCION EXITOSA");
    let movimiento={};
        movimiento.numeroCuenta=valorNumeroCuenta;
        movimiento.monto=valorMonto;
        movimiento.tipo="C";
        movimientos.push(movimiento);
    //Muestra en pantalla el nuevo saldo de la cuenta
}


retirar = function(numeroCuenta, monto) {
    let cuentaAfectada;
    //invoca a buscarCuenta, guarda el resultado en la variable cuentaAfectada;
    //Valida si la cuenta tiene el saldo suficiente para retirar el monto  
    //Si el saldo es suficiente,al saldo actual de la cuenta afectada, le resta el monto que recibe como parámetro
    //Si el saldo no es suficiente, muestra un alert SALDO INSUFICIENTE
    //Si logra retirar muestra un mensaje TRANSACCION EXITOSA y muestra en pantalla el nuevo saldo de la cuenta
    cuentaAfectada = buscarCuenta(numeroCuenta);
    if ((cuentaAfectada.saldo != 0) || (cuentaAfectada.saldo > monto)) {
        cuentaAfectada.saldo -= monto;
        alert("TRANSACCION EXITOSA");     
        mostrarInformacionCuentaEcontrada(cuentaAfectada);
    } else {
        alert("SALDO INSUFICIENTE");
    }
}

ejecutarRetiro = function() {
    let valorNumeroCuenta = recuperarTexto("txtNumeroCuenta");
    let valorMonto = recuperarFloat("txtMonto");
    retirar(valorNumeroCuenta, valorMonto);
    alert("TRANSACCION EXITOSA");
    let movimiento={};
        movimiento.numeroCuenta=valorNumeroCuenta;
        movimiento.monto=valorMonto;
        movimiento.tipo="D";
        movimientos.push(movimiento);
}

//se redunda con esta tabla para mostrar en pantalla la busqueda de cuenta y tambien observar las transacciones actualizadas conforme se apliquen.
mostrarInformacionCuentaEcontrada = function(objetoEncontrado) {
    //let cuentaEncontrada = buscarCuenta(objetoEncontrado);
    let contenidoTabla = "<table>" +
        "<tr><th>Nro Cuenta</th><th>cedula</th><th>Nombre</th><th>Saldo</th></tr>" +
        "<tr>" +
        "<td>" + objetoEncontrado.numeroCuenta + "</td>" +
        "<td>" + objetoEncontrado.cedula + "</td>" +
        "<td>" + objetoEncontrado.nombre + " " + objetoEncontrado.apellido + "</td>" +
        "<td>" + objetoEncontrado.saldo + "</td>" +
        "<tr>" +
        "</table>";
    let cmp = document.getElementById("tbInformacion");
    cmp.innerHTML = contenidoTabla;
}
//FIN TRANSACCIONES


//INICIO MOVIMIENTOS 

filtrarMovimientos=function(numeroCuenta){
    let cuentaEncontrada=recuperarTexto("txtMovimientos");
    let movimientosCuenta=[];
    for(i=0;i<movimientos.length;i++){
        numeroCuenta=movimientos[i];
        if(cuentaEncontrada==numeroCuenta.numeroCuenta){
            movimientosCuenta.push(numeroCuenta);
        }
    }
   mostrarMovimientos(movimientosCuenta);
     
    //Se barre el arreglo de movimientos
    //En cada iteración, verifica si el numero de cuenta del movimiento es igual al que recibe como parametro
    //En caso de serlo, agrega la cuenta al arreglo movimientosCuenta
    //Invoca a mostrarMovimientos, pasándole como parámetro movimientosCuenta
}

/*
    Recibe un arreglo con los movimientos que va a mostrar en pantalla
*/
mostrarMovimientos=function(misMovimientos){
     let cmpTabla=document.getElementById("tablaMovimientos");
    let contenidoTabla="<table><tr>"+
    "<th> NUMERO DE CEUNTA </th>"+
    "<th> MONTO </th>"+
    "<th> TIPO </th>"+
    "</tr>";
    let movimientosActual;
    if(misMovimientos==0){
        alert("NO EXISTEN MOVIMIENTOS");
    }else{
    for(let i=0;i<misMovimientos.length;i++){
        movimientosActual=misMovimientos[i];
        if(movimientosActual.tipo=="D"){
        movimientosActual.monto=movimientosActual.monto*-1;
        contenidoTabla+="<tr><td>"+  movimientosActual.numeroCuenta+"</td>"
        +"<td>"+  movimientosActual.monto+"</td>"
        +"<td>"+  movimientosActual.tipo+"</td>"
         +"</tr>"
         }else{
        contenidoTabla+="<tr><td>"+  movimientosActual.numeroCuenta+"</td>"
        +"<td>"+  movimientosActual.monto+"</td>"
        +"<td>"+  movimientosActual.tipo+"</td>"
         +"</tr>"
         }
    }
    contenidoTabla+="</table>"
    cmpTabla.innerHTML=contenidoTabla;
    }
    //Muestra en pantalla una tabla con los movimientos que recibe en misMovimientos
    //Columnas: NUMERO CUENTA, MONTO, TIPO
    //Si ya pinta correctamente la tabla, hacer el siguiente cambio:
    //Si el tipo es D(DEBITO), mostrar el monto en negativo (multiplicar por -1)
    //Si el tipo es C(CREDITO), mostrar el monto en positivo (tal como está guardado)
}


//FIN MOVIMIENTOS
/*
    En este archivo se deben colocar todas las funciones de cuentas, movimientos y transacciones
    IMPORTANTE: NO DUPLICAR FUNCIONES, si existe una misma función en varios archivos,
    dejar solo una de ellas, ejemplo la función buscarCuenta
*/

//OCULTAR Y MOSTRAR LOS DIVS, para que cada opción muestre solo su parte


//Cuando se realiza un depósito de forma exitosa, se debe crear un objeto movimiento
//con el tipo C, que corresponde a CREDITO, el número de cuenta a la que se hizo el depósito
//y el monto que se depositó. Este objeto movimiento se agrega al arreglo movimientos

//Cuando se realiza un retiro de forma exitosa, se debe crear un objeto movimiento
//con el tipo D, que corresponde a DEBITO, el número de cuenta a la que se hizo el retiro
//y el monto que se retiró. Este objeto movimiento se agrega al arreglo movimientos


