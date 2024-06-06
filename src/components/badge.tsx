import React from 'react';

interface BadgeProps {
  label: string; // Texto que se mostrará en la badge
}

const Badge: React.FC<BadgeProps> = ({ label }) => {
  // Función para determinar el color de fondo y el color del texto basado en la etiqueta
  const getBadgeColors = (label: string) => {
    switch (label) {
      case 'Optional':
      case 'In Process':
      case 'Pending':
        return { backgroundColor: 'bg-yellow-100', textColor: 'text-yellow-800' };
      case 'Complete':
        return { backgroundColor: 'bg-green-100', textColor: 'text-green-800' };
      case 'Mandatory':
      case 'Cancelled':
        return { backgroundColor: 'bg-red-100', textColor: 'text-red-800' };
      default:
        return { backgroundColor: 'bg-gray-100', textColor: 'text-gray-800' }; // Color por defecto para etiquetas desconocidas
    }
  };

  // Obtiene los colores de la badge basado en la etiqueta
  const { backgroundColor, textColor } = getBadgeColors(label);

  return (
    <span className={`${backgroundColor} ${textColor} text-xs font-medium me-2 px-2.5 py-0.5 rounded-full`}>
      {label}
    </span>
  );
};

export default Badge;
