'use client'
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Pause, Play } from "lucide-react";

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
          <div key={id} className="bg-gray-200 rounded-lg p-4">
            <div className="grid grid-cols-[1fr_auto] items-center gap-4">
              <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" onClick={() => active ? handlePause(id) : handlePlay(id)}>
                  {active ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                </Button>
                <div>
                  <h3 className="text-lg font-medium">{name}</h3>
                  <p className="text-muted-foreground text-sm">{formatTime(time)}</p>

                  <div className="flex flex-wrap lg:flex-nowrap gap-2 mt-2">
                    <Badge className="cursor-pointer hover:bg-green-400 rounded-sm bg-green-500" variant="secondary">Min: {formatTime(minTime)}</Badge>
                    <Badge className="cursor-pointer hover:bg-yellow-400 rounded-sm bg-yellow-500" variant="secondary">Med: {formatTime(medTime)}</Badge>
                    <Badge className="cursor-pointer hover:bg-red-400 rounded-sm bg-red-500" variant="secondary">Max: {formatTime(maxTime)}</Badge>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className={`rounded-full bg-green-500 ${time >= minTime ? 'w-4 h-4 animate-pulse' : 'w-3 h-3'}`} />
                <div className={`rounded-full bg-yellow-500 ${time >= medTime ? 'w-4 h-4 animate-pulse' : 'w-3 h-3'}`} />
                <div className={`rounded-full bg-red-500 ${time >= maxTime ? 'w-4 h-4 animate-pulse' : 'w-3 h-3'}`} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}