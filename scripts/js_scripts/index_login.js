document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');

    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        try {
            const response = await fetch('scripts/php_scripts/fetch_users.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            const result = await response.json();

            if (response.ok) {
                // If user exists, redirect to index.html
                localStorage.setItem('user_id', result.user_id);
                window.location.href = 'products.html';
            } else {
                // If user does not exist, display error message
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
            loginForm.appendChild(errorMessageElement);
        }
        errorMessageElement.textContent = message;
    }
});
