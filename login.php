<?php
// Datos de conexión a la base de datos
$servidor = "localhost";
$usuario = "root"; // Cambia esto según tu configuración
$contrasena = "";  // Cambia esto según tu configuración
$base_datos = "mi_base_datos"; // Asegúrate de que esta base de datos existe

try {
    // Crear conexión con PDO
    $conn = new PDO("mysql:host=$servidor;dbname=$base_datos", $usuario, $contrasena);
    // Establecer el modo de error de PDO
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e) {
    die("Conexión fallida: " . $e->getMessage());
}

// Verificar si el formulario fue enviado
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $usuario = $_POST['usuario'];
    $contrasena = $_POST['contrasena'];

    // Consultar si el usuario existe en la base de datos
    $sql = "SELECT * FROM usuarios WHERE usuario = :usuario";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':usuario', $usuario);
    $stmt->execute();

    if ($stmt->rowCount() > 0) {
        // El usuario existe, ahora verificamos la contraseña
        $usuario_db = $stmt->fetch(PDO::FETCH_ASSOC);

        if (password_verify($contrasena, $usuario_db['contrasena'])) {
            // Iniciar sesión
            session_start();
            $_SESSION['usuario'] = $usuario;

            // Redirigir a la página de bienvenida
            header("Location: bienvenida.php");
            exit(); // Evitar que el código posterior se ejecute
        } else {
            // Contraseña incorrecta, redirigir con error
            header("Location: login.php?error=true");
            exit();
        }
    } else {
        // Usuario no encontrado, redirigir con error
        header("Location: login.php?error=true");
        exit();
    }
}

// Cerrar la conexión
$conn = null;
?>

