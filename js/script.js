/* ==================================================================
   JGR SOLUCIONES CONTABLES Y TRIBUTARIAS — JAVASCRIPT
   ------------------------------------------------------------------
   Este archivo hace dos cosas:
   1. Menú móvil: abre/cierra el menú hamburguesa en celular.
   2. Formulario de contacto: envía los datos a FormSubmit.co sin
      recargar la página, y muestra un mensaje de "enviando",
      "éxito" o "error" según corresponda.
   ================================================================== */


/* ------------------------------------------------------------------
   1. MENÚ MÓVIL (hamburguesa)
   ------------------------------------------------------------------ */
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

// Al hacer clic en el botón hamburguesa, se muestra/oculta el menú
navToggle.addEventListener('click', () => {
  navMenu.classList.toggle('open');
});

// Al hacer clic en cualquier link del menú, se cierra automáticamente
// (útil en celular, para que no quede el menú abierto tapando la sección)
navMenu.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('open');
  });
});


/* ------------------------------------------------------------------
   2. ENVÍO DEL FORMULARIO DE CONTACTO
   ------------------------------------------------------------------
   El formulario apunta a FormSubmit.co (ver index.html, atributo
   "action" del <form>). En vez de dejar que el navegador recargue
   la página al enviar, interceptamos el envío con fetch() para:
     a) mostrar mensajes de "Enviando...", "¡Gracias!" o error
     b) que el usuario no salga de la página web

   IMPORTANTE (una sola vez):
   La primera vez que alguien llene este formulario, FormSubmit
   enviará un correo de confirmación a jgrsolucionesct@gmail.com
   pidiendo activar el buzón. Hay que darle clic a "activate" en
   ese correo. Después de eso, todos los envíos llegan automático,
   sin necesidad de volver a confirmar nada.
   ------------------------------------------------------------------ */
const form = document.getElementById('jgrForm');
const status = document.getElementById('formStatus');

form.addEventListener('submit', async (event) => {
  // Evita que el navegador recargue la página (comportamiento por defecto de un formulario)
  event.preventDefault();

  // Muestra el mensaje "Enviando..." mientras se procesa la solicitud
  status.className = 'form-status';
  status.style.display = 'block';
  status.style.color = '#6B6B6E';
  status.textContent = 'Enviando...';

  try {
    // Envía los datos del formulario a FormSubmit.co
    const response = await fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { 'Accept': 'application/json' }
    });

    if (response.ok) {
      // Éxito: se muestra mensaje verde y se limpia el formulario
      status.className = 'form-status ok';
      status.textContent = '¡Gracias! Hemos recibido su solicitud y nos pondremos en contacto pronto.';
      form.reset();
    } else {
      // La respuesta llegó pero indica un error (por ejemplo, buzón no activado aún)
      throw new Error('Error en la respuesta del servidor');
    }
  } catch (error) {
    // Fallo de red o del servicio de envío: se muestra mensaje rojo con alternativa
    status.className = 'form-status err';
    status.textContent = 'No pudimos enviar el formulario. Por favor escríbanos por WhatsApp o al correo directamente.';
  }
});