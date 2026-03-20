import * as readline from 'readline';

abstract class Producto {
  constructor(protected nombre: string, protected precio: number) {}

  abstract calcularPrecioFinal(): number;
  abstract mostrarInformacion(): void;
}

class Electronico extends Producto {
  calcularPrecioFinal(): number {
    const impuesto = this.precio * 0.15;
    return this.precio + impuesto;
  }

  mostrarInformacion(): void {
    console.log('\nProducto Electrónico');
    console.log(`Nombre: ${this.nombre}`);
    console.log(`Precio base: $${this.precio.toFixed(2)}`);
    console.log(`Precio final: $${this.calcularPrecioFinal().toFixed(2)}`);
  }
}

class Ropa extends Producto {
  calcularPrecioFinal(): number {
    const descuento = this.precio * 0.10;
    return this.precio - descuento;
  }

  mostrarInformacion(): void {
    console.log('\nProducto de Ropa');
    console.log(`Nombre: ${this.nombre}`);
    console.log(`Precio base: $${this.precio.toFixed(2)}`);
    console.log(`Precio final: $${this.calcularPrecioFinal().toFixed(2)}`);
  }
}

class Alimento extends Producto {
  calcularPrecioFinal(): number {
    const recargo = this.precio * 0.05;
    return this.precio + recargo;
  }

  mostrarInformacion(): void {
    console.log('\nProducto Alimenticio');
    console.log(`Nombre: ${this.nombre}`);
    console.log(`Precio base: $${this.precio.toFixed(2)}`);
    console.log(`Precio final: $${this.calcularPrecioFinal().toFixed(2)}`);
  }
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function preguntar(texto: string): Promise<string> {
  return new Promise((resolve) => rl.question(texto, resolve));
}

async function tienda(): Promise<void> {
  console.log('\n=== SISTEMA DE TIENDA ===');
  console.log('1. Electrónico');
  console.log('2. Ropa');
  console.log('3. Alimento');

  const opcion = await preguntar('Seleccione el tipo de producto: ');
  const nombre = await preguntar('Ingrese el nombre del producto: ');
  const precio = parseFloat(await preguntar('Ingrese el precio base: '));

  let producto: Producto | null = null;

  switch (opcion.trim()) {
    case '1':
      producto = new Electronico(nombre, precio);
      break;
    case '2':
      producto = new Ropa(nombre, precio);
      break;
    case '3':
      producto = new Alimento(nombre, precio);
      break;
    default:
      console.log('Opción no válida.');
  }

  if (producto) {
    producto.mostrarInformacion();
  }

  rl.close();
}

tienda();
