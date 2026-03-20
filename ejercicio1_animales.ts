import * as readline from 'readline';

abstract class Animal {
  constructor(protected nombreAnimal: string) {}

  abstract hacerSonido(): void;

  mostrarTipo(): void {
    console.log(`\nHas seleccionado: ${this.nombreAnimal}`);
  }
}

class Perro extends Animal {
  constructor() {
    super('Perro');
  }

  hacerSonido(): void {
    console.log('El perro ladra: ¡Guau guau!');
  }
}

class Gato extends Animal {
  constructor() {
    super('Gato');
  }

  hacerSonido(): void {
    console.log('El gato maúlla: ¡Miau miau!');
  }
}

class Vaca extends Animal {
  constructor() {
    super('Vaca');
  }

  hacerSonido(): void {
    console.log('La vaca hace: ¡Muu muu!');
  }
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('\n=== SISTEMA DE ANIMALES ===');
console.log('1. Perro');
console.log('2. Gato');
console.log('3. Vaca');

rl.question('Seleccione una opción: ', (opcion) => {
  let animal: Animal | null = null;

  if (opcion.trim() === '1') {
    animal = new Perro();
  } else if (opcion.trim() === '2') {
    animal = new Gato();
  } else if (opcion.trim() === '3') {
    animal = new Vaca();
  } else {
    console.log('Opción inválida.');
  }

  if (animal) {
    animal.mostrarTipo();
    animal.hacerSonido();
  }

  rl.close();
});
