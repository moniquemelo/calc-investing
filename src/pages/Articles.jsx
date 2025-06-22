// import { Link } from 'react-router-dom';

// const createSlug = (title) => {
//   return title
//     .toLowerCase()
//     .replace(/[áàâã]/g, 'a')
//     .replace(/[éè]/g, 'e')
//     .replace(/[íì]/g, 'i')
//     .replace(/[óòõô]/g, 'o')
//     .replace(/[úù]/g, 'u')
//     .replace(/[ç]/g, 'c')
//     .replace(/[^\w\s-]/g, '')
//     .replace(/\s+/g, '-')
//     .replace(/-+/g, '-');
// };

// const Articles = () => {
//   const articles = [
//     {
//       id: 1,
//       title: "O que é Preço Justo e como podemos avalia-lo",
//       description: "Além dos métodos de Bazin, Graham e Lynch conheça outras formas de avaliar o Preço Justo de um ativo.",
//       readTime: "10 min",
//       category: "Iniciantes"
//     },
//     {
//       id: 2,
//       title: "Como calcular o Preço Médio de uma Ação",
//       description: "Se você já começou a investir em ações ou fundos imobiliários, provavelmente ouviu falar sobre “preço médio”. Mas afinal, o que isso significa e como calcular de forma simples?.",
//       readTime: "6 min",
//       category: "Iniciantes"
//     },
//     // {
//     //   id: 3,
//     //   title: "O que é Dividend Yeld e como podemos calcular?",
//     //   description: "Como montar uma carteira diversificada e reduzir riscos.",
//     //   readTime: "12 min",
//     //   category: "Estratégia"
//     // }
//   ];

//   return (
//     <section className="mt-16">
//       <h2 className="text-2xl text-gray-800 font-bold mb-8">Leia Mais</h2>
//       <div className="space-y-4">
//         {articles.map((article) => (
//           <div 
//             key={article.id} 
//             className="flex items-center bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-4"
//           >
//             <div className="flex-grow">
//               <div className="flex items-center mb-2">
//                 <span className="bg-emerald-100 text-emerald-800 text-xs font-medium px-2 py-1 rounded-full mr-3">
//                   {article.category}
//                 </span>
//                 <span className="text-gray-500 text-sm">
//                   {article.readTime} de leitura
//                 </span>
//               </div>
//               <h3 className="text-lg font-semibold text-gray-800 mb-1">
//                 {article.title}
//               </h3>
//               <p className="text-gray-600 text-md">
//                 {article.description}
//               </p>
//             </div>
//             <Link 
//               to={`/${createSlug(article.title)}/${article.id}`}
//               className="ml-4 text-emerald-600 hover:text-emerald-700 transition-colors duration-200"
//             >
//               <svg 
//                 xmlns="http://www.w3.org/2000/svg" 
//                 className="h-6 w-6" 
//                 fill="none" 
//                 viewBox="0 0 24 24" 
//                 stroke="currentColor"
//               >
//                 <path 
//                   strokeLinecap="round" 
//                   strokeLinejoin="round" 
//                   strokeWidth={2} 
//                   d="M14 5l7 7m0 0l-7 7m7-7H3" 
//                 />
//               </svg>
//             </Link>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// };

// export default Articles;


import { Link } from 'react-router-dom';

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

const Articles = () => {
  const articles = [
    {
      id: 1,
      title: "O que é Preço Justo e como podemos avalia-lo",
      description: "Além dos métodos de Bazin, Graham e Lynch conheça outras formas de avaliar o Preço Justo de um ativo.",
      readTime: "10 min",
      category: "Iniciantes"
    },
    {
      id: 2,
      title: "Como calcular o Preço Médio de uma Ação",
      description: "Se você já começou a investir em ações ou fundos imobiliários, provavelmente ouviu falar sobre “preço médio”. Mas afinal, o que isso significa e como calcular de forma simples?.",
      readTime: "6 min",
      category: "Iniciantes"
    },
  ];

  return (
    <section className="mt-16">
      <h2 className="text-2xl text-gray-800 font-bold mb-8">Leia Mais</h2>
      <div className="space-y-4">
        {articles.map((article) => (
          <Link 
            key={article.id}
            to={`/${createSlug(article.title)}/${article.id}`}
            className="flex items-center bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-4 cursor-pointer"
          >
            <div className="flex-grow">
              <div className="flex items-center mb-2">
                <span className="bg-emerald-100 text-emerald-800 text-xs font-medium px-2 py-1 rounded-full mr-3">
                  {article.category}
                </span>
                <span className="text-gray-500 text-sm">
                  {article.readTime} de leitura
                </span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-1">
                {article.title}
              </h3>
              <p className="text-gray-600 text-md">
                {article.description}
              </p>
            </div>
            <div className="ml-4 text-emerald-600 hover:text-emerald-700 transition-colors duration-200">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-6 w-6" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M14 5l7 7m0 0l-7 7m7-7H3" 
                />
              </svg>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Articles;
