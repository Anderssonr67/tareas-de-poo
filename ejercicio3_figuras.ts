import * as readline from 'readline';

abstract class Figura {
  abstract calcularArea(): number;
  abstract calcularPerimetro(): number;
}

class Cuadrado extends Figura {
  constructor(private lado: number) {
    super();
  }

  calcularArea(): number {
    return this.lado * this.lado;
  }

  calcularPerimetro(): number {
    return this.lado * 4;
  }
}

class Rectangulo extends Figura {
  constructor(private base: number, private altura: number) {
    super();
  }

  calcularArea(): number {
    return this.base * this.altura;
  }

  calcularPerimetro(): number {
    return 2 * (this.base + this.altura);
  }
}

class Circulo extends Figura {
  constructor(private radio: number) {
    super();
  }

  calcularArea(): number {
    return Math.PI * this.radio * this.radio;
  }

  calcularPerimetro(): number {
    return 2 * Math.PI * this.radio;
  }
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function preguntar(texto: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(texto, resolve);
  });
}

async function ejecutar(): Promise<void> {
  console.log('\n=== SISTEMA DE FIGURAS GEOMÉTRICAS ===');
  console.log('1. Cuadrado');
  console.log('2. Rectángulo');
  console.log('3. Círculo');

  const opcion = await preguntar('Seleccione una figura: ');
  let figura: Figura | null = null;

  switch (opcion.trim()) {
    case '1':
      const lado = parseFloat(await preguntar('Ingrese el lado: '));
      figura = new Cuadrado(lado);
      break;

    case '2':
      const base = parseFloat(await preguntar('Ingrese la base: '));
      const altura = parseFloat(await preguntar('Ingrese la altura: '));
      figura = new Rectangulo(base, altura);
      break;

    case '3':
      const radio = parseFloat(await preguntar('Ingrese el radio: '));
      figura = new Circulo(radio);
      break;

    default:
      console.log('Opción inválida.');
  }

  if (figura) {
    console.log(`\nÁrea: ${figura.calcularArea().toFixed(2)}`);
    console.log(`Perímetro: ${figura.calcularPerimetro().toFixed(2)}`);
  }

  rl.close();
}

ejecutar();
