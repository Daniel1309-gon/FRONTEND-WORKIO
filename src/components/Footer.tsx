import PrivacyPolicy from "./PrivacyPolicy";
import TermsOfService from "./TermsOfService";
import Modal from "react-modal";
import { useState } from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState<React.ReactNode>(undefined);

  const openModal = (content: React.ReactNode) => {
    setModalContent(content);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

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

	  {/* 
	<div>
		<button
                onClick={() => openModal(<PrivacyPolicy />)}
                className="text-sm md:text-base hover:text-rose-200 transition-colors text-white font-bold"
              >
                Política de Privacidad
              </button>
            </Link>

            <Link to="/TermsOfService">
              <button
                onClick={() => openModal(<TermsOfService />)}
                className="text-sm md:text-base hover:text-rose-200 transition-colors text-white font-bold"
              >
                Términos de Nuestro Servicio
              </button>

	<div className="flex flex-col md:flex-row gap-4 md:gap-6 text-center md:text-left">

            <Link to='/PrivacyPolicy'>
              <button
                onClick={() => openModal(<PrivacyPolicy />)}
                className="text-sm md:text-base hover:text-rose-200 transition-colors text-white font-bold"
              >
                Política de Privacidad
              </button>
            </Link>

            <Link to="/TermsOfService">


	 */}

          {/* Enlaces centrados en móviles, alineados a la derecha en pantallas grandes */}
          <div className="flex flex-col md:flex-row gap-4 md:gap-6 text-center md:text-left">

            <Link to='/PrivacyPolicy'>
              <button
                onClick={() => openModal(<PrivacyPolicy />)}
                className="text-sm md:text-base hover:text-rose-200 transition-colors text-white font-bold"
              >
                Política de Privacidad
              </button>
            </Link>

            <Link to="/TermsOfService">
              <button
                onClick={() => openModal(<TermsOfService />)}
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

      {/* Modal */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Información adicional"
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
          content: {
            width: "90%",
            height: "70vh",
            maxHeight: "500px",
            margin: "auto",
            borderRadius: "8px",
            padding: "20px",
            maxWidth: "600px",
          },
        }}
        closeTimeoutMS={0}
      >
        <div className="flex justify-end">
          <button
            onClick={closeModal}
            className="text-gray-400 hover:text-gray-600"
          >
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        {modalContent && modalContent}
      </Modal>
    </div>
  );
};

export default Footer;
