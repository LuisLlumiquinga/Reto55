movimientos=[
    {numeroCuenta:"02234567",monto:10.24,tipo:"D"},
    {numeroCuenta:"02345211",monto:45.90,tipo:"D"},
    {numeroCuenta:"02234567",monto:65.23,tipo:"C"},
    {numeroCuenta:"02345211",monto:65.23,tipo:"C"},
    {numeroCuenta:"02345211",monto:12.0,tipo:"D"},
]

cargar=function(){
    mostrarComponente("divMovimientos");
    ocultarComponente("divCuentas");
    ocultarComponente("divTransacciones");
    
}

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




