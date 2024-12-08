const registerForm = document.getElementById('registerForm');
if (registerForm) {
    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        console.log("Form submitted!"); // Debugging line
        
        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        const res = await fetch('http://localhost:5000/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, email, password })
        });

        const data = await res.json();
        console.log(data); // Log the response

        if (res.status !== 201) {
            alert(data.message); // Show the error message from the backend
        } else {
            alert('Registration successful!'); // Show success message
            window.location.href = 'login.html'; // Redirect to login page
        }
    });
}

// Login event
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;

        const res = await fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const data = await res.json();
        if (data.token) {
            localStorage.setItem('auth-token', data.token);
            localStorage.setItem('username', data.username);
            window.location.href = 'protected.html'; // Redirect to protected page
        } else {
            alert(data.message);
        }
    });
}
