import * as readline from 'readline';

abstract class Notificacion {
  constructor(protected destino: string, protected mensaje: string) {}

  abstract enviar(): void;
}

class CorreoElectronico extends Notificacion {
  enviar(): void {
    console.log('\nNotificación por Email');
    console.log(`Destinatario: ${this.destino}`);
    console.log(`Contenido: ${this.mensaje}`);
    console.log('Correo enviado correctamente.');
  }
}

class MensajeSMS extends Notificacion {
  enviar(): void {
    console.log('\nNotificación por SMS');
    console.log(`Número: ${this.destino}`);
    console.log(`Mensaje: ${this.mensaje}`);
    console.log('SMS enviado correctamente.');
  }
}

class MensajeWhatsApp extends Notificacion {
  enviar(): void {
    console.log('\nNotificación por WhatsApp');
    console.log(`Contacto: ${this.destino}`);
    console.log(`Mensaje: ${this.mensaje}`);
    console.log('Mensaje enviado por WhatsApp.');
  }
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function preguntar(texto: string): Promise<string> {
  return new Promise((resolve) => rl.question(texto, resolve));
}

async function ejecutarSistema(): Promise<void> {
  console.log('\n=== SISTEMA DE NOTIFICACIONES ===');
  console.log('1. Email');
  console.log('2. SMS');
  console.log('3. WhatsApp');

  const opcion = await preguntar('Seleccione una opción: ');
  const destino = await preguntar('Ingrese el destinatario: ');
  const mensaje = await preguntar('Ingrese el mensaje: ');

  let notificacion: Notificacion | null = null;

  if (opcion.trim() === '1') {
    notificacion = new CorreoElectronico(destino, mensaje);
  } else if (opcion.trim() === '2') {
    notificacion = new MensajeSMS(destino, mensaje);
  } else if (opcion.trim() === '3') {
    notificacion = new MensajeWhatsApp(destino, mensaje);
  } else {
    console.log('Opción no válida.');
  }

  if (notificacion) {
    notificacion.enviar();
  }

  rl.close();
}

ejecutarSistema();
