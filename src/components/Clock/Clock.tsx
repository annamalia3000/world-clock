import { useEffect, useState } from "react";
import moment from "moment-timezone";
import classes from "./clock.module.css";

type ClockProps = {
  id: number;
  name: string;
  timezone: string;
  removeClock: (id: number) => void;
};

export const Clock: React.FC<ClockProps> = ({
  id,
  name,
  timezone,
  removeClock,
}) => {
  const [time, setTime] = useState(moment.tz(timezone));

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(moment.tz(timezone));
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [timezone]);

  const hours = time.hours();
  const minutes = time.minutes();
  const seconds = time.seconds();

  const hourAngle = (hours % 12) * 30 + minutes * 0.5;
  const minuteAngle = minutes * 6;
  const secondAngle = seconds * 6;

  return (
    <div className={classes["clock-container"]}>
      <h2 className={classes["clock-timezone"]}>{name}</h2>
      <div className={classes["clock"]}>
        <div
          className={`${classes["hand"]} ${classes["hour-hand"]}`}
          style={{ transform: `rotate(${hourAngle}deg)` }}
        ></div>
        <div
          className={`${classes["hand"]} ${classes["minute-hand"]}`}
          style={{ transform: `rotate(${minuteAngle}deg)` }}
        ></div>
        <div
          className={`${classes["hand"]} ${classes["second-hand"]}`}
          style={{ transform: `rotate(${secondAngle}deg)` }}
        ></div>
        <button
          className={classes["remove-button"]}
          onClick={() => removeClock(id)}
        >
          x
        </button>
      </div>
    </div>
  );
};