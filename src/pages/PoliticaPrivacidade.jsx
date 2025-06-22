import { Link } from "react-router-dom";
import { IoArrowBackCircleOutline } from "react-icons/io5";

export default function PoliticaDePrivacidade() {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="flex items-center gap-2">
        <IoArrowBackCircleOutline size={30} />
        <Link to="/">Voltar para a página inicial</Link>
      </div>
      <h1 className="text-2xl font-bold mb-4 mt-20">Política de Privacidade</h1>
      <p className="mb-4">
        Bem-vindo ao Calc Investimentos! A sua privacidade é muito importante para nós, 
        e queremos garantir que você compreenda como tratamos os dados ao usar nosso site.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">1. Informações Coletadas</h2>
      <p className="mb-4">
        O Calc Investimentos não coleta informações pessoais dos usuários. Todas as 
        funcionalidades do site podem ser utilizadas sem fornecer dados como nome, 
        e-mail ou qualquer outra informação identificável.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">2. Cookies e Tecnologias de Rastreamento</h2>
      <p className="mb-4">
        Utilizamos cookies apenas para melhorar a experiência do usuário, como:
      </p>
      <ul className="list-disc ml-8 mb-4">
        <li>
          Analisar o desempenho do site (ex.: número de visitas e páginas acessadas) 
          usando ferramentas como o Google Analytics.
        </li>
        <li>Garantir o funcionamento adequado do site.</li>
      </ul>
      <p className="mb-4">
        Os cookies utilizados não coletam informações pessoais e são anônimos. Você pode 
        desativá-los nas configurações do seu navegador, se preferir.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">3. Compartilhamento de Dados</h2>
      <p className="mb-4">
        Não compartilhamos nenhum tipo de dado com terceiros, pois não coletamos 
        informações pessoais dos usuários.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">4. Links para Sites de Terceiros</h2>
      <p className="mb-4">
        Nosso site pode conter links para outros sites. Não nos responsabilizamos pelas práticas 
        de privacidade de sites de terceiros, e recomendamos que você leia as políticas de 
        privacidade desses sites ao acessá-los.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">5. Segurança</h2>
      <p className="mb-4">
        Embora não armazenemos dados dos usuários, seguimos boas práticas para manter o 
        site seguro e garantir uma navegação tranquila.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">6. Alterações na Política de Privacidade</h2>
      <p className="mb-4">
        Podemos atualizar esta Política de Privacidade ocasionalmente para refletir melhorias no 
        site ou mudanças na legislação aplicável. Recomendamos que você revise este documento 
        periodicamente.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">7. Contato</h2>
      <p className="mb-4">
        Caso tenha dúvidas ou preocupações sobre esta Política de Privacidade, entre em contato 
        conosco pelo e-mail:{" "}
        <a
          href="mailto:contato@calcinvestimentos.com"
          className="text-blue-500 underline"
        >
          contato@calcinvestimentos.com
        </a>.
      </p>
    </div>
  );
}


