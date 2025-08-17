// src/components/ProtectedImage.js
import React, { useState, useEffect } from 'react';

const ProtectedImage = ({ src, alt }) => {
  // 1. Estado para guardar el aspect ratio calculado. Empieza en null.
  const [aspectRatio, setAspectRatio] = useState(null);

  // 2. Usamos useEffect para cargar la imagen en segundo plano cuando el 'src' cambie.
  useEffect(() => {
    // Creamos un objeto de imagen en memoria
    const img = new Image();
    img.src = src;

    // Cuando la imagen termine de cargar, se ejecuta esta función
    img.onload = () => {
      // Calculamos la relación de aspecto y la guardamos en el estado
      setAspectRatio(img.naturalWidth / img.naturalHeight);
    };

    // Función de limpieza para evitar errores si el componente se desmonta antes de que la imagen cargue
    return () => {
      img.onload = null;
    };
  }, [src]); // Este efecto depende del 'src', si cambia, se vuelve a ejecutar

  const preventContextMenu = (e) => e.preventDefault();
  const preventDragStart = (e) => e.preventDefault();

  // 3. Mientras calculamos el aspect ratio, no mostramos nada (o un 'loader')
  if (!aspectRatio) {
    // Podríamos devolver un placeholder de carga aquí si quisiéramos
    return null;
  }

  // 4. Una vez tenemos el aspect ratio, lo aplicamos al estilo del div
  const styles = {
    // Aplicamos el aspect-ratio dinámico
    aspectRatio: aspectRatio, 
    backgroundImage: `url(${src})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    width: '100%',
    userSelect: 'none',
    pointerEvents: 'none',
  };

  return (
    <div
      style={styles}
      role="img"
      aria-label={alt}
      onContextMenu={preventContextMenu}
      onDragStart={preventDragStart}
    />
  );
};

export default ProtectedImage;