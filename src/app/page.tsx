'use client'
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { JSX, SVGProps } from "react";

export default function Component() {
  const [timers, setTimers] = useState([
    { id: 1, name: "Toastmaster", time: 0, active: false, minTime: 180, medTime: 240, maxTime: 300 },
    { id: 2, name: "Muletillas", time: 0, active: false, minTime: 60, medTime: 90, maxTime: 120 },
    { id: 3, name: "Cronometrador", time: 0, active: false, minTime: 60, medTime: 90, maxTime: 120 },

    { id: 4, name: "Charla 1", time: 0, active: false, minTime: 300, medTime: 360, maxTime: 420 },
    { id: 5, name: "Charla 2", time: 0, active: false, minTime: 300, medTime: 360, maxTime: 420 },
    { id: 6, name: "Charla 3", time: 0, active: false, minTime: 300, medTime: 360, maxTime: 420 },

    { id: 7, name: "Presentador improvisadas", time: 0, active: false, minTime: 60, medTime: 90, maxTime: 120 },
    { id: 8, name: "Improvisada 1", time: 0, active: false, minTime: 120, medTime: 150, maxTime: 180 },
    { id: 9, name: "Improvisada 2", time: 0, active: false, minTime: 120, medTime: 150, maxTime: 180 },
    { id: 10, name: "Improvisada 3", time: 0, active: false, minTime: 120, medTime: 150, maxTime: 180 },

    { id: 11, name: "Evaluador 1", time: 0, active: false, minTime: 60, medTime: 90, maxTime: 120 },
    { id: 12, name: "Evaluador 2", time: 0, active: false, minTime: 60, medTime: 90, maxTime: 120 },
    { id: 13, name: "Evaluador 3", time: 0, active: false, minTime: 60, medTime: 90, maxTime: 120 },
    { id: 14, name: "Evaluador General", time: 0, active: false, minTime: 120, medTime: 180, maxTime: 240 },

  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimers((prevTimers) =>
        prevTimers.map((timer) =>
          timer.active ? { ...timer, time: timer.time + 1 } : timer
        )
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handlePlay = (id: number) => {
    setTimers((prevTimers) =>
      prevTimers.map((timer) =>
        timer.id === id
          ? { ...timer, active: true }
          : { ...timer, active: false }
      )
    );
  };

  const handlePause = (id: number) => {
    setTimers((prevTimers) =>
      prevTimers.map((timer) =>
        timer.id === id ? { ...timer, active: false } : timer
      )
    );
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-6 sm:p-8 md:p-10">
      <div className="grid gap-6">
        {timers.map(({ id, name, time, active, minTime, medTime, maxTime }) => (
          <div key={id} className="grid grid-cols-[1fr_auto] items-center gap-4">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={() => active ? handlePause(id) : handlePlay(id)}>
                {active ? <PauseIcon className="h-5 w-5" /> : <PlayIcon className="h-5 w-5" />}
              </Button>
              <div>
                <h3 className="text-lg font-medium">{name}</h3>
                <p className="text-muted-foreground text-sm">{formatTime(time)}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className={`rounded-full bg-green-500 ${time >= minTime ? 'w-6 h-6 animate-pulse' : 'w-3 h-3'}`} />
              <div className={`rounded-full bg-yellow-500 ${time >= medTime ? 'w-6 h-6 animate-pulse' : 'w-3 h-3'}`} />
              <div className={`rounded-full bg-red-500 ${time >= maxTime ? 'w-6 h-6 animate-pulse' : 'w-3 h-3'}`} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PauseIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="14" y="4" width="4" height="16" rx="1" />
      <rect x="6" y="4" width="4" height="16" rx="1" />
    </svg>
  );
}

function PlayIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="6 3 20 12 6 21 6 3" />
    </svg>
  );
}
