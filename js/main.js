// Simulador de Homebanking

/*  Clases */
class Cliente {
  constructor(nombre, dni, saldo) {
    this.nombre = nombre;
    this.dni = dni;
    this.saldo = saldo;
  }

  retirar(monto) {
    this.saldo = this.saldo - monto;
  }

  depositar(monto) {
    this.saldo = this.saldo + monto;
  }
}

/*  Funciones */
function obtenerIndiceDeClientePorDNI(dni) {
  let indiceCliente = -1;

  for (let i = 0; i < clientes.length; i++) {
    if (clientes[i].dni === dni) {
      indiceCliente = i;
      break;
    }
  }

  return indiceCliente;
}

function clienteExiste(dni) {
  let encontrado = false;

  for (const cliente of clientes) {
    if (cliente.dni === dni) {
      encontrado = true;
      break;
    }
  }

  return encontrado;
}

function depositar() {
  let DNI = prompt("Ingrese el DNI del cliente que quiere depositar");

  while (!clienteExiste(DNI)) {
    DNI = prompt(
      "DNI incorrecto, ingrese el DNI del cliente que quiere depositar"
    );
  }

  /*  Obtener índice del cliente encontrado */
  const indiceCliente = obtenerIndiceDeClientePorDNI(DNI);

  let monto = parseInt(prompt("Ingrese el monto a depositar"));
  clientes[indiceCliente].depositar(monto);

  console.log(
    "Se depositaron $" +
      monto +
      " del cliente " +
      clientes[indiceCliente].nombre
  );
}

function transferir() {
  let DNIDesde = prompt(
    "Ingrese el DNI del cliente desde donde quiere transferir"
  );

  while (!clienteExiste(DNIDesde)) {
    DNIDesde = prompt(
      "DNI incorrecto, ingrese el DNI del cliente desde donde quiere transferir"
    );
  }

  let DNIHasta = prompt("Ingrese el DNI del cliente al que quiere transferir");

  while (!clienteExiste(DNIHasta)) {
    DNIHasta = prompt(
      "DNI incorrecto, ingrese el DNI del cliente al que quiere transferir"
    );
  }

  /*  Obtener los índices del cliente DESDe y HASTA */
  const indiceClienteDesde = obtenerIndiceDeClientePorDNI(DNIDesde);
  const indiceClienteHasta = obtenerIndiceDeClientePorDNI(DNIHasta);

  /*  Pedir el monto a transferir */
  let monto = parseInt(prompt("Ingrese el monto a transferir"));

  /*  Retirar del cliente DESDE y asignamos ese monto al cliente HASTA */
  clientes[indiceClienteDesde].retirar(monto);
  clientes[indiceClienteHasta].depositar(monto);

  alert(
    "Se transfirió $" +
      monto +
      " desde " +
      clientes[indiceClienteDesde].nombre +
      " a " +
      clientes[indiceClienteHasta].nombre
  );
}

function retirar() {
  let DNI = prompt("Ingrese el DNI del cliente que quiere retirar");

  while (!clienteExiste(DNI)) {
    DNI = prompt(
      "DNI incorrecto, ingrese el DNI del cliente que quiere retirar"
    );
  }

  /*  Obtener índice del cliente encontrado */
  const indiceCliente = obtenerIndiceDeClientePorDNI(DNI);

  let monto = parseInt(prompt("Ingrese el monto a retirar"));
  clientes[indiceCliente].retirar(monto);

  alert(
    "Se retiraron $" + monto + " del cliente " + clientes[indiceCliente].nombre
  );
}

/*  Lista de clientes */
const clientes = [
  new Cliente("Nahuel", "11111111", 5000),
  new Cliente("Tamara", "222222222", 8000),
  new Cliente("Fabrizio", "33333333", 10000),
];

let operacion = prompt(
  "Ingrese alguna operación: 1- Retirar, 2- Transferir, 3- Depositar, 4- Salir"
);

while (operacion !== "Salir") {
  switch (operacion) {
    case "1":
      retirar();
      break;

    case "2":
      transferir();
      break;

    case "3":
      depositar();
      break;

    default:
      alert("Opción incorrecta");
      break;
  }

  /*  Se vuelve a pedir que ingrese una operación */
  operacion = prompt(
    "Ingrese una nueva operación: 1- Retirar, 2- Transferir, 3- Depositar, 4- Salir"
  );
}

console.log(clientes);
