import zxcvbn from "zxcvbn";

interface PasswordStrengthMeterProps {
  password: string;
}

const PasswordStrengthMeter = ({ password }: PasswordStrengthMeterProps) => {
  const result = zxcvbn(password);
  const strength = result.score;
  const feedback = result.feedback.suggestions;

  // Mensaje predeterminado cuando la contraseña está vacía
  const defaultFeedback = [
    "La contraseña debe tener al menos 6 caracteres.",
    "Usa una combinación de letras, números y símbolos.",
    "Evita usar información personal como tu nombre o fecha de nacimiento.",
  ];

  // Traducimos las sugerencias al español
  const translatedFeedback = feedback.map((suggestion) => {
    switch (suggestion) {
      case "Add another word or two. Uncommon words are better.":
        return "Añade otra palabra o dos. Las palabras poco comunes son mejores.";
      case "Predictable substitutions like '@' instead of 'a' don't help very much.":
        return "Sustituciones predecibles como '@' en lugar de 'a' no ayudan mucho.";
      case "Avoid repeated words and characters":
        return "Evita palabras y caracteres repetidos.";
      case "Capitalization doesn't help very much":
        return "Las mayúsculas no ayudan mucho.";
      case "Avoid sequences":
        return "Evita secuencias comunes (por ejemplo, '1234', 'abcd').";
      case "Avoid recent years":
        return "Evita años recientes (por ejemplo, '2023').";
      case "Avoid common words and patterns":
        return "Evita palabras comunes y patrones predecibles.";
      default:
        return suggestion;
    }
  });

  // Mostramos el feedback traducido o el mensaje predeterminado si la contraseña está vacía
  const finalFeedback = password.length === 0 ? defaultFeedback : translatedFeedback;

  const strengthLabels = ["Muy Débil", "Débil", "Moderada", "Fuerte", "Muy Fuerte"];
  const strengthColors = ["bg-red-500", "bg-orange-500", "bg-yellow-500", "bg-blue-500", "bg-green-500"];

  return (
    <div className="mt-2">
      <div className="w-full bg-gray-200 h-2 rounded">
        <div
          className={`h-2 rounded transition-all duration-300 ${strengthColors[strength]}`}
          style={{ width: `${(strength + 1) * 20}%` }}
        />
      </div>
      <p className="text-sm text-gray-600 mt-1">
        Fortaleza: <span className="font-bold">{strengthLabels[strength]}</span>
      </p>
      {finalFeedback.length > 0 && (
        <ul className="list-disc list-inside text-sm text-gray-600 mt-1">
          {finalFeedback.map((suggestion, index) => (
            <li key={index}>{suggestion}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PasswordStrengthMeter;