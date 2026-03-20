import * as readline from 'readline';

abstract class Transporte {
  abstract calcularCosto(distancia: number): number;
}

class Taxi extends Transporte {
  calcularCosto(distancia: number): number {
    return 3 + distancia * 1.5;
  }
}

class Autobus extends Transporte {
  calcularCosto(distancia: number): number {
    return distancia * 0.35;
  }
}

class Uber extends Transporte {
  calcularCosto(distancia: number): number {
    return 2 + distancia * 1.25;
  }
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function preguntar(texto: string): Promise<string> {
  return new Promise((resolve) => rl.question(texto, resolve));
}

async function programa(): Promise<void> {
  console.log('\n=== SISTEMA DE TRANSPORTE ===');
  console.log('1. Taxi');
  console.log('2. Autobús');
  console.log('3. Uber');

  const opcion = await preguntar('Seleccione un transporte: ');
  const distancia = parseFloat(await preguntar('Ingrese la distancia en km: '));

  let transporte: Transporte | null = null;

  switch (opcion.trim()) {
    case '1':
      transporte = new Taxi();
      break;
    case '2':
      transporte = new Autobus();
      break;
    case '3':
      transporte = new Uber();
      break;
    default:
      console.log('Opción inválida.');
  }

  if (transporte) {
    const total = transporte.calcularCosto(distancia);
    console.log(`\nEl costo del viaje es: $${total.toFixed(2)}`);
  }

  rl.close();
}

programa();
