import React, { Fragment, useEffect, useState } from "react";
import { useStyles } from "./styles";
import { Button, Card, CardActionArea, CardContent } from "@material-ui/core";

const Timer = (valor) => {
  const classes = useStyles();
  const typeTimer = ["emon", "amrap", "fortime", "tabata", "timer"];

  const [timerSelect, setTimerSelect] = useState("noSelect");

  // const [tabataRound, setTabataRound] = useState("");
  // const [tabataWork, setTabataWork] = useState("");
  // const [tabataRest, setTabataRest] = useState("");

  useEffect(() => {}, []);

  // const renderEmon = () => {};

  const renderTabata = () => {
    return (
      <>
        <div>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => setTimerSelect("noSelect")}
          >
            Primary
          </Button>
          <h1 className={classes.title}>TABATAAAAAAA</h1>
        </div>
      </>
    );
  };

  // const renderAmrap = () => {};

  // const renderFortime = () => {};

  // const renderTimer = () => {};

  const renderTimers = () => {
    return (
      <Fragment>
        <div>
          <h1 className={classes.title}>Timer</h1>
        </div>
        <div className={classes.cards}>
          {typeTimer.map((el) => (
            <Card className={classes.card} onClick={() => setTimerSelect(el)}>
              <CardActionArea>
                <CardContent>
                  <p>{el}</p>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </div>
      </Fragment>
    );
  };

  return <>{timerSelect === "tabata" ? renderTabata() : renderTimers()}</>;
};
export default Timer;
