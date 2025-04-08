import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

export default function PomodoroTimer() {
  const [secondsLeft, setSecondsLeft] = useState(1500); // 25 mins
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timer;
    if (isRunning && secondsLeft > 0) {
      timer = setInterval(() => {
        setSecondsLeft((prev) => prev - 1);
      }, 1000);
    } else {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [isRunning, secondsLeft]);

  const start = () => setIsRunning(true);
  const pause = () => setIsRunning(false);
  const reset = () => {
    setIsRunning(false);
    setSecondsLeft(1500);
  };

  return (
    <div className="max-w-sm mx-auto space-y-4">
      <Progress value={(secondsLeft / 1500) * 100} />
      <div className="text-center text-2xl font-semibold">
        {Math.floor(secondsLeft / 60)}:{("0" + (secondsLeft % 60)).slice(-2)}
      </div>
      <div className="flex gap-2 justify-center">
        <Button onClick={start}>Start</Button>
        <Button onClick={pause}>Pause</Button>
        <Button onClick={reset}>Reset</Button>
      </div>
    </div>
  );
}

