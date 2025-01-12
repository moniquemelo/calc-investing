import { useState } from "react";

export default function App() {
  const [averageDividendLastFiveYearsValue, setaverageDividendLastFiveYearsValue] = useState("");
  const [currentTickerPriceValue, setcurrentTickerPriceValue] = useState("");
  const [desiredDYValue, setdesiredDYValue] = useState("");
  const [fairPriceValue, setFairPriceValue] = useState(null);

  const [profitPerShareValue, setProfitPerShareValue] = useState("");
  const [bookValuePerShare, setBookValuePerShare] = useState("");
  const [fairPriceValueGraham, setFairPriceValueGraham] = useState(null);

  const [DYporacao, setDYporacao] = useState("");
  const [crescimentoProjetivo, setCrescimentoProjetivo] = useState("");
  const [precoSobreLucro, setPrecoSobreLucro] = useState("");
  const [fairPriceValuePeter, setFairPriceValuePeter] = useState(null);

  const calculateByBazinMethod = () => {
    const averageDividendLastFiveYears = parseFloat(averageDividendLastFiveYearsValue);
    const currentTickerPrice = parseFloat(currentTickerPriceValue);
    const desiredDY = parseFloat(desiredDYValue);

    if (isNaN(currentTickerPrice)) {
      alert("Por favor, insira o preço da cotação para realizar o cálculo.");
      return;
    }

    if (isNaN(averageDividendLastFiveYears) || isNaN(desiredDY)) {
      alert("Por favor, insira valores válidos.");
      return;
    }

    const fairValue = (currentTickerPrice * averageDividendLastFiveYears / 100) / (desiredDY / 100);
    setFairPriceValue(fairValue);
  };

  const calculateByGrahamMethod = () => {
    const lpa = parseFloat(profitPerShareValue);
    const vpa = parseFloat(bookValuePerShare);

    if (isNaN(lpa) || isNaN(vpa)) {
      alert("Por favor, insira valores válidos para LPA e VPA.");
      return;
    }

    const valorJusto = Math.sqrt(22.5 * lpa * vpa);
    setFairPriceValueGraham(valorJusto);
  };

  const calculateByPeterLynchMethod = () => {
    const averageDividendLastTwentyYears = parseFloat(DYporacao);
    const projectiveGrowth = parseFloat(crescimentoProjetivo);
    const priceOverProfit = parseFloat(precoSobreLucro);

    if (isNaN(averageDividendLastTwentyYears) || isNaN(projectiveGrowth) || isNaN(priceOverProfit)) {
      alert("Por favor, insira valores válidos.");
      return;
    }

    const valorJusto = (averageDividendLastTwentyYears + projectiveGrowth) / priceOverProfit;
    setFairPriceValuePeter(valorJusto);
  };

  const getPeterLynchFeedback = () => {
    if (fairPriceValuePeter === null) return null;

    if (fairPriceValuePeter < 1) {
      return { message: "Ação está cara", bgColor: "bg-red-100", textColor: "text-red-800" };
    } else if (fairPriceValuePeter >= 1 && fairPriceValuePeter < 1.5) {
      return { message: "Preço Justo", bgColor: "bg-yellow-100", textColor: "text-yellow-800" };
    } else if (fairPriceValuePeter >= 1.5 && fairPriceValuePeter <= 2) {
      return { message: "Abaixo do Preço", bgColor: "bg-green-200", textColor: "text-green-800" };
    } else {
      return { message: "Muito Barata", bgColor: "bg-green-400", textColor: "text-green-900" };
    }
  };

  const getBazinBackgroundColor = () => {
    if (fairPriceValue === null) return "";
    return fairPriceValue < parseFloat(currentTickerPriceValue) ? "bg-red-100" : "bg-green-100";
  };

  const getGrahamBackgroundColor = () => {
    if (fairPriceValueGraham === null) return "";
    return fairPriceValueGraham < parseFloat(currentTickerPriceValue) ? "bg-red-100" : "bg-green-100";
  };

  const resetValues = () => {
    setaverageDividendLastFiveYearsValue("");
    setcurrentTickerPriceValue("");
    setdesiredDYValue("");
    setFairPriceValue(null);
    setProfitPerShareValue("");
    setBookValuePerShare("");
    setFairPriceValueGraham(null);
    setDYporacao("");
    setCrescimentoProjetivo("");
    setPrecoSobreLucro("");
    setFairPriceValuePeter(null);
  };

  return (
    <div className="w-full min-h-screen flex flex-col p-6 md:max-w-7xl md:mx-auto">
      <header>
        <h1 className="text-2xl text-center leading-normal font-sans font-bold md:text-4xl md:p-12 md:leading-normal">
          Calculadoras de Investimentos: Bazin, Graham e Lynch - Descubra o <span className="text-emerald-600">Preço Justo</span> dos seus ativos{" "}
        </h1>
      </header>

      <main>
        {/* ========== COTAÇÃO ATUAL INPUT ========= */}
        <section className="flex flex-row gap-12 items-center">
          <div className="mt-12 ml-1">
            <label className="block text-md font-medium">Cotação Atual (R$)</label>
            <input
              type="number"
              value={currentTickerPriceValue}
              onChange={(e) => setcurrentTickerPriceValue(e.target.value)}
              className="w-36 px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
        </section>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {/* ========== MÉTODO BAZIN ========= */}
          <section>
            <div className="p-6 bg-white shadow-lg rounded-lg border-8 min-h-[400px] flex flex-col">
              <h1 className="text-xl font-bold mb-4 text-center">Método de Bazin</h1>
              <div className="space-y-4 flex-grow">
                <div>
                  <label className="block text-md font-medium">DY médio dos últimos 5 anos (%)</label>
                  <input
                    type="number"
                    value={averageDividendLastFiveYearsValue}
                    onChange={(e) => setaverageDividendLastFiveYearsValue(e.target.value)}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                  />
                </div>
                <div>
                  <label className="block text-md font-medium">Quanto deseja receber? (%)</label>
                  <input
                    type="number"
                    value={desiredDYValue}
                    onChange={(e) => setdesiredDYValue(e.target.value)}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                  />
                  <p className="block text-xs font-medium mt-1">Bazin recomenda 6% no mínimo.</p>
                </div>
                {currentTickerPriceValue && (
                  <div className="text-center mt-2">
                    <p className="text-sm font-medium">Cotação Atual: R$ {parseFloat(currentTickerPriceValue).toFixed(2)}</p>
                  </div>
                )}
                
                <div className="flex space-x-4">
                  <button
                    onClick={calculateByBazinMethod}
                    className="flex-1 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                  >
                    Calcular
                  </button>
                  <button
                    onClick={resetValues}
                    className="flex-1 bg-gray-300 text-black px-4 py-2 rounded-md hover:bg-gray-400"
                  >
                    Resetar
                  </button>
                </div> 
                {fairPriceValue !== null && (
                  <div className={`mt-4 p-4 text-center rounded-md ${getBazinBackgroundColor()}`}>
                    <strong>Valor Justo da Ação:</strong> R$ {fairPriceValue.toFixed(2)}
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* ========== MÉTODO GRAHAM ========= */}
          <section>
            <div className="p-6 bg-white shadow-lg rounded-lg border-8 min-h-[400px] flex flex-col">
              <h1 className="text-xl font-bold mb-4 text-center">Método de Graham</h1>
              <div className="space-y-4 flex-grow">
                <div>
                  <label className="block text-md font-medium">LPA - Lucro por Ação (R$)</label>
                  <input
                    type="number"
                    value={profitPerShareValue}
                    onChange={(e) => setProfitPerShareValue(e.target.value)}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                  />
                </div>
                <div>
                  <label className="block text-md font-medium">VPA - Valor Patrimonial por Ação (R$)</label>
                  <input
                    type="number"
                    value={bookValuePerShare}
                    onChange={(e) => setBookValuePerShare(e.target.value)}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                  />
                </div>
                <div className="flex space-x-4">
                  <button
                    onClick={calculateByGrahamMethod}
                    className="flex-1 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                  >
                    Calcular
                  </button>
                  <button
                    onClick={resetValues}
                    className="flex-1 bg-gray-300 text-black px-4 py-2 rounded-md hover:bg-gray-400"
                  >
                    Resetar
                  </button>
                </div>
                {fairPriceValueGraham !== null && (
                  <div className={`mt-4 p-4 text-center rounded-md ${getGrahamBackgroundColor()}`}>
                    <strong>Valor Justo da Ação:</strong> R$ {fairPriceValueGraham.toFixed(2)}
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* ========== MÉTODO PETER LYNCH ========= */}
          <section>
            <div className="p-6 bg-white shadow-lg rounded-lg border-8 min-h-[400px] flex flex-col">
              <h1 className="text-xl font-bold mb-4 text-center">Método de Peter Lynch</h1>
              <div className="space-y-4 flex-grow">
                <div>
                  <label className="block text-md font-medium">DY dos últimos 12 meses (%)</label>
                  <input
                    type="number"
                    value={DYporacao}
                    onChange={(e) => setDYporacao(e.target.value)}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                  />
                </div>
                <div>
                  <label className="block text-md font-medium">Crescimento Projetivo (%)</label>
                  <input
                    type="number"
                    value={crescimentoProjetivo}
                    onChange={(e) => setCrescimentoProjetivo(e.target.value)}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                  />
                </div>
                <div>
                  <label className="block text-md font-medium">Preço sobre Lucro (R$)</label>
                  <input
                    type="number"
                    value={precoSobreLucro}
                    onChange={(e) => setPrecoSobreLucro(e.target.value)}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                  />
                </div>
                <div className="flex space-x-4">
                  <button
                    onClick={calculateByPeterLynchMethod}
                    className="flex-1 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                  >
                    Calcular
                  </button>
                  <button
                    onClick={resetValues}
                    className="flex-1 bg-gray-300 text-black px-4 py-2 rounded-md hover:bg-gray-400"
                  >
                    Resetar
                  </button>
                </div>
                {fairPriceValuePeter !== null && (
                  <div
                    className={`mt-4 p-4 text-center rounded-md ${getPeterLynchFeedback()?.bgColor} ${getPeterLynchFeedback()?.textColor}`}
                  >
                    <strong>{getPeterLynchFeedback()?.message}:</strong> R$ {fairPriceValuePeter.toFixed(2)}
                  </div>
                )}
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
