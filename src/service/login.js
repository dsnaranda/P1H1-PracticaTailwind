document.addEventListener("DOMContentLoaded", function () {
    // Verificar si hay datos de usuario en el Local Storage
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
        const userData = JSON.parse(storedUserData);
        showUserData(userData.user); // Mostrar datos del usuario
    }

    document.getElementById("loginForm").addEventListener("submit", function (event) {
        event.preventDefault(); // Prevenir el envío del formulario

        // Obtener datos del formulario
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        // Hacer la solicitud a la API de inicio de sesión
        fetch("http://localhost:3000/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        })
        .then(response => response.json())
        .then(userData => {
            // Mostrar los datos en la consola
            console.log("Datos de inicio de sesión:", userData);

            // Guardar los datos en el Local Storage
            localStorage.setItem("userData", JSON.stringify(userData));

            // Cambiar el contenido del div del login al div de datos del usuario
            showUserData(userData.user);
        })
        .catch(error => {
            console.error("Error en el inicio de sesión:", error);
        });
    });
});

// Función para mostrar los datos del usuario
function showUserData(user) {
    const loginContainer = document.getElementById("login-container");
    loginContainer.innerHTML = `
        <div class="bg-red-700 p-8 m-4 rounded-lg shadow-lg flex justify-center items-center"> 
            <div class="flex-shrink-0">
                <div class="flex justify-center w-64 h-64 rounded-full border-8 border-black overflow-hidden mx-auto mb-6">
                    <img src="../img/main.png" class="w-full h-full object-cover" alt="Imagen de perfil">
                </div>
            </div>
            <div class="ml-6"> <!-- Espacio entre la imagen y la información -->
                <h2 class="text-3xl font-bold text-white mb-4 text-center">Bienvenido, ${user.nombre}</h2> <!-- Centrar texto -->
                <div class="grid grid-cols-1 gap-4">
                    <div class="bg-gray-100 p-4 rounded-lg">
                        <h3 class="text-xl font-semibold text-gray-700">Información del Usuario</h3>
                        <p class="text-gray-600">Nombre: <span class="font-medium">${user.nombre}</span></p>
                        <p class="text-gray-600">Correo Electrónico: <span class="font-medium">${user.email}</span></p>
                        <p class="text-gray-600">Rol: <span class="font-medium">${user.rol}</span></p>
                    </div>
                    <div class="bg-gray-100 p-4 rounded-lg">
                        <h3 class="text-xl font-semibold text-gray-700">Detalles Adicionales</h3>
                        <p class="text-gray-600">ID de Usuario: <span class="font-medium">${user._id}</span></p>
                        <p class="text-gray-600">Estado: <span class="font-medium">Activo</span></p>
                    </div>
                </div>
                <button id="logout-button" class="mt-6 w-full bg-red-600 hover:bg-red-500 text-white font-bold py-2 rounded focus:outline-none focus:shadow-outline">Cerrar Sesión</button>
            </div>
        </div>
    `;


    // Añadir funcionalidad para cerrar sesión
    document.getElementById("logout-button").addEventListener("click", function () {
        localStorage.removeItem("userData"); // Limpiar el Local Storage
        location.reload(); // Recargar la página para mostrar el formulario de inicio de sesión de nuevo
    });
}
