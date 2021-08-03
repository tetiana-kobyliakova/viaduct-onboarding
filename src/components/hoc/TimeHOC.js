import React from "react";

const getTimeComponents = (time) => {
  const days = pad(Math.floor(time / (1000 * 60 * 60 * 24)));
  const hours = pad(
    Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  );
  const mins = pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
  const secs = pad(Math.floor((time % (1000 * 60)) / 1000));

  return { days, hours, mins, secs };
};

const pad = (value) => {
  return String(value).padStart(2, "0");
};

const timeHigherOrderComponent = (WrappedComponent) => {
  return function TimeHigherOrderComponent(props) {
    const [timerState, setTimerState] = React.useState({
      days: "00",
      hours: "00",
      mins: "00",
      secs: "00",
    });

    const startTime = React.useMemo(() => Date.now(), []);
    React.useEffect(() => {
      const interval = setInterval(() => {
        const deltaTime = Date.now() - startTime;
        const timeObj = getTimeComponents(deltaTime);
        setTimerState(timeObj);
        console.log(timeObj);
      }, 1000);
      return () => {
        clearInterval(interval);
      };
    }, []);
    return <WrappedComponent {...props} time={timerState} />;
  };
};

export default timeHigherOrderComponent;
