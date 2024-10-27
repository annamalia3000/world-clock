import { useState } from "react";
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

  const addClock = () => {
    if (name && timezone) {
      const validTimezone = moment.tz.zone(timezone);
      if (validTimezone) {
        const newClock: ClockInfo = {
          id: Date.now(),
          name,
          timezone,

      }
      setClocks([...clocks, newClock])
      };
      
      
    };
    setName('');
    setTimezone('');
  }

  const removeClock = (id: number) => {
    setClocks(clocks.filter(clock => clock.id !== id));
  }

  return (
    <div className="container">
      <div className="input-info">
        <div>
          <h2 className="title">Название</h2>
          <input 
          className="input-info-name"
          type="text" 
          value={name}
          onChange={(e) => setName(e.target.value)}/>
        </div>
        <div>
          <h2 className="title">Временная зона</h2>
          <input 
          className="input-info-timezone"
            type="text" 
            value={timezone}
            onChange={e => setTimezone(e.target.value)}/>
        </div>
        <button
        className="add-button"
          onClick={addClock}
        >
          Добавить
        </button>
      </div>
      <div className="clock-list">
        {clocks.map(clock => (
          <Clock
            key={clock.id}
            id={clock.id}
            name={clock.name}
            timezone={clock.timezone}
            removeClock={removeClock}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
