// Función genérica para solicitar datos de la API de Binance
const requestData = (url, callback) => {
  fetch(url)
    .then((resp) => resp.json())
    .then(callback)
    .catch((error) => console.error("Error:", error));
};

// Función para mostrar datos comunes a todas las criptomonedas
const displayCommonData = (data, containerId) => {
  const { priceChangePercent, volume, highPrice, lowPrice, weightedAvgPrice } =
    data;
  const formattedVolume = parseFloat(volume).toFixed(3);
  const formattedPercent = parseFloat(priceChangePercent).toFixed(3);

  document.getElementById(containerId).innerHTML = `
    <div class="card-informacion container"> 
      <p> Porcentaje: (7days) <em> %${formattedPercent}</em></p>
      <p> Volumen:<em> $${formattedVolume}</em></p>
      <p> High Price: <em> $${highPrice}</em></p>
      <p> LowPrice: <em> $${lowPrice}</em></p>
      <p> Precio Promedio:  <em> $${weightedAvgPrice}</em></p>
    </div>`;
};

// Función para mostrar el precio de una criptomoneda específica
const displayPrice = (data, containerId) => {
  const price = parseFloat(data.price).toFixed(3);
  document.getElementById(
    containerId
  ).innerHTML = `<p class="symbol">${data.symbol} = <em> $${price} USD </em> </p>`;
};

// Configuración para cada criptomoneda: símbolo, URLs y elementos de visualización
const cryptocurrencies = [
  {
    symbol: "BTC",
    name: "Bitcoin",
    priceUrl: "https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT",
    percentUrl:
      "https://api.binance.com/api/v3/ticker/tradingDay?symbol=BTCUSDT",
    priceContainer: "mostrar_datos",
    percentContainer: "mostrar_porcentaje",
  },
  {
    symbol: "ETH",
    name: "Ethereum",
    priceUrl: "https://api.binance.com/api/v3/ticker/price?symbol=ETHUSDT",
    percentUrl:
      "https://api.binance.com/api/v3/ticker/tradingDay?symbol=ETHUSDT",
    priceContainer: "mostrar_datos2",
    percentContainer: "mostrar_porcentajeEth",
  },
  {
    symbol: "LTC",
    name: "Litecoin",
    priceUrl: "https://api.binance.com/api/v3/ticker/price?symbol=LTCUSDT",
    percentUrl:
      "https://api.binance.com/api/v3/ticker/tradingDay?symbol=LTCUSDT",
    priceContainer: "mostrar_datos3",
    percentContainer: "mostrar_porcentajeLtc",
  },
  {
    symbol: "BNB",
    name: "BNB",
    priceUrl: "https://api.binance.com/api/v3/ticker/price?symbol=BNBUSDT",
    percentUrl:
      "https://api.binance.com/api/v3/ticker/tradingDay?symbol=BNBUSDT",
    priceContainer: "mostrar_datos4",
    percentContainer: "mostrar_porcentajeBnb",
  },
  {
    symbol: "SOL",
    name: "solana",
    priceUrl: "https://api.binance.com/api/v3/ticker/price?symbol=SOLUSDT",
    percentUrl:
      "https://api.binance.com/api/v3/ticker/tradingDay?symbol=SOLUSDT",
    priceContainer: "mostrar_datos5",
    percentContainer: "mostrar_porcentajeSol",
  },
  {
    symbol: "DOGE",
    name: "Dogecoin",
    priceUrl: "https://api.binance.com/api/v3/ticker/price?symbol=DOGEUSDT",
    percentUrl:
      "https://api.binance.com/api/v3/ticker/tradingDay?symbol=DOGEUSDT",
    priceContainer: "mostrar_datos6",
    percentContainer: "mostrar_porcentajeDoge",
  },
  {
    symbol: "SHIB",
    name: "SHIBA INU",
    priceUrl: "https://api.binance.com/api/v3/ticker/price?symbol=SHIBUSDT",
    percentUrl:
      "https://api.binance.com/api/v3/ticker/tradingDay?symbol=SHIBUSDT",
    priceContainer: "mostrar_datos7",
    percentContainer: "mostrar_porcentajeShib",
  },
  {
    symbol: "XRP",
    name: "XRP",
    priceUrl: "https://api.binance.com/api/v3/ticker/price?symbol=XRPUSDT",
    percentUrl:
      "https://api.binance.com/api/v3/ticker/tradingDay?symbol=XRPUSDT",
    priceContainer: "mostrar_datos8",
    percentContainer: "mostrar_porcentajeXrp",
  },
   {
    symbol: "ADA",
    name: "Cardano",
    priceUrl: "https://api.binance.com/api/v3/ticker/price?symbol=ADAUSDT",
    percentUrl:
      "https://api.binance.com/api/v3/ticker/tradingDay?symbol=ADAUSDT",
    priceContainer: "mostrar_datos9",
    percentContainer: "mostrar_porcentajeAda",
  },
  {
    symbol: "XLM",
    name: "Stellar",
    priceUrl: "https://api.binance.com/api/v3/ticker/price?symbol=XLMUSDT",
    percentUrl:
      "https://api.binance.com/api/v3/ticker/tradingDay?symbol=XLMUSDT",
    priceContainer: "mostrar_datos12",
    percentContainer: "mostrar_porcentajeXlm",
  },{
    symbol: "AVAX",
    name: "Avalanche",
    priceUrl: "https://api.binance.com/api/v3/ticker/price?symbol=AVAXUSDT",
    percentUrl:
      "https://api.binance.com/api/v3/ticker/tradingDay?symbol=AVAXUSDT",
    priceContainer: "mostrar_datos13",
    percentContainer: "mostrar_porcentajeAvax",
  },
   {
    symbol: "ATOM",
    name: "Cosmos",
    priceUrl: "https://api.binance.com/api/v3/ticker/price?symbol=ATOMUSDT",
    percentUrl:
      "https://api.binance.com/api/v3/ticker/tradingDay?symbol=ATOMUSDT",
    priceContainer: "mostrar_datos15",
    percentContainer: "mostrar_porcentajeAtom",
  }
];

// Iteramos sobre cada criptomoneda para configurar las solicitudes y visualizaciones
cryptocurrencies.forEach(
  ({ symbol, priceUrl, percentUrl, priceContainer, percentContainer }) => {
    const priceCallback = (data) => displayPrice(data, priceContainer);
    const percentCallback = (data) => displayCommonData(data, percentContainer);
    window.addEventListener("load", () => requestData(priceUrl, priceCallback));
    window.addEventListener("load", () =>
      requestData(percentUrl, percentCallback)
    );
  }
);

// Función para calcular el valor de una criptomoneda en USD

const calcularValorCriptomoneda = (url, inputId, resultContainerId, moneda) => {
  let monto = parseFloat(document.getElementById(inputId).value);
  let mostrarValor = document.getElementById(resultContainerId);

  if (isNaN(monto) || monto <= 0) {
      mostrarValor.innerHTML = `Por favor, ingrese un monto válido en ${moneda}.`;
      return;
  }

  fetch(url)
      .then((resp) => resp.json())
      .then((data) => {
          let precioUSD = parseFloat(data.price);
          let valorUSD = monto * precioUSD;
          valorUSD = valorUSD.toFixed(2); // Redondeamos a 2 decimales
          mostrarValor.innerHTML = `<p class="mostrar_resultado">El valor de ${monto} ${moneda} es de $${valorUSD} USD.</p>`;
      })
      .catch((error) => {
          mostrarValor.innerHTML = "Ha ocurrido un error al obtener los datos.";
          console.error("Error:", error);
      });
};

// Para BTC
const calcularValorBTC = () => {
  calcularValorCriptomoneda(
      "https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT",
      "monto_btc",
      "mostrar_valor",
      "BTC"
  );
};

// Para ETH
const calcularValorETH = () => {
  calcularValorCriptomoneda(
      "https://api.binance.com/api/v3/ticker/price?symbol=ETHUSDT",
      "monto_eth",
      "mostrar_valorEth",
      "ETH"
  );
};

