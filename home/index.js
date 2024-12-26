fetch('/api/getUserCount')
    .then(response => response.json())
    .then(data => {
        userCounter.textContent = data.count + " usuários registrados!";
    })
    .catch(error => {
        console.error('Erro ao carregar contagem de usuários:', error);
        userCounter.textContent = "Erro ao carregar contagem.";
    });