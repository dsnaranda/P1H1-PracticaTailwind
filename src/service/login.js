// archivo.js
export async function login() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://localhost:3000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        });

        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.statusText}`);
        }

        const data = await response.json();
        console.log('Login exitoso:', data);
        setTimeout(() => {
            location.reload();
        }, 1000);
        // Guardar datos en Local Storage
        localStorage.setItem('userData', JSON.stringify(data)); // Cambia 'userData' por la clave que prefieras

    } catch (error) {
        console.error(error);
    }
}
