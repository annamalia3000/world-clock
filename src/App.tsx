import { useState, useEffect } from "react";
import { Clock } from "./components/Clock/Clock";
import moment from "moment-timezone";
import "./App.css";

type ClockInfo = {
  id: number;
  name: string;
  timezone: string;
};

const App: React.FC = () => {
  const [clocks, setClocks] = useState<ClockInfo[]>([]);
  const [name, setName] = useState("");
  const [timezone, setTimezone] = useState("");
  const [currentTime, setCurrentTime] = useState<string>("");

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(moment().toISOString());
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const addClock = () => {
    if (name && timezone) {
      const validTimezone = moment.tz.zone(timezone);
      if (validTimezone) {
        const newClock: ClockInfo = {
          id: Date.now(),
          name,
          timezone,
        };
        setClocks([...clocks, newClock]);
      }
    }
    setName("");
    setTimezone("");
  };

  const removeClock = (id: number) => {
    setClocks(clocks.filter((clock) => clock.id !== id));
  };

  return (
    <div className="container">
      <div className="input-info">
        <div>
          <h2 className="title">Название</h2>
          <input
            className="input-info-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <h2 className="title">Временная зона</h2>
          <input
            className="input-info-timezone"
            type="text"
            placeholder="Europe/London"
            value={timezone}
            onChange={(e) => setTimezone(e.target.value)}
          />
        </div>
        <button className="add-button" onClick={addClock}>
          Добавить
        </button>
      </div>
      <div className="clock-list">
        {clocks.map((clock) => {
          const timeInZone = moment.tz(currentTime, clock.timezone).format();
          return (
            <Clock
              key={clock.id}
              id={clock.id}
              name={clock.name}
              time={timeInZone}
              removeClock={removeClock}
            />
          );
        })}
      </div>
    </div>
  );
};

export default App;
