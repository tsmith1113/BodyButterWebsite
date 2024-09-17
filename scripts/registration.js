document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault();
  
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
  
    fetch('http://localhost:3000/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email, password })
    })
    .then(response => response.json())
    .then(data => {
      const messageElement = document.getElementById('registerMessage');
      if (data.error) {
        messageElement.innerHTML = `<p class="text-danger">${data.error}</p>`;
      } else {
        messageElement.innerHTML = `<p class="text-success">Registration successful!</p>`;
        // Redirect to login page after registration
        // window.location.href = 'login.html';
      }
    })
    .catch(error => {
      document.getElementById('registerMessage').innerHTML = `<p class="text-danger">Error: ${error.message}</p>`;
    });
  });
  