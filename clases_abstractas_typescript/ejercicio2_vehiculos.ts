import * as readline from 'readline';

abstract class Vehiculo {
  constructor(protected tipo: string) {}

  abstract mover(): void;

  mostrarVehiculo(): void {
    console.log(`\nVehículo elegido: ${this.tipo}`);
  }
}

class Carro extends Vehiculo {
  constructor() {
    super('Carro');
  }

  mover(): void {
    console.log('El carro avanza sobre la carretera usando cuatro ruedas.');
  }
}

class Bicicleta extends Vehiculo {
  constructor() {
    super('Bicicleta');
  }

  mover(): void {
    console.log('La bicicleta se mueve al pedalear.');
  }
}

class Motocicleta extends Vehiculo {
  constructor() {
    super('Motocicleta');
  }

  mover(): void {
    console.log('La motocicleta se desplaza rápidamente con su motor.');
  }
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('\n=== SISTEMA DE VEHÍCULOS ===');
console.log('1. Carro');
console.log('2. Bicicleta');
console.log('3. Motocicleta');

rl.question('Seleccione un vehículo: ', (opcion) => {
  let vehiculo: Vehiculo | null = null;

  switch (opcion.trim()) {
    case '1':
      vehiculo = new Carro();
      break;
    case '2':
      vehiculo = new Bicicleta();
      break;
    case '3':
      vehiculo = new Motocicleta();
      break;
    default:
      console.log('Opción no válida.');
  }

  if (vehiculo) {
    vehiculo.mostrarVehiculo();
    vehiculo.mover();
  }

  rl.close();
});
