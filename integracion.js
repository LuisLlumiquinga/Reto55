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
    let cuentaEncontrada=null;

    for(let i=0; i<cuentas.length; i++){
        if(cuentas[i].numeroCuenta==numeroCuenta){
            cuentaEncontrada=cuentas[i];
        }
    }

    return cuentaEncontrada;
    /*
    Busca la cuenta en el arreglo en función del número de cuenta,
    si existe retorna el objeto cuenta, caso contrario retorna null. 
*/
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


