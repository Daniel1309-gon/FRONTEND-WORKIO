import { useEffect, useState } from "react";

type ToastProps = {
  message: string;
  type: "SUCCESS" | "ERROR";
  onClose: () => void;
};

const Toast = ({ message, type, onClose }: ToastProps) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Mostrar el toast con efecto de fade-in
    setVisible(true);

    const timer = setTimeout(() => {
      // Iniciar fade-out
      setVisible(false);
      // Llamar a onClose cuando finalice la transición (500ms)
      setTimeout(onClose, 1000);
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, [onClose]);

  const styles = `${
    type === "SUCCESS" ? "bg-green-600" : "bg-red-600"
  } fixed top-20 right-4 z-50 p-4 rounded-md text-white max-w-md 
     transition-opacity duration-500 ${
       visible ? "opacity-100" : "opacity-0"
     }`;

  return (
    <div className={styles}>
      <div className="flex justify-center items-center">
        <span className="text-lg font-semibold">{message}</span>
      </div>
    </div>
  );
};

export default Toast;
