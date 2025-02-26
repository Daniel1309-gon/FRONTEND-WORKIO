import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClipboardList,
  faCheckCircle,
  faEnvelope,
  faSyncAlt, // Adaptabilidad
  faEye, // Transparencia
  faBalanceScale, // Responsabilidad
  faUsers, // Colaboración
} from "@fortawesome/free-solid-svg-icons";
import aboutUsImage from "../assets/AcercaDe.png";

const HomePage = () => {
  return (
    <div className="flex flex-col gap-4 w-full max-w-screen overflow-x-hidden">
      {/* Sección de bienvenida */}
      <div className="flex flex-col lg:flex-row items-center gap-8">
        <div className="lg:w-1/2">
          <h1 className="text-4xl font-bold mb-4">
            Bienvenido a Workio: Donde el trabajo fluye mejor
          </h1>
          <div className="flex flex-col items-center p-4 border rounded-lg shadow-md font-raleway bg-[#ffffff] w-full border border-slate-300 shadow-lg rounded-lg p-6 lg:p-8 gap-6 bg-white transition-all duration-300 hover:shadow-2xl hover:border-[#ffe4e6]">
            <p className="text-gray-700 text-lg">
              En Workio, revolucionamos la forma de trabajar al conectar a
              personas con espacios de Coworking diseñados para inspirar{" "}
              <strong>productividad</strong>, <strong>creatividad</strong> y <strong>colaboración</strong>.
              Encuentra el lugar perfecto para concentrarte, hacer crecer tu red y
              alcanzar tus metas, con total flexibilidad y seguridad.
              <br />
              ¿Tienes un coworking? Te ayudamos a destacar, optimizar la gestión
              de reservas y llenar tus espacios sin complicaciones.
            </p>
          </div>
        </div>
        <div className="lg:w-1/2 overflow-hidden">
          <img
            src={aboutUsImage}
            alt="Espacio de coworking"
            className="rounded-lg shadow-lg w-full transition-transform duration-300 hover:scale-110"
          />
        </div>

      </div>

      {/* Sección de Acerca de Nosotros */}
      <div className="mt-16">
        <h2 className="text-3xl font-bold text-center mb-8">
          Acerca de Nosotros
        </h2>

        {/* Sección de la Visión */}
        <div className="w-full bg-gray-100 rounded-lg p-4 mb-4 shadow-md transition-shadow hover:shadow-xl hover:bg-gray-50">
          <h3 className="text-xl font-bold mb-2 text-center">Visión</h3>
          <p className="text-gray-700 text-center md:px-4 lg:px-8">
            Para 2030, seremos la <strong>plataforma líder</strong> en Bogotá, 
            <strong> conectando</strong> personas y emprendedores con 
            <strong> espacios de coworking</strong> que impulsan la 
            <strong> productividad</strong> y fomentan 
            <strong> redes de valor</strong>. Estos espacios están diseñados para
            fomentar la <strong>colaboración activa</strong>, el intercambio de 
            <strong> ideas innovadoras</strong> y la creación de 
            <strong> oportunidades de negocio</strong> significativas.
          </p>
        </div>

        {/* Sección de la Misión */}
        <div className="w-full bg-gray-100 rounded-lg p-4 mb-4 shadow-md transition-shadow hover:shadow-xl hover:bg-gray-50">
          <h3 className="text-xl font-bold mb-2 text-center">Misión</h3>
          <p className="text-gray-700 text-center md:px-4">
            En Workio, <strong>conectamos</strong> personas con <strong>espacios de coworking</strong>{" "} 
            inspiradores a través de una plataforma <strong>intuitiva</strong> que facilita la <strong>búsqueda</strong>,{" "}
            <strong>reserva</strong> y <strong>gestión</strong> de espacios, impulsando su productividad y ampliando sus <strong>oportunidades{" "}
            de crecimiento</strong>.{" "}
            ¡Conéctate, colabora y crece con Workio!
          </p>
        </div>

        {/* Sección de la Propuesta de Valor */}
        <div className="w-full bg-gray-100 rounded-lg p-4 mb-4 shadow-md transition-shadow hover:shadow-xl hover:bg-gray-50">
          <h3 className="text-xl font-bold mb-2 text-center">Propuesta de valor</h3>
          <p className="text-gray-700 text-center md:px-4">
            Workio <strong>conecta</strong> a personas, emprendedores, freelancers y empresas{" "}
            en espacios de coworking flexibles, fomentando la <strong>colaboración</strong> y{" "}
            la generación de <strong>oportunidades de negocio</strong>.
          </p>
        </div>

        {/* Sección de Valores */}
        <div className="w-full bg-gray-100 rounded-lg p-4 mb-4">
          <h3 className="text-xl font-bold mb-2 text-center">Valores</h3>
          <div className="flex flex-col lg:flex-row gap-8 w-full px-4 lg:px-20 w-full bg-gray-100 rounded-lg p-4 mb-4">
            {/* Tarjeta de Pasos */}
            <div className="flex flex-col items-center p-4 border rounded-lg shadow-md font-raleway bg-[#ffffff] w-full lg:w-1/3 border border-slate-300 shadow-lg rounded-lg p-6 lg:p-8 gap-6 bg-white transition-all duration-300 hover:shadow-2xl hover:border-[#ffe4e6]">
              <FontAwesomeIcon
                icon={faSyncAlt}
                size="2x"
                className="mb-2 text-red-500"
              />
              <h3 className="text-xl font-bold">Adaptabilidad</h3>
              <p className="text-center font-raleway mt-2 text-sm md:text-base">
                Espacios flexibles para equipos en movimiento a través de
                reservas personalizadas a tu gusto y necesidades
              </p>
            </div>

            {/* Tarjeta de Requisitos */}
            <div className="flex flex-col items-center p-4 border rounded-lg shadow-md font-raleway bg-[#ffffff] w-full lg:w-1/3 border border-slate-300 shadow-lg rounded-lg p-6 lg:p-8 gap-6 bg-white transition-all duration-300 hover:shadow-2xl hover:border-[#ffe4e6]">
              <FontAwesomeIcon
                icon={faEye}
                size="2x"
                className="mb-2 text-red-500"
              />
              <h3 className="text-xl font-bold">Transparencia</h3>
              <p className="text-center font-raleway mt-2 text-sm md:text-base">
                Claridad y franqueza en la información, precios, términos, políticas de
                acceso y condiciones de usabilidad
              </p>
            </div>

            {/* Tarjeta de Contacto */}
            <div className="flex flex-col items-center p-4 border rounded-lg shadow-md font-raleway bg-[#ffffff] w-full lg:w-1/3 border border-slate-300 shadow-lg rounded-lg p-6 lg:p-8 gap-6 bg-white transition-all duration-300 hover:shadow-2xl hover:border-[#ffe4e6]">
              <FontAwesomeIcon
                icon={faBalanceScale}
                size="2x"
                className="mb-2 text-red-500"
              />
              <h3 className="text-xl font-bold">Responsabilidad</h3>
              <p className="text-center font-raleway mt-2 text-sm md:text-base">
                Garantizar el funcionamiento de la página y el cumplimiento de
                las reservas realizadas de su debida forma
              </p>
            </div>

            {/* Tarjeta de Contacto */}
            <div className="flex flex-col items-center p-4 border rounded-lg shadow-md font-raleway bg-[#ffffff] w-full lg:w-1/3 border border-slate-300 shadow-lg rounded-lg p-6 lg:p-8 gap-6 bg-white transition-all duration-300 hover:shadow-2xl hover:border-[#ffe4e6]">
              <FontAwesomeIcon
                icon={faUsers}
                size="2x"
                className="mb-2 text-red-500"
              />
              <h3 className="text-xl font-bold">Colaboración</h3>
              <p className="text-center font-raleway mt-2 text-sm md:text-base">
                Redes de trabajo y oportunidades de
                crecimiento entre personas que comparten un espacio de Coworking
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Sección de Pasos, Requisitos y Contacto */}
      <div className="flex flex-col items-center mt-6">
        <h2 className="text-3xl font-bold font-raleway mb-8">
          ¿Quieres colocar tu espacio en Workio?
        </h2>
        <div className="flex flex-col lg:flex-row gap-8 w-full px-4 lg:px-20">
          {/* Tarjeta de Pasos */}
          <div className="flex flex-col items-center p-4 border rounded-lg shadow-md font-raleway bg-red-100 w-full lg:w-1/3">
            <FontAwesomeIcon
              icon={faClipboardList}
              size="2x"
              className="mb-2 text-red-500"
            />
            <h3 className="text-xl font-bold">Pasos</h3>
            <p className="text-left font-raleway mt-2 text-sm md:text-base">
              - Regístrate en nuestra plataforma de manera gratuita.
              <br />
              - Completa tu perfil de Workio.
              <br />
              - Verifica tu cuenta.
              <br />
              - Agrega tus Coworkings.
              <br />- ¡Empieza a recibir Reservas!
            </p>
          </div>

          {/* Tarjeta de Requisitos */}
          <div className="flex flex-col items-center p-4 border rounded-lg shadow-md font-raleway bg-red-100 w-full lg:w-1/3">
            <FontAwesomeIcon
              icon={faCheckCircle}
              size="2x"
              className="mb-2 text-red-500"
            />
            <h3 className="text-xl font-bold">Requisitos</h3>
            <p className="text-left mt-2 text-sm md:text-base">
              - Licencia de operación válida.
              <br />
              - Identificación del propietario.
              <br />
              - Descripción, ubicación y fotos.
              <br />
              - Equipo de recepción propio.
              <br />- Cumplimiento con normas sanitarias.
              <br />- Validación de comodidades.
              <br />- Términos y condiciones.
            </p>
          </div>

          {/* Tarjeta de Contacto */}
          <div className="flex flex-col items-center p-4 border rounded-lg shadow-md font-raleway bg-red-100 w-full lg:w-1/3">
            <FontAwesomeIcon
              icon={faEnvelope}
              size="2x"
              className="mb-2 text-red-500"
            />
            <h3 className="text-xl font-bold">Contacto</h3>
            <p className="text-left mt-2 text-sm md:text-base">
              <strong>Email:</strong> equipoworkio@gmail.com
              <br />
              <strong>Soporte:</strong>
            </p>
            <ul className="list-disc pl-5 text-left text-sm md:text-base">
              <li>jujaimesc@unal.edu.co</li>
              <li>dgonzalezca@unal.edu.co</li>
              <li>joalvarado@unal.edu.co</li>
              <li>biro@unal.edu.co</li>
            </ul>
            <p className="text-left mt-2 text-sm md:text-base">
              <strong>Teléfono:</strong> 4659025
              <br />
              <strong>Oficina:</strong> Cra 80D #10C-81
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
