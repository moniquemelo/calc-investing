import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const CookieBanner = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const cookiesAccepted = localStorage.getItem('cookiesAccepted');
    if (!cookiesAccepted) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookiesAccepted', 'true');
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cookiesAccepted', 'false');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    // <div className="fixed bottom-0 left-0 right-0 bg-white text-gray-800 p-4 flex flex-col my-4 mx-auto border-2 md:flex-row justify-between items-center z-50 md:w-1/2">
    //   <p className="text-md text-center md:text-left">
    //     Este site utiliza cookies e outras tecnologias semelhantes para melhorar a sua experiência. Leia nossa{' '}
    //     <Link
    //       to="/politica-de-privacidade"
    //       className="underline text-emerald-600 hover:text-emerald-800"
    //     >
    //       Política de Privacidade
    //     </Link>.
    //   </p>
    //   <div className="flex space-x-4 mt-2 md:mt-0 gap-2">
    //     <button
    //       onClick={handleAccept}
    //       className="bg-transparent border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-200 text-sm font-semibold py-2 px-4 rounded-3xl"
    //     >
    //       Aceitar
    //     </button>
    //     <button
    //       onClick={handleDecline}
    //       className="bg-transparent border-2 border-red-500 text-red-500 hover:bg-red-200 text-sm font-semibold py-2 px-4 rounded-3xl"
    //     >
    //       Recusar
    //     </button>
    //   </div>
    // </div>
    <div className="fixed bottom-0 left-0 right-0 bg-white text-gray-800 p-4 flex flex-col justify-between items-center z-50 mx-4 my-4 border-2 rounded-lg md:flex-row md:w-1/2 md:mx-auto md:my-4">
  <p className="text-sm text-center md:text-left">
    Este site utiliza cookies e outras tecnologias semelhantes para melhorar a sua experiência. Leia nossa{' '}
    <Link
      to="/politica-de-privacidade"
      className="underline text-emerald-600 hover:text-emerald-800"
    >
      Política de Privacidade
    </Link>.
  </p>
  <div className="flex gap-2 p-4">
    <button
      onClick={handleAccept}
      className="bg-transparent border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-200 text-sm font-semibold py-2 px-4 rounded-3xl w-full md:w-auto"
    >
      Aceitar
    </button>
    <button
      onClick={handleDecline}
      className="bg-transparent border-2 border-red-600 text-red-600 hover:bg-red-200 text-sm font-semibold py-2 px-4 rounded-3xl w-full md:w-auto"
      // bg-transparent border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-200 text-sm font-semibold py-2 px-4 rounded-3xl w-full md:w-auto
    >
      Recusar
    </button>
  </div>
</div>

  );  
};

export default CookieBanner;
