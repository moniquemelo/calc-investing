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

  const [rows, setRows] = useState([{ quantity: "", price: "" }]);
  const [averagePrice, setAveragePrice] = useState(0);

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

  const handleInputChange = (index, field, value) => {
    const updatedRows = [...rows];
    updatedRows[index][field] = value;
    setRows(updatedRows);
    calculateAveragePrice(updatedRows);
  };

  const addRow = () => {
    setRows([...rows, { quantity: "", price: "" }]);
  };

  const removeRow = (index) => {
    const updatedRows = rows.filter((_, i) => i !== index);
    setRows(updatedRows);
    calculateAveragePrice(updatedRows);
  };

  const calculateAveragePrice = (rows) => {
    let totalQuantity = 0;
    let totalCost = 0;

    rows.forEach((row) => {
      const quantity = parseFloat(row.quantity) || 0;
      const price = parseFloat(row.price) || 0;

      totalQuantity += quantity;
      totalCost += quantity * price;
    });

    const average = totalQuantity > 0 ? totalCost / totalQuantity : 0;
    setAveragePrice(average);
  };

  return (
    <div className="w-full min-h-screen flex flex-col p-6 md:max-w-7xl md:mx-auto">
      <header className="flex flex-col gap-6">
        <h1 className="text-lg text-center leading-normal font-sans font-bold md:text-3xl md:p-8 md:leading-normal">
          Calculadoras de Investimentos: Bazin, Graham e Lynch e Preço Médio - Descubra o <span className="text-emerald-600">Preço Justo e Preço Médio
            </span> dos seus ativos.
        </h1>
        <p className="text-center text-zinc-900 font-medium leading-normal font-sans mb-10 md:text-lg md:leading-normal md:mb-24">
          O <strong>preço justo</strong> é uma estimativa que revela se uma ação está cara, barata ou no valor ideal. Quando o preço da cotação está abaixo do preço justo, surge uma oportunidade de compra. Aqui, você encontra ferramentas para calcular o preço justo de ações usando métodos consagrados, como Bazin, Graham e Lynch. Além disso, disponibilizamos uma calculadora de preço médio para você simular oportunidades de reduzir seu preço médio e potencializar seus lucros. 
        </p>
      </header>

      <main>
        {/* ========== COTAÇÃO ATUAL INPUT ========= */}
        {/* <section className="flex flex-row items-center"> */}
        <section>
          <div>
            <label className="block text-md font-medium">Cotação Atual (R$)</label>
            <input
              type="number"
              value={currentTickerPriceValue}
              onChange={(e) => setcurrentTickerPriceValue(e.target.value)}
              className="w-36 px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
        </section>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {/* ========== MÉTODO BAZIN ========= */}
          <section>
            <div className="p-4 bg-white shadow-lg rounded-lg border-8 min-h-[380px] flex flex-col">
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
            <div className="p-4 bg-white shadow-lg rounded-lg border-8 min-h-[380px] flex flex-col">
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
            <div className="p-4 bg-white shadow-lg rounded-lg border-8 min-h-[380px] flex flex-col">
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

        <section>
          <div className="p-4 min-h-[380px] flex flex-col gap-2">
            <h1 className="text-xl font-bold mt-10">Décio Bazin (Método de Bazin)</h1>
            <div className="flex flex-col gap-4 text-justify text-zinc-900 font-medium md:text-lg">
              <p className="">Nascido em 1904, em São Paulo, Bazin foi um renomado jornalista econômico e investidor brasileiro. Sua estratégia de investimentos era fortemente baseada nos dividendos, focando em empresas com pelo menos 6% de Dividend Yield (DY), devendo ter boa liquidez.</p>
              
              <p>Para ilustrar, imagine que a ação de uma empresa custa R$ 100,00 e, nos últimos 12 meses, ela pagou R$ 6,00 em dividendos aos seus acionistas. Dividindo os R$ 6,00 pelo preço de R$ 100,00, chegamos a 0,06, ou 6% de DY. Nesse caso, a empresa seria aprovada por Bazin, pois atende a esse critério fundamental de sua estratégia.</p>

              <p><strong>Fórmula</strong>: Valor Justo = Cotação Atual * DY (últimos 5 anos) / DY desejado % </p>

              <p>Embora o foco nos dividendos fosse o coração de sua abordagem, Bazin também considerava mais outros fundamentos estratégicos que complementavam sua visão de investimentos, como:</p>

              <p className="text-gray-500 md:text-xl"><strong>Liquidez</strong></p>
              <p className="text-zinc-900 font-medium md:text-lg">Empresas com boa liquidez, permitindo um bom giro na carteira. Recomenda aquelas cadastradas na bolsa de valores, então empresas menores acabam sendo afetadas.</p>

              <p className="text-gray-500 md:text-xl"><strong>Notícias</strong></p>
              <p className="text-zinc-900 font-medium md:text-lg">Trata-se de um ponto mais "qualitativo" nos critérios de Bazin. Segundo ele, o investidor não deve investir em empresas que estejam envolvidas em escândalos e tenham noticias negativas ao seu respeito. 
              </p>

              <p className="text-gray-500 md:text-xl"><strong>Endividamento</strong></p>
              <p className="text-zinc-900 font-medium md:text-lg">Outro mandamento de Décio Bazin é investir apenas em empresas que possuam "poucas dívidas". Porém, Bazin não especificou exatamente um número que classificaria uma empresa como aceitável.</p>

              <p className="text-gray-500 md:text-xl"><strong>Rebalanceamento</strong></p>
              <p className="text-zinc-900 font-medium md:text-lg">Bazin defende que se uma determina empresa tiver o Dividend Yeld abaixo de 6% por dois semestres seguidos, é melhor deixar a posição.</p>
            </div>
          </div>
        </section>

        <section>
          <div className="p-4 min-h-[380px] flex flex-col gap-2">
            <h1 className="text-xl font-bold mt-10">Benjamin Graham (Método de Graham)</h1>
            <div className="flex flex-col gap-4 text-justify text-zinc-900 font-medium md:text-lg">
              <p className="">Nascido em 1894, em Londres, Graham foi um economista, investidor e autor dos livros  "O Investidor Inteligente" e "Security Analysis". Sua fórmula é baseada no conceito de valor intrínseco, então se uma empresa estivesse sendo negociada abaixo do seu valor íntrinseco, poderia ser uma boa opção de compra.< /p>

              <p><strong>Fórmula</strong>: Valor Intrínseco (VI) = √ (22,5 x LPA x VPA)</p>

              <p>O número 22,5 na Fórmula de Graham advém de expectativas de taxa de crescimento anual esperada de uma empresa e reflita uma avaliação mais realista do preço justo de uma ação.</p>

              <p className="text-zinc-900 font-medium md:text-lg">É importante destacar algumas limitações nas estratégias de Graham. Primeiramente, a constante de 22,5 pode estar ultrapassada, visto que Graham considerou os cálculos para sua época e não necessáriamente reflete o mercado atual. A fórmula utiliza Lucro Por Ação e o Valor Patrimonial, o que pode ser muito simplificado, pois não olha para outros fundamentos importantes ao analisar uma empresa, como endividamento, fluxo de caixa, dividendos, etc. Por fim, entende-se que assim como com outros métodos, sua fórmula é apenas um ponto de partida, pois é extremamente necessário analisar também o qualitativo de uma empresa, como a gestão, as estratégias, a posição no mercado, entre outros.</p>
            </div>
          </div>
        </section>

        <section>
          <div className="p-4 min-h-[380px] flex flex-col gap-2">
            <h1 className="text-xl font-bold mt-10">Peter Lynch (Método de Lynch)</h1>
            <div className="flex flex-col gap-4 text-justify text-zinc-900 font-medium md:text-lg">
              <p className="">Nascido em 1944, em Newton, Peter Lynch se tornou extremamente marcante no mundo dos investimentos. Era formado em história, psicologia e filosofia e administração de empresas. UFA!</p>
              <p>Lynch se fundamentava nos investimentos a longo prazo e em empresas sólidas, para ele, analisar as empresas é mais importante que observar as projeções econômicas e das taxas de juros.</p>
              <p><strong>Fórmula</strong>: Valor justo = (Dividend Yield + Crescimento Projetivo) / Preço sobre Lucro</p>   
              <p>De acordo com o resultado do cálculo acima, temos as classificações abaixo do que Peter entendia como um norte para as estratégias de compra.</p>    
              <table className="table-auto border-collapse border border-gray-400 text-left md:w-1/3">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="border border-gray-400 px-4 py-2">Valor</th>
                    <th className="border border-gray-400 px-4 py-2">Classificação</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-400 px-4 py-2">Abaixo de 1</td>
                    <td className="border border-gray-400 px-4 py-2">Caro</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-400 px-4 py-2">Entre 1 e 1.5</td>
                    <td className="border border-gray-400 px-4 py-2">Valor Justo</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-400 px-4 py-2">Entre 1.5 e 2</td>
                    <td className="border border-gray-400 px-4 py-2">Abaixo do Preço</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-400 px-4 py-2">Acima de 2</td>
                    <td className="border border-gray-400 px-4 py-2">Barato</td>
                  </tr>
                </tbody>
              </table>
    
              <p>Algumas lemas de Peter Lynch:</p>
              <p>"Adote uma mentalidade contrarian e não tenha medo de ir contra a multidão."</p>
              <p>"Exerça paciência e mantenha uma perspectiva de longo prazo."</p>
              <p>"Mantenha a disciplina e adira ao seu plano de investimento, mesmo durante a volatilidade do mercado."</p>
            </div>
          </div>
        </section>
        
        {/* <h2 className="font-bold text-md py-2 max-w-80 mb-4 mt-8 md:text-2xl">Preço Médio</h2>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">          
          {/* ========== PREÇO MÉDIO ========= 
          <section>
            <div className="p-4 bg-white shadow-lg rounded-lg border-8 min-h-[400px] flex flex-col">
              <h1 className="text-xl font-bold mb-4 text-center">Preço médio ao comprar ações</h1>
              <div className="space-y-4 flex-grow">
                {rows.map((row, index) => (
                  <div key={index} className="flex items-center gap-4 mb-2">
                    <div className="flex flex-col w-1/3">
                      <label className="block text-sm font-medium">Quantidade</label>
                      <input
                        type="number"
                        value={row.quantity}
                        onChange={(e) => handleInputChange(index, "quantity", e.target.value)}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                      />
                    </div>
                    <div className="flex flex-col w-1/3">
                      <label className="block text-sm font-medium">Cotação</label>
                      <input
                        type="number"
                        value={row.price}
                        onChange={(e) => handleInputChange(index, "price", e.target.value)}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                      />
                    </div>
                    <div className="flex flex-col w-1/3">
                      <p className="mt-4 text-gray-700">
                        {(parseFloat(row.quantity) * parseFloat(row.price) || 0).toFixed(2)}
                      </p>
                    </div>

                    <button onClick={() => removeRow(index)}>
                      <FaTrashCan className="text-red-500 text-2xl mt-4 md:text-2xl" />
                    </button>
                    
                  </div>
              ))}
              <button onClick={addRow}>
                <FaRegPlusSquare className="text-blue-500 text-2xl md:text-3xl"/>
              </button>
              <div className="mt-4 p-4 bg-emerald-200 rounded-md text-center">
                <strong>Preço Médio:</strong> R$ {averagePrice.toFixed(2)}
              </div>
            </div>
          </div>
          </section>
        </div> */}
        {/* </div> */}
      </main>
    </div>
  );
}

