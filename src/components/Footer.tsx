import { Link } from "react-router-dom";

const Footer = () => {


  return (
    <div className="bg-rose-500 py-10 px-4 sm:px-6 lg:px-8 max-w-screen">
      <div className="container mx-auto">
        {/* Primera fila: Logo y enlaces */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          {/* Logo alineado a la izquierda en pantallas grandes */}
          <span className="text-2xl md:text-3xl text-white font-bold tracking-tight flex items-center">
            <img src="/logo.svg" alt="Logo" className="w-8 h-8 mr-2" />
            Workio
          </span>

          {/* Enlaces centrados en móviles, alineados a la derecha en pantallas grandes */}
          <div className="flex flex-col md:flex-row gap-4 md:gap-6 text-center md:text-left">

            <Link to='/PrivacyPolicy'>
              <button
                className="text-sm md:text-base hover:text-rose-200 transition-colors text-white font-bold"
              >
                Política de Privacidad
              </button>
            </Link>
            <Link to="/TermsOfService">
              <button
                className="text-sm md:text-base hover:text-rose-200 transition-colors text-white font-bold"
              >
                Términos de Nuestro Servicio
              </button>
            </Link>
          </div>
        </div>

        {/* Segunda fila: Copyright */}
        <div className="border-t border-rose-400 pt-6 text-center">
          <p className="text-white text-sm">
            &copy; {new Date().getFullYear()} Workio. Todos los derechos
            reservados.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
