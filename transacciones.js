cuentas = [
    { numeroCuenta: "02234567", cedula: "1714616123", nombre: "Juan", apellido: "Perez", saldo: 0.0 },
    { numeroCuenta: "02345211", cedula: "1281238233", nombre: "Felipe", apellido: "Caicedo", saldo: 0.0 }
]

cargar = function() {
    mostrarComponente("divTransacciones");
    ocultarComponente("divCuentas");
    ocultarComponente("divMovimientos");
    deshabilitarComponente("btnDepositar");
    deshabilitarComponente("btnRetirar");
    deshabilitarComponente("txtMonto");

}

/*
    Busca la cuenta en el arreglo en función del número de cuenta,
    si existe retorna el objeto cuenta, caso contrario retorna null. 
*/
buscarCuenta = function(numeroCuenta) {
    let elementoCuenta;
    let cuentaEcontrada = null;
    for (let i = 0; i < cuentas.length; i++) {
        elementoCuenta = cuentas[i];
        if (elementoCuenta.numeroCuenta == numeroCuenta) {
            cuentaEcontrada = elementoCuenta;
            break;
        }
    }
    return cuentaEcontrada;
}

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

};

depositar = function(numeroCuenta, monto) {
    let cuentaAfectada;
    //invoca a buscarCuenta, guarda el resultado en la variable cuentaAfectada;
    cuentaAfectada = buscarCuenta(numeroCuenta);
    //Al saldo actual de la cuenta afectada, le suma el monto que recibe como parámetro
    cuentaAfectada.saldo += monto;
    mostrarInformacionCuentaEcontrada(cuentaAfectada);
};

ejecutarDeposito = function() {
    //Toma el numero de cuenta ingresado en la caja de texto
    let valorNumeroCuenta = recuperarTexto("txtNumeroCuenta");
    //Toma el monto ingresado en la caja de texto
    let valorMonto = recuperarFloat("txtMonto");
    //invoca a depositar
    depositar(valorNumeroCuenta, valorMonto);
    //Muestra un mensaje TRANSACCION EXITOSA
    alert("TRANSACCION EXITOSA");
    //Muestra en pantalla el nuevo saldo de la cuenta
};


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
};

ejecutarRetiro = function() {
    let valorNumeroCuenta = recuperarTexto("txtNumeroCuenta");
    let valorMonto = recuperarFloat("txtMonto");
    retirar(valorNumeroCuenta, valorMonto);
};

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
};