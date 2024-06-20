import { useState, useEffect } from 'react';

interface GameOverProps {
  endTime: string;
  currentTime: string;
  onEnd: () => void;
}

const GameOver = ({ endTime, currentTime, onEnd }: GameOverProps) => {
  const calculateTimeLeft = () => {
    const end = new Date(endTime).getTime();
    const now = new Date().getTime();

    const difference = end - now;

    let timeLeft = {
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft();
      setTimeLeft(newTimeLeft);

      if (
        newTimeLeft.minutes === undefined &&
        newTimeLeft.seconds === undefined
      ) {
        clearInterval(timer);
        onEnd();
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [endTime, onEnd]);

  return (
    <div className="flex w-full items-center justify-center h-full flex-col min-h-[300px]">
      <h3 className="text-xl font-semibold">Game Over!</h3>
      <p>Aguarde o próximo turno para jogar.</p>
      {timeLeft.minutes !== undefined && timeLeft.seconds !== undefined ? (
        <div className="mt-10 text-2xl font-semibold">
          <span>{timeLeft.minutes}m </span>
          <span>{timeLeft.seconds}s</span>
        </div>
      ) : (
        <span>Time's up!</span>
      )}
    </div>
  );
};

export default GameOver;
