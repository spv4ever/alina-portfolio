// src/components/CountdownTimer.js

import React, { useState, useEffect } from 'react';

const CountdownTimer = () => {
  const calculateTimeLeft = () => {
    // 1. Obtenemos la fecha y hora actual
    const now = new Date();

    // 2. Creamos nuestro objetivo: las 21:00:00 UTC de HOY.
    const target = new Date();
    target.setUTCHours(21, 0, 0, 0); // Establece la hora a las 21:00:00 UTC

    // 3. Comparamos. Si la hora actual ya pasó las 21:00 UTC de hoy...
    if (now.getTime() > target.getTime()) {
      // ...entonces nuestro objetivo deben ser las 21:00 UTC de MAÑANA.
      // Para ello, simplemente añadimos un día a nuestra fecha objetivo.
      target.setUTCDate(target.getUTCDate() + 1);
    }

    // 4. Calculamos la diferencia entre el objetivo y ahora. El resto es igual.
    const difference = target.getTime() - now.getTime();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        hours: Math.floor(difference / (1000 * 60 * 60)),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    } else {
      timeLeft = { hours: 0, minutes: 0, seconds: 0 };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (time) => {
    return String(time).padStart(2, '0');
  };

  return (
    <div className="countdown-container">
      <h3 className="countdown-text">More content coming soon</h3>
      <div className="countdown-timer">
        <span>{formatTime(timeLeft.hours)}</span>:
        <span>{formatTime(timeLeft.minutes)}</span>:
        <span>{formatTime(timeLeft.seconds)}</span>
      </div>
    </div>
  );
};

export default CountdownTimer;