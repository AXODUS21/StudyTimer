"use client";
import { useEffect, useState } from "react";
import { useTimer } from "react-timer-hook";

function MyTimer({ initialMinutes }) {
  const [inputMinutes, setInputMinutes] = useState(initialMinutes);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const time = new Date();
  time.setSeconds(time.getSeconds() + inputMinutes * 60);

  const { seconds, minutes, hours, start, pause, resume, restart } = useTimer({
    expiryTimestamp: time,
    autoStart: false,
    onExpire: () => console.warn("onExpire called"),
    interval: 20,
  });

  const handleRestart = () => {
    const time = new Date();
    time.setSeconds(time.getSeconds() + inputMinutes * 60);
    restart(time, false); 
  };

  const handleStart = () => {
    const time = new Date();
    time.setSeconds(time.getSeconds() + inputMinutes * 60);
    restart(time, true); 
  }

  //DETECTS FULLSCREEN MODE

  useEffect(() => {
    const checkFullscreen = () => {
      const isF11 = window.innerHeight === screen.height;
      const isFullscreenAPI = !!document.fullscreenElement;
      setIsFullscreen(isF11 || isFullscreenAPI);
    };

    window.addEventListener("resize", checkFullscreen);
    document.addEventListener("fullscreenchange", checkFullscreen);
    checkFullscreen();

    return () => {
      window.removeEventListener("resize", checkFullscreen);
      document.removeEventListener("fullscreenchange", checkFullscreen);
    };
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="text-center">
        <p className="text-3xl font-bold">LOCK IN AXELLE</p>
        <div className="text-[400px] font-bold">
          <span>{hours < 10 ? "0" + hours : hours}</span>:
          <span>{minutes < 10 ? "0" + minutes : minutes}</span>:
          <span>{seconds < 10 ? "0" + seconds : seconds}</span>
        </div>

        {!isFullscreen && (  
          <div>
            <div className="space-x-12">
              <button onClick={handleStart} className="bg-green-400 px-5 py-2 rounded-md transition-all active:scale-90 cursor-pointer hover:opacity-90">
                Start
              </button>
              <button
                onClick={pause}
                className="bg-yellow-400 px-5 py-2 rounded-md transition-all active:scale-90 cursor-pointer hover:opacity-90"
              >
                Pause
              </button>
              <button onClick={resume} className="bg-red-400 px-5 py-2 rounded-md transition-all active:scale-90 cursor-pointer hover:opacity-90">
                Resume
              </button>
              <button
                onClick={handleRestart}
                className="bg-gray-400 px-5 py-2 rounded-md transition-all active:scale-90 cursor-pointer hover:opacity-90"
              >
                Restart
              </button>
            </div>

            <div className="mt-5">
              <input
                type="number"
                min={0}
                value={inputMinutes}
                onChange={(e) => setInputMinutes(Number(e.target.value))}
                placeholder="Enter minutes"
                className="bg-white text-black w-[350px] py-2 px-4 rounded-lg"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="select-none">
      <MyTimer initialMinutes={5} />
    </div>
  );
}
