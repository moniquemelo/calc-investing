import { FaCircleArrowLeft } from "react-icons/fa6";
import { useNavigate, useParams } from 'react-router-dom';

const createSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/[áàâã]/g, 'a')
    .replace(/[éè]/g, 'e')
    .replace(/[íì]/g, 'i')
    .replace(/[óòõô]/g, 'o')
    .replace(/[úù]/g, 'u')
    .replace(/[ç]/g, 'c')
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
};

const articles = [
  {
    id: 1,
    title: "O que é Preço Justo e como podemos avalia-lo",
    slug: createSlug("O que é Preço Justo e como podemos avalia-lo"),
    description: "Além dos métodos de Bazin, Graham e Lynch conheça outras formas de avaliar o Preço Justo de um ativo.",
    readTime: "10 min",
    category: "Iniciantes",
    content: `
      <p>Imagine que você está no supermercado comprando uma caixa de morangos. Você olha o preço: R$ 25. A embalagem está bonita, mas você desconfia: será que está valendo esse valor? Aí você abre outra, parecida, por R$ 18. Observa, compara a quantidade, a qualidade, o frescor, e percebe que a de R$ 18 parece até melhor. Neste momento, você está fazendo algo muito parecido com o que um investidor faz no mercado financeiro: <strong>tentando entender o que seria um preço justo</strong>.</p>

      <h2 class="text-2xl font-semibold text-gray-800">O que é o "preço justo"?</h2>
      <p>O preço justo é o valor que um ativo (como uma ação, fundo imobiliário ou até um título de renda fixa) deveria ter com base no seu potencial de gerar lucros, fluxo de caixa, valor intrínseco e outros fatores. Ele não é o preço que está no aplicativo da corretora ou na B3 agora — esse é o <strong>preço de mercado</strong>, que pode estar acima ou abaixo do que o ativo realmente vale.</p>
      <p>Pense no preço justo como o valor <em>real</em>, enquanto o preço de mercado é o valor <em>percebido</em>, que pode ser influenciado por emoção, especulação, notícias ou euforia.</p>

      <p>Saber o preço justo te protege de comprar “morangos” ruins por preço de ouro — ou, em linguagem de investidor, evita que você compre um ativo supervalorizado. Também ajuda a identificar boas oportunidades: ativos que estão "na promoção", ou seja, sendo vendidos por menos do que realmente valem.</p>

      <h2 class="text-2xl font-semibold text-gray-800">Como calcular o preço justo?</h2>
      <p>Existem muitas formas de calcular o preço justo. Algumas envolvem fórmulas matemáticas complexas, mas aqui vamos usar analogias e métodos simples para explicar a lógica por trás disso.</p>

      <h3 class="text-lg font-semibold text-gray-800">1. Fluxo de Caixa Descontado (FCD) — O método da mesada</h3>

      <p>Imagine que você vai dar uma mesada para uma criança: R$ 100 por mês, durante 12 meses. Quanto você estaria disposto a pagar <strong>hoje</strong> para ter direito a receber essa mesada no lugar da criança?</p>
      <p>Provavelmente, você não pagaria R$ 1.200, porque o dinheiro no tempo tem valor diferente. Você aplicaria um desconto, para compensar os riscos e o tempo de espera. Talvez R$ 1.000 pareça justo. Esse é o conceito do <strong>fluxo de caixa descontado</strong>: projetar quanto dinheiro um ativo vai te gerar no futuro e trazer esse valor para o presente com um desconto.</p>

      <h3 class="text-lg font-semibold text-gray-800">2. Múltiplos de mercado — O método da comparação entre imóveis</h3>
      <p>Outra forma mais simples de estimar o preço justo é usar comparações com ativos semelhantes. Funciona como na compra de um imóvel. Você olha um apartamento e pensa: “o do vizinho, com o mesmo tamanho e número de quartos, foi vendido por R$ 300 mil. Então esse aqui, que é igual, também deve valer algo em torno disso”.</p>
      <p>No mercado de ações, os múltiplos mais usados são o <strong>P/L (Preço sobre Lucro)</strong> e o <strong>P/VP (Preço sobre Valor Patrimonial)</strong>. Um exemplo:</p>
      <ul>
        <li>Uma ação custa R$ 20 e a empresa lucra R$ 2 por ação ao ano. O P/L é 10.</li>
        <li>Se empresas do mesmo setor costumam ter P/L de 8, talvez essa ação esteja cara.</li>
        <li>Se o P/L for 5, talvez esteja barata — e aí você pode investigar melhor se o mercado está errando ou se há algum risco envolvido.</li>
      </ul>

      <h3 class="text-lg font-semibold text-gray-800">3. Dividendos esperados — O método do aluguel</h3>
      <p>Imagine que você compra um imóvel por R$ 200 mil e aluga por R$ 1.500/mês. Em um ano, você recebe R$ 18 mil de aluguel. Isso dá um retorno de 9% ao ano. Você pode pensar: "se outro imóvel me dá só 5%, talvez esse aqui esteja com um bom preço".</p>
      <p>Com ações ou fundos imobiliários, o raciocínio é parecido. Você pode calcular quanto o ativo distribui de dividendos por ano e comparar com o preço atual. Essa relação se chama <strong>dividend yield</strong>. Se o ativo está pagando bem, pode ser que esteja abaixo do seu preço justo — desde que os fundamentos da empresa sejam bons.</p>

      <h2 class="text-2xl font-semibold text-gray-800">Conclusão: Preço justo não é adivinhação, é análise</h2>
      <p>Saber o preço justo de um ativo é uma das formas mais poderosas de investir com inteligência. Ele permite que você <strong>invista com base em fundamentos</strong>, e não em modismos ou “dicas quentes”. Claro, nem sempre vamos acertar com exatidão, mas o objetivo é tomar decisões melhores, com base em lógica e dados.</p>
      <p>Assim como você não compraria uma caixa de morangos só pela embalagem bonita, não compre um ativo só porque alguém disse que "vai subir". Analise, compare, veja os números. Com o tempo, seu olhar para o que é justo vai ficar mais afiado — e seus investimentos mais seguros.</p>

    `
  },
  {
    id: 2,
    title: "Como calcular o Preço Médio de uma Ação",
    slug: createSlug("Como calcular o Preço Médio de uma Ação"),
    description: "Analisar apenas os números de um ativo não basta; é essencial também estudar o Relatório Gerencial. Ainda assim, alguns indicadores podem fornecer pistas úteis na hora de analisar um Fundo Imobiliário.",
    readTime: "6 min",
    category: "Iniciantes",
    content: `
      <p>Se você já começou a investir em ações ou fundos imobiliários, provavelmente ouviu falar sobre “preço médio”. Mas afinal, o que isso significa e como calcular de forma simples?</p>

      <h2 class="text-2xl font-semibold text-gray-800">O que é o preço médio?</h2>
      <p>O <strong>preço médio</strong> representa o valor médio que você pagou por uma ação, considerando todas as suas compras. Isso é importante porque ajuda você a saber se está no lucro ou no prejuízo ao comparar com o preço atual do ativo.</p>

      <h2 class="text-2xl font-semibold text-gray-800">Fórmula do preço médio</h2>
      <p>A fórmula é simples:</p>
      <p><strong>Preço médio = (Valor total gasto) ÷ (Quantidade total comprada)</strong></p>

      <h2 class="text-2xl font-semibold text-gray-800">Exemplo prático</h2>
      <p>Imagine que você comprou ações da empresa XPTO em dois momentos diferentes:</p>
      <ul class="list-disc list-inside text-gray-700 mb-6">
        <li>Compra 1: 10 ações a R$ 20 = R$ 200</li>
        <li>Compra 2: 20 ações a R$ 25 = R$ 500</li>
      </ul>
      <p>Agora somamos os valores:</p>
      <p><strong>Total gasto = R$ 200 + R$ 500 = R$ 700</strong></p>
      <p><strong>Total de ações = 10 + 20 = 30</strong></p>
      <p><strong>Preço médio = 700 ÷ 30 = R$ 23,33</strong></p>

      <p>Ou seja, mesmo que o valor da última compra tenha sido R$ 25, seu preço médio está em R$ 23,33. Se a ação estiver valendo mais que isso, você está no lucro.</p>

      <h2 class="text-2xl font-semibold text-gray-800">E se eu vender parte das ações?</h2>
      <p>O preço médio não muda com a venda. Ele só é recalculado quando você faz novas compras. Então, se vender metade das ações, o preço médio permanece o mesmo — ele só vai servir para calcular seu lucro ou prejuízo na venda.</p>

      <h2 class="text-2xl font-semibold text-gray-800">Cuidado com custos e taxas</h2>
      <p>Para um cálculo mais preciso, lembre-se de incluir taxas de corretagem e outras tarifas no valor total gasto. Isso pode afetar o seu preço médio real.</p>

      <h2 class="text-2xl font-semibold text-gray-800">Conclusão</h2>
      <p>Saber o seu preço médio é essencial para entender sua posição no mercado. Com ele, você sabe se está no lucro, quanto pode vender sem prejuízo e como ajustar sua estratégia.</p>
      <p class="text-base text-gray-700">Agora que você entendeu o conceito, que tal revisar sua carteira e fazer esse cálculo? Quanto mais controle você tiver, mais consciente será sua jornada como investidor.</p>
    `
  },
  {
    id: 3,
    title: "O que é Dividend Yeld e como podemos calcular?",
    slug: createSlug("O que é Dividend Yeld e como podemos calcular?"),
    description: "Como montar uma carteira diversificada e reduzir riscos.",
    readTime: "12 min",
    category: "Estratégia",
    content: `
      <h1>Dividend Yield: Entendendo o Conceito</h1>
      <p>O Dividend Yield é uma métrica importante para investidores que buscam renda passiva. Vamos explorar como calculá-lo e o que ele representa.</p>
      
      <h2>Cálculo do Dividend Yield</h2>
      <p>Dividend Yield = (Dividendos por Ação / Preço da Ação) x 100</p>
    `
  }
];

export default function ArticleDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const article = articles.find(a => a.id === parseInt(id));

  if (!article) {
    return <div>Artigo não encontrado</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <button 
        onClick={() => navigate('/')} 
        className="flex items-center text-lg text-emerald-600 hover:text-emerald-700 mb-4"
      >
        <FaCircleArrowLeft className="mr-2" />
        Voltar para artigos
      </button>

      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="flex items-center mb-4">
          <span className="bg-emerald-100 text-emerald-800 text-xs font-medium px-2 py-1 rounded-full mr-3">
            {article.category}
          </span>
          <span className="text-gray-500 text-sm">
            {article.readTime} de leitura
          </span>
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-6">{article.title}</h1>
        <div 
          className="text-lg text-gray-800 flex flex-col gap-4" 
          dangerouslySetInnerHTML={{ __html: article.content }}
        />
      </div>
    </div>
  );
}