import * as readline from 'readline';

abstract class Pago {
  constructor(protected cantidad: number) {}

  abstract procesarPago(): void;
}

class PagoEfectivo extends Pago {
  constructor(cantidad: number, private entregado: number) {
    super(cantidad);
  }

  procesarPago(): void {
    console.log('\nPago en efectivo seleccionado.');
    if (this.entregado >= this.cantidad) {
      const cambio = this.entregado - this.cantidad;
      console.log('Pago realizado con éxito.');
      console.log(`Cambio a devolver: $${cambio.toFixed(2)}`);
    } else {
      console.log(`Dinero insuficiente. Faltan $${(this.cantidad - this.entregado).toFixed(2)}`);
    }
  }
}

class PagoTarjeta extends Pago {
  constructor(cantidad: number, private banco: string) {
    super(cantidad);
  }

  procesarPago(): void {
    console.log('\nPago con tarjeta seleccionado.');
    console.log(`Banco emisor: ${this.banco}`);
    console.log(`Monto cobrado: $${this.cantidad.toFixed(2)}`);
    console.log('Transacción aprobada.');
  }
}

class TransferenciaBancaria extends Pago {
  constructor(cantidad: number, private numeroCuenta: string) {
    super(cantidad);
  }

  procesarPago(): void {
    console.log('\nTransferencia bancaria seleccionada.');
    console.log(`Cuenta destino: ${this.numeroCuenta}`);
    console.log(`Monto transferido: $${this.cantidad.toFixed(2)}`);
    console.log('Transferencia completada.');
  }
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function preguntar(texto: string): Promise<string> {
  return new Promise((resolve) => rl.question(texto, resolve));
}

async function iniciar(): Promise<void> {
  console.log('\n=== SISTEMA DE PAGOS ===');

  const monto = parseFloat(await preguntar('Ingrese el monto a pagar: '));

  console.log('\n1. Efectivo');
  console.log('2. Tarjeta');
  console.log('3. Transferencia bancaria');

  const opcion = await preguntar('Seleccione una opción: ');
  let pago: Pago | null = null;

  switch (opcion.trim()) {
    case '1':
      const efectivo = parseFloat(await preguntar('Ingrese el dinero entregado: '));
      pago = new PagoEfectivo(monto, efectivo);
      break;

    case '2':
      const banco = await preguntar('Ingrese el nombre del banco: ');
      pago = new PagoTarjeta(monto, banco);
      break;

    case '3':
      const cuenta = await preguntar('Ingrese el número de cuenta: ');
      pago = new TransferenciaBancaria(monto, cuenta);
      break;

    default:
      console.log('Opción inválida.');
  }

  if (pago) {
    pago.procesarPago();
  }

  rl.close();
}

iniciar();