// Para LTC
const calcularValorLTC = () => {
  calcularValorCriptomoneda(
      "https://api.binance.com/api/v3/ticker/price?symbol=LTCUSDT",
      "monto_ltc",
      "mostrar_valorLtc",
      "LTC"
  );
};

// Para BNB
const calcularValorBNB = () => {
  calcularValorCriptomoneda(
      "https://api.binance.com/api/v3/ticker/price?symbol=BNBUSDT",
      "monto_bnb",
      "mostrar_valorBnb",
      "BNB"
  );
};

// Para SOL
const calcularValorSOL = () => {
  calcularValorCriptomoneda(
      "https://api.binance.com/api/v3/ticker/price?symbol=SOLUSDT",
      "monto_sol",
      "mostrar_valorSol",
      "SOL"
  );
};

// Para DOGE
const calcularValorDOGE = () => {
  calcularValorCriptomoneda(
      "https://api.binance.com/api/v3/ticker/price?symbol=DOGEUSDT",
      "monto_doge",
      "mostrar_valorDoge",
      "DOGE"
  );
};

// Para SHIB
const calcularValorSHIB = () => {
  calcularValorCriptomoneda(
      "https://api.binance.com/api/v3/ticker/price?symbol=SHIBUSDT",
      "monto_shib",
      "mostrar_valorShib",
      "SHIB"
  );
};
// Para XRP
const calcularValorXRP = () => {
  calcularValorCriptomoneda(
      "https://api.binance.com/api/v3/ticker/price?symbol=XRPUSDT",
      "monto_xrp",
      "mostrar_valorXrp",
      "XRP"
  );
};  
// PARA ADA
const calcularValorADA = () => {
  calcularValorCriptomoneda(
      "https://api.binance.com/api/v3/ticker/price?symbol=ADAUSDT",
      "monto_ada",
      "mostrar_valorAda",
      "ADA" 
  );  
};

// Para XLM
const calcularValorXLM = () => {
  calcularValorCriptomoneda(
      "https://api.binance.com/api/v3/ticker/price?symbol=XLMUSDT",
      "monto_xlm",
      "mostrar_valorXlm",
      "XLM"
  );
};

// Para AVAX
const calcularValorAVAX = () => {
  calcularValorCriptomoneda(
      "https://api.binance.com/api/v3/ticker/price?symbol=AVAXUSDT",
      "monto_avax",
      "mostrar_valorAvax",
      "AVAX"
  );
};

// Para ATOM
const calcularValorATOM = () => {
  calcularValorCriptomoneda(
      "https://api.binance.com/api/v3/ticker/price?symbol=ATOMUSDT",
      "monto_atom",
      "mostrar_valorAtom",
      "ATOM"
  );
}

function buscarCriptomoneda() {
  // Obtener el valor ingresado por el usuario
  const searchTerm = document.getElementById("searchInput").value.toUpperCase();
  console.log(searchTerm);

  // Recorrer la lista de criptomonedas y mostrar && ocultar las tarjetas según corresponda
  cryptocurrencies.forEach(crypto => {
      const cryptoSymbol = crypto.symbol.toUpperCase();
      const card = document.getElementById(`card-cripto-${cryptoSymbol}`);
      
      if (searchTerm === "") {
          card.style.display = "block";
      } else {
          if (cryptoSymbol === searchTerm || crypto.name.toUpperCase() === searchTerm.toUpperCase()) {
              card.style.display = "block";
          } else {
              card.style.display = "none";
          }
      }
  });
}
document.getElementById("searchInput").addEventListener("input", buscarCriptomoneda);

  // Función para mostrar el alert
  function showAlert(event) {
    event.preventDefault();  // Prevenir el envío del formulario
    Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Your work has been saved",
        showConfirmButton: false,
        timer: 1500
    });

    // Recargar la página después de que la alerta desaparezca
    setTimeout(() => {
        location.reload();
    }, 1500); // El tiempo debe coincidir con el tiempo del timer de SweetAlert2
}

// Agregar evento submit al formulario
document.getElementById("subscriptionForm").addEventListener("submit", showAlert);