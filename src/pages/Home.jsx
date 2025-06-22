/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import { FaTrashCan } from "react-icons/fa6";
import { Link } from "react-router-dom";
import CookieBanner from "../components/CookieBanner";
import TabButton from "../components/TabButton";
import Articles from "./Articles";


export default function Home() {
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

  const [activeTab, setActiveTab] = useState('fairPrice');

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
          Calculadoras de Investimentos: Bazin, Graham e Lynch e Preço Médio - Descubra o <span className="text-emerald-600">Preço Teto</span>, <span className="text-emerald-600">Preço Justo</span> e <span className="text-emerald-600">Preço Médio</span> dos seus ativos.
        </h1>
        <p className="text-center text-zinc-900 leading-normal font-sans mb-10 md:text-lg md:leading-normal md:mb-24">
          O <strong>preço justo</strong> é uma estimativa que revela se uma ação está cara, barata ou no valor ideal. Quando o preço da cotação está abaixo do preço justo, surge uma oportunidade de compra. Aqui, você encontra ferramentas para calcular o preço justo de ações usando métodos consagrados, como Bazin, Graham e Lynch. Além disso, disponibilizamos uma calculadora de preço médio para você simular oportunidades de reduzir seu preço médio e potencializar seus lucros. 
        </p>
      </header>

      <main>
        <div className="mt-6 border-b border-gray-200">
          <div className="flex space-x-4">
            <TabButton 
              active={activeTab === 'fairPrice'} 
              onClick={() => setActiveTab('fairPrice')}
            >
              Preço Justo
            </TabButton>
            <TabButton 
              active={activeTab === 'averagePrice'} 
              onClick={() => setActiveTab('averagePrice')}
            >
              Preço Médio
            </TabButton>
          </div>
        </div>

        {/* ========== TAB DE PREÇO JUSTO ========= */}
        <div className="mt-6">
          {activeTab === 'fairPrice' && (
            <div>
              {/* ========== COTAÇÃO ATUAL INPUT ========= */}
              <section>
                <div>
                  <label htmlFor="cotacao" className="block text-md font-medium">Cotação Atual (R$)</label>
                  <input
                    id="cotacao"
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
                        <label htmlFor="DYmedio5anos" className="block text-md font-medium">DY médio dos últimos 5 anos (%)</label>
                        <input
                          id="DYmedio5anos"
                          type="number"
                          value={averageDividendLastFiveYearsValue}
                          onChange={(e) => setaverageDividendLastFiveYearsValue(e.target.value)}
                          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                        />
                      </div>
                      <div>
                        <label htmlFor="Dividendodesejado" className="block text-md font-medium">Quanto deseja receber? (%)</label>
                        <input
                          id="Dividendodesejado"
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
                        <label htmlFor="lpa" className="block text-md font-medium">LPA - Lucro por Ação (R$)</label>
                        <input
                          id="lpa"
                          type="number"
                          value={profitPerShareValue}
                          onChange={(e) => setProfitPerShareValue(e.target.value)}
                          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                        />
                      </div>
                      <div>
                        <label htmlFor="vpa" className="block text-md font-medium">VPA - Valor Patrimonial por Ação (R$)</label>
                        <input
                          id="vpa"
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
                        <label htmlFor="DY12meses" className="block text-md font-medium">DY dos últimos 12 meses (%)</label>
                        <input
                          id="DY12meses"
                          type="number"
                          value={DYporacao}
                          onChange={(e) => setDYporacao(e.target.value)}
                          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                        />
                      </div>
                      <div>
                        <label htmlFor="crescimento-projetivo" className="block text-md font-medium">Crescimento Projetivo (%)</label>
                        <input
                          id="crescimento-projetivo"
                          type="number"
                          value={crescimentoProjetivo}
                          onChange={(e) => setCrescimentoProjetivo(e.target.value)}
                          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                        />
                      </div>
                      <div>
                        <label htmlFor="preco-sobre-lucro" className="block text-md font-medium">Preço sobre Lucro (R$)</label>
                        <input
                          id="preco-sobre-lucro"
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
                  <h2 className="text-2xl text-gray-800 font-bold mt-10">Como funciona o Método de Bazin?</h2>
                  <div className="flex flex-col gap-4 text-zinc-900 md:text-lg">
                    <p>Nascido em 1904, em São Paulo, Bazin foi um renomado jornalista econômico e investidor brasileiro. Sua estratégia de investimentos era fortemente baseada nos dividendos, focando em empresas com pelo menos 6% de Dividend Yield (DY), devendo ter boa liquidez.</p>
                    
                    <p>Para ilustrar, imagine que a ação de uma empresa custa R$ 100,00 e, nos últimos 12 meses, ela pagou R$ 6,00 em dividendos aos seus acionistas. Dividindo os R$ 6,00 pelo preço de R$ 100,00, chegamos a 0,06, ou 6% de DY. Nesse caso, a empresa seria aprovada por Bazin, pois atende a esse critério fundamental de sua estratégia.</p>

                    <p>A <strong>fórmula</strong> utilizada para calcular o método de Bazin é bem simples:</p>
                    <p className="text-center"><strong>Preço Teto</strong> = Cotação Atual * DY (últimos 5 anos) / DY desejado %. </p>
                    <p>Você pode praticar na calculadora o seguinte exemplo prático: imagine que você comprou 50 cotas de um determinado ativo ao preço de 25,00 e o Dividend Yeld desse ativo foi de 12% nos últimos 5 anos e o valor que você deseja receber é 8%.</p>
                    <p>Então ficaria: 25  * 12%  / 8%, resultado em um <strong>Preço Teto de R$ 37,50</strong>, ou seja, o valor de 25,00 é considerado barato, visto que você tem até 37,50 como valor de referência do preço justo para obter os rendimentos desejados.</p>

                    {/* <p className="text-xl font-bold mt-6">Outros fundamentos:</p>
                    <p>Embora o foco nos dividendos fosse o coração de sua abordagem, Bazin também considerava mais outros fundamentos estratégicos que complementavam sua visão de investimentos, como:</p>

                    <ul className="list-disc list-inside">
                      <li className="mb-4 text-zinc-900 md:text-lg">
                        <strong>Liquidez:</strong> Empresas com boa liquidez, permitindo um bom giro na carteira. Recomenda aquelas cadastradas na bolsa de valores, então empresas menores acabam sendo afetadas.
                      </li>
                      <li className="mb-4 text-zinc-900 md:text-lg">
                        <strong>Notícias:</strong> Trata-se de um ponto mais "qualitativo" nos critérios de Bazin. Segundo ele, o investidor não deve investir em empresas que estejam envolvidas em escândalos e tenham notícias negativas ao seu respeito.
                      </li>
                      <li className="mb-4 text-zinc-900 md:text-lg">
                        <strong>Endividamento:</strong> Outro mandamento de Décio Bazin é investir apenas em empresas que possuam "poucas dívidas". Porém, Bazin não especificou exatamente um número que classificaria uma empresa como aceitável.
                      </li>
                      <li className="mb-4 text-zinc-900 md:text-lg">
                        <strong>Rebalanceamento:</strong> Bazin defende que se uma determinada empresa tiver o Dividend Yeld abaixo de 6% por dois semestres seguidos, é melhor deixar a posição.
                      </li>
                    </ul> */}




                  </div>
                </div>
              </section>

              <section>
                <div className="p-4 min-h-[380px] flex flex-col gap-2">
                  <h2 className="text-2xl text-gray-800 font-bold mt-10">Como funciona o Método de Graham?</h2>
                  <div className="flex flex-col gap-4 text-justify text-zinc-900 md:text-lg">
                    <p>Nascido em 1894, em Londres, Graham foi um economista, investidor e autor dos livros  "O Investidor Inteligente" e "Security Analysis". Sua abordagem parte do princípio de que, se uma empresa estiver sendo negociada abaixo de seu valor intrínseco, ela pode representar uma oportunidade atrativa de compra.</p>
                    
                    <p>A <strong>fórmula</strong> utilizada para calcular o método de Graham é bem simples:</p>
                    <p className="text-center"><strong>Valor Intrínseco (VI)</strong> = √ (22,5 x LPA x VPA)</p>

                    <p>O número 22,5 na Fórmula de Graham advém de expectativas de taxa de crescimento anual esperada de uma empresa e reflita uma avaliação mais realista do preço justo de uma ação.</p>

                    <p>É importante destacar algumas limitações nas estratégias de Graham. Primeiramente, a constante de 22,5 pode estar ultrapassada, visto que Graham considerou os cálculos para sua época e não necessáriamente reflete o mercado atual. A fórmula utiliza Lucro Por Ação e o Valor Patrimonial, o que pode ser muito simplificado, pois não olha para outros fundamentos importantes ao analisar uma empresa, como endividamento, fluxo de caixa, dividendos, etc. Por fim, entende-se que assim como com outros métodos, sua fórmula é apenas um ponto de partida, pois é extremamente necessário analisar também o qualitativo de uma empresa, como a gestão, as estratégias, a posição no mercado, entre outros.</p>
                  </div>
                </div>
              </section>

              <section>
                <div className="p-4 min-h-[380px] flex flex-col gap-2">
                <h2 className="text-2xl text-gray-800 font-bold mt-10">Como funciona o Método de Peter Lynch?</h2>
                  <div className="flex flex-col gap-4 text-justify text-zinc-900 md:text-lg">
                    <p className="">Nascido em 1944, em Newton, Peter Lynch se tornou extremamente marcante no mundo dos investimentos. Era formado em história, psicologia e filosofia e administração de empresas. Lynch se fundamentava nos investimentos a longo prazo e em empresas sólidas, para ele, analisar as empresas é mais importante que observar as projeções econômicas e das taxas de juros.</p>
                    <p className="text-xl font-bold mt-6">Alguns lemas de Lynch:</p>
                    <p>"Todo mundo tem a inteligência necessária para investir no mercado de ações. O que falta é disciplina."</p>
                    <p>"Saber por que você possui uma ação é a metade do caminho para decidir quando vendê-la."</p>
                    <p>"Conheça a história por trás da ação. Se você não consegue explicar em 10 minutos por que é um bom investimento, não compre."</p>

                    <p>A <strong>fórmula</strong> utilizada para calcular o método de Graham é bem simples:</p>
                    <p className="text-center"><strong>Valor justo</strong> = (Dividend Yield + Crescimento Projetivo) / Preço sobre Lucro</p>   
                    <p>De acordo com o resultado do cálculo acima, temos as classificações abaixo do que Peter entendia como um norte para as estratégias de compra.</p>    
                    <table className="table-auto text-center border-collapse border border-gray-400 md:w-1/3">
                      <thead>
                        <tr className="bg-gray-200">
                          <th className="border border-gray-400 px-4 py-2">Resultado</th>
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
                  </div>
                </div>
              </section>
            </div>
          )}

          {/* ========== TAB DE PREÇO MÉDIO ========= */}
          {activeTab === 'averagePrice' && (
            <div>
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">          
                <section>
                  <div className="p-4 bg-white shadow-lg rounded-lg border-8 min-h-[400px] flex flex-col">
                    <div className="space-y-4 flex-grow">
                      <h1 className="text-xl font-bold mb-4 text-center">Calculadora de Preço Médio</h1>
                      {rows.map((row, index) => (
                        <div key={index} className="flex items-center gap-2 mb-2">
                          <div className="flex flex-col w-1/3">
                            <label className="block text-md font-medium">
                              <span className="block md:hidden">Qtd</span>
                              <span className="hidden md:block">Quantidade</span>
                            </label>
                            <input
                              type="number"
                              value={row.quantity}
                              onChange={(e) => handleInputChange(index, "quantity", e.target.value)}
                              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300 text-sm md:text-md"
                            />
                          </div>

                          <div className="flex flex-col w-1/3">
                            <label htmlFor="valor" className="block text-md font-medium">Valor</label>
                            <input
                              id="valor"
                              type="number"
                              value={row.price}
                              onChange={(e) => handleInputChange(index, "price", e.target.value)}
                              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300 text-sm md:text-md"
                            />
                          </div>
                          <div className="flex flex-col w-1/3">
                            <p className="mt-6 text-gray-700 block font-medium text-sm md:text-md">
                              R$ {(parseFloat(row.quantity) * parseFloat(row.price) || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </p>
                          </div>

                          <button onClick={() => removeRow(index)}>
                            <FaTrashCan className="text-red-500 text-2xl mt-4 md:text-2xl" />
                          </button>
                          
                        </div>
                    ))}
                    <button
                      onClick={addRow}
                      className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 transition text-md font-medium"
                    >
                    Adicionar
                    </button>
                    <div className="mt-6 p-4 bg-emerald-200 rounded-md text-center">
                      <p className="text-md md:text-lg"><strong>Preço Médio:</strong> R$ {averagePrice.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                    </div>
                  </div>
                  </div>
                </section>
              </div>
              <div className="flex flex-col gap-4 text-justify text-zinc-900 md:text-lg mt-10">
                <h2 className="text-2xl text-gray-800 font-bold mt-10">Como funciona a calculadora de Preço Médio?</h2>
                <p>O <strong>preço médio</strong> nos investimentos é o valor médio ponderado das ações adquiridas ao longo do tempo, levando em consideração a quantidade comprada e o preço pago em cada operação. Por exemplo, se você comprou 10 cotas de uma determinada ação a R$ 10,00 e, mais tarde, comprou outras 20 cotas a R$ 12,00, o seu preço médio será calculado levando em conta tanto o valor das compras quanto as quantidades adquiridas.</p>
                <p>O cálculo seria feito da seguinte forma:</p>
                <p className="text-center"><strong>Preço Médio</strong> = (Quantidade * Valor) / Quantidade Total</p>   
                <p>Para ilustrar usando o exemplo citado acima, então ficaria: <strong>Preço Médio</strong> =  10 * R$ 10,00 + 20 * R$ 12,00, logo 100 + 240 = 340, então divide os 340 pelo total de cotas que é 30, resultando em 11,33 de preço médio. Você pode testar na calculadora acima esse exemplo.</p> 
                <p>Ao monitorar de forma contínua o preço médio dos seus ativos, é possível prever oportunidades de diminuir o preço médio atual que você tenha de algum ativo se o preço da cotação estiver abaixo do seu preço médio. Por outro lado, se a cotação atual estiver bem acima, você pode buscar outras oportunidades.</p>   
              </div>
            </div>
          )}
        </div>
      </main>
      < CookieBanner />
      <Articles />
      <footer className="p-4 mt-32 text-center">
        <hr className="mb-2"/>
        <Link to="/politica-de-privacidade" className="list-disc hover:text-emerald-700">Política de Privacidade</Link>
      </footer>
    </div>   
  );
}


