import classes from "./clock.module.css";

type ClockProps = {
  id: number;
  name: string;
  time: string;
  removeClock: (id: number) => void;
};

export const Clock: React.FC<ClockProps> = ({
  id,
  name,
  time,
  removeClock,
}) => {

  const hours = new Date(time).getHours();
  const minutes = new Date(time).getMinutes();
  const seconds = new Date(time).getSeconds();

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
        />
        <div
          className={`${classes["hand"]} ${classes["minute-hand"]}`}
          style={{ transform: `rotate(${minuteAngle}deg)` }}
        />
        <div
          className={`${classes["hand"]} ${classes["second-hand"]}`}
          style={{ transform: `rotate(${secondAngle}deg)` }}
        />
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