document.addEventListener('DOMContentLoaded', () => {
    // Usuario y contraseña válidos
    const usuarioValido = 'admin'; // Nombre de usuario permitido
    const contrasenaValida = '1234'; // Contraseña permitida

    // Referencias al formulario y mensaje de error
    const formInicioSesion = document.getElementById('form-inicio-sesion');
    const mensajeError = document.getElementById('mensaje-error');

    // Manejar el evento de envío del formulario
    formInicioSesion.addEventListener('submit', (e) => {
        e.preventDefault(); // Evita que el formulario se envíe

        // Obtén los valores ingresados por el usuario
        const usuario = document.getElementById('usuario').value;
        const contrasena = document.getElementById('contrasena').value;

        // Validar credenciales
        if (usuario === usuarioValido && contrasena === contrasenaValida) {
            // Redirigir si las credenciales son correctas
            window.location.href = 'index.html'; // Cambia al nombre real de tu archivo
        } else {
            // Mostrar mensaje de error si son incorrectas
            mensajeError.style.display = 'block';
        }
    });
});
