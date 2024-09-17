document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
  
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
  
    fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })
    .then(response => response.json())
    .then(data => {
      const messageElement = document.getElementById('loginMessage');
      if (data.error) {
        messageElement.innerHTML = `<p class="text-danger">${data.error}</p>`;
      } else {
        messageElement.innerHTML = `<p class="text-success">Login successful!</p>`;
        // Redirect to homepage after login
        // window.location.href = 'homepage.html';
      }
    })
    .catch(error => {
      document.getElementById('loginMessage').innerHTML = `<p class="text-danger">Error: ${error.message}</p>`;
    });
  });
  