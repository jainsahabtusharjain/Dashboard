import React, { useEffect, useState } from "react";
import "../../styles/dashboardapp.scss"; // import products.scss
import "../../styles/app.scss"; // import app.scss
import AdminSidebar from "../../components/AdminSidebar";

const formatTime = (timeInSeconds: number) => {
  const hours = Math.floor(timeInSeconds / 3600);
  const minutes = Math.floor((timeInSeconds % 3600) / 60);
  const seconds = timeInSeconds % 60;

  const hoursInString = hours.toString().padStart(2, "0");
  const minutesInString = minutes.toString().padStart(2, "0");
  const secondsInString = seconds.toString().padStart(2, "0");

  return `${hoursInString}:${minutesInString}:${secondsInString}`;
};

const Stopwatch = () => {
  const [time, setTime] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  const resetHandler = () => {
    setTime(0);
    setIsRunning(false);
  };

  useEffect(() => {
    // This part runs when the effect is first applied or when isRunning changes
    let intervalID: number;

    // Only set up interval if isRunning is true
    if (isRunning) {
      intervalID = setInterval(() => {
        // Increment time every second
        setTime((prev) => prev + 1);
      }, 1000);
    }

    // Cleanup function
    return () => {
      // Clear the interval to stop it from continuing to run
      clearInterval(intervalID);
    };
  }, [isRunning]); // Effect depends on isRunning

  return (
    <div className="admin-container">
      <AdminSidebar />
      <main className="dashboard-app-container">
        <h1>Stopwatch</h1>
        <section>
          <div className="stopwatch">
            <h2>{formatTime(time)}</h2>
            <button onClick={() => setIsRunning((prev) => !prev)}>
              {isRunning ? "Stop" : "Start"}
            </button>
            <button onClick={resetHandler}>Reset</button>
          </div>
        </section>
      </main>
      ;
    </div>
  );
};

export default Stopwatch;
