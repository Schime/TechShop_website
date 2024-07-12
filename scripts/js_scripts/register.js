document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('register-form');

    registerForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        try {
            const response = await fetch('scripts/php_scripts/register.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            const result = await response.json();

            if (response.ok) {
                // If registration is successful, redirect to login page
                window.location.href = 'index_login.html';
            } else {
                // If there is an error, display the error message
                displayErrorMessage(result.message);
            }
        } catch (error) {
            console.error('Error:', error);
            displayErrorMessage('An error occurred. Please try again later.');
        }
    });

    function displayErrorMessage(message) {
        let errorMessageElement = document.getElementById('error-message');
        if (!errorMessageElement) {
            errorMessageElement = document.createElement('div');
            errorMessageElement.id = 'error-message';
            errorMessageElement.style.color = 'red';
            errorMessageElement.style.marginTop = '10px';
            registerForm.appendChild(errorMessageElement);
        }
        errorMessageElement.textContent = message;
    }
});
