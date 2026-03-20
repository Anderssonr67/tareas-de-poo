import * as readline from 'readline';

abstract class Empleado {
  constructor(protected nombre: string) {}

  abstract calcularSalario(): number;

  mostrarResultado(): void {
    console.log(`\nEmpleado: ${this.nombre}`);
    console.log(`Salario calculado: $${this.calcularSalario().toFixed(2)}`);
  }
}

class EmpleadoPorHoras extends Empleado {
  constructor(nombre: string, private horas: number, private pagoHora: number) {
    super(nombre);
  }

  calcularSalario(): number {
    return this.horas * this.pagoHora;
  }
}

class EmpleadoFijo extends Empleado {
  constructor(nombre: string, private sueldoMensual: number) {
    super(nombre);
  }

  calcularSalario(): number {
    return this.sueldoMensual;
  }
}

class EmpleadoPorComision extends Empleado {
  constructor(nombre: string, private ventas: number, private porcentaje: number) {
    super(nombre);
  }

  calcularSalario(): number {
    return this.ventas * (this.porcentaje / 100);
  }
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function preguntar(texto: string): Promise<string> {
  return new Promise((resolve) => rl.question(texto, resolve));
}

async function main(): Promise<void> {
  console.log('\n=== SISTEMA DE EMPLEADOS ===');
  console.log('1. Empleado por horas');
  console.log('2. Empleado fijo');
  console.log('3. Empleado por comisión');

  const opcion = await preguntar('Seleccione una opción: ');
  const nombre = await preguntar('Ingrese el nombre: ');

  let empleado: Empleado | null = null;

  switch (opcion.trim()) {
    case '1':
      const horas = parseFloat(await preguntar('Horas trabajadas: '));
      const pagoHora = parseFloat(await preguntar('Pago por hora: '));
      empleado = new EmpleadoPorHoras(nombre, horas, pagoHora);
      break;

    case '2':
      const sueldo = parseFloat(await preguntar('Sueldo mensual: '));
      empleado = new EmpleadoFijo(nombre, sueldo);
      break;

    case '3':
      const ventas = parseFloat(await preguntar('Monto total vendido: '));
      const porcentaje = parseFloat(await preguntar('Porcentaje de comisión: '));
      empleado = new EmpleadoPorComision(nombre, ventas, porcentaje);
      break;

    default:
      console.log('Opción no válida.');
  }

  if (empleado) {
    empleado.mostrarResultado();
  }

  rl.close();
}

main();
