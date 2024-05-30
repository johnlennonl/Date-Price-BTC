
// Obtener los precios de Binance
fetch('https://api.binance.com/api/v3/ticker/price')
  .then(response => response.json())
  .then(binanceData => {
    // Convertir los datos de Binance a un mapa para acceso rápido
    const binanceMap = {};
    binanceData.forEach(crypto => {
      binanceMap[crypto.symbol] = parseFloat(crypto.price).toFixed(3);
    });

    // Obtener la lista de criptomonedas más conocidas de CoinGecko
    return fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false')
      .then(response => response.json())
      .then(geckoData => {
        // Obtener la tabla HTML
        const tableBody = document.querySelector('#crypto-table tbody');

        // Limpiar la tabla antes de llenarla
        tableBody.innerHTML = '';

        // Filtrar y llenar la tabla con los datos de las criptomonedas que tienen precio en Binance
        geckoData.forEach(crypto => {
          const binanceSymbol = crypto.symbol.toUpperCase() + 'USDT';
          const binancePrice = binanceMap[binanceSymbol];

          if (binancePrice) {
            const row = tableBody.insertRow();
            const cell1 = row.insertCell(0);
            const cell2 = row.insertCell(1);
            const cell3 = row.insertCell(2);
            const cell4 = row.insertCell(3);

            const img = document.createElement('img');
            img.src = crypto.image;
            img.width = 25;
            img.height = 25;

            cell1.textContent = crypto.symbol.toUpperCase();
            cell2.textContent = `$${binancePrice}`; // Precio de Binance
            cell3.textContent = `$${crypto.market_cap.toLocaleString()}`; // Capitalización de mercado
            cell4.appendChild(img);
          }
        });
      });
  })
  .catch(error => console.error('Error al obtener los datos de la API de Binance o CoinGecko:', error));

// Funcionalidad de búsqueda
document.getElementById('search').addEventListener('input', function() {
  const searchValue = this.value.toUpperCase();
  const table = document.getElementById('crypto-table');
  const rows = table.getElementsByTagName('tr');

  for (let i = 1; i < rows.length; i++) { // Comienza en 1 para omitir el encabezado
    const symbolCell = rows[i].getElementsByTagName('td')[0];
    if (symbolCell) {
      const symbol = symbolCell.textContent || symbolCell.innerText;
      if (symbol.toUpperCase().indexOf(searchValue) > -1) {
        rows[i].style.display = '';
        rows[i].classList.add('highlight');
      } else {
        rows[i].style.display = 'none';
        rows[i].classList.remove('highlight');
      }
    }
  }
});