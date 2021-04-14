import { useState, useEffect } from "react";
import {
  Slide,
  useScrollTrigger,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  makeStyles,
  FormControl,
  FormControlLabel,
} from "@material-ui/core";
import { Menu } from "@material-ui/icons";
import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/Inbox";
import { format, isSameDay } from "date-fns";
import { useQuery } from "react-query";
import { useAppContext } from "../../AppContext";
import { Link } from "react-router-dom";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  list: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));

const sum = (accumulator, currentValue) => {
  if (typeof accumulator === "object") {
    return accumulator.sugar + currentValue.sugar;
  } else {
    return accumulator + currentValue.sugar;
  }
};

function CheckMeals() {
  const { currentUser } = useAppContext();
  const [date, setDate] = useState(new Date());
  const [totalPtsHit, setTotalPtsHit] = useState(0);
  const [todaysPointsHit, setTodaysPointsHit] = useState({
    legumes: false,
    fruitsNuts: false,
    healthyFats: false,
    dairy: false,
    meat: false,
    wholeGrains: false,
    vegtables: false,
    alcohol: false,
    fishSeafood: false,
  });
  const { isLoading, error, data, status } = useQuery("meals", () =>
    fetch(`http://localhost:3001/meals/?userId=${currentUser.id}`).then((res) =>
      res.json()
    )
  );

  useEffect(() => {
    if (status === "Success") {
      data
        .filter((meal) => isSameDay(date, meal.date))
        .forEach((meal) => {
          setTodaysPointsHit({
            legumes: todaysPointsHit.legumes === true ? true : meal.legumes,
            fruitsNuts:
              todaysPointsHit.fruitsNuts === true ? true : meal.fruitsNuts,
            healthyFats:
              todaysPointsHit.healthyFats === true ? true : meal.healthyFats,
            dairy: todaysPointsHit.dairy === true ? true : meal.dairy,
            meat: todaysPointsHit.meat === true ? true : meal.meat,
            wholeGrains:
              todaysPointsHit.wholeGrains === true ? true : meal.wholeGrains,
            vegtables:
              todaysPointsHit.vegtables === true ? true : meal.vegtables,
            alcohol: todaysPointsHit.alcohol === true ? true : meal.alcohol,
            fishSeafood:
              todaysPointsHit.fishSeafood === true ? true : meal.fishSeafood,
          });
        });
    }
  }, [status, todaysPointsHit]);
  useEffect(() => {
    let totalPts = 0;
    Object.entries(todaysPointsHit).forEach(
      (point) => point[1] === true && totalPts++
    );
    setTotalPtsHit(totalPts);
  }, [todaysPointsHit, setTotalPtsHit]);
  const trigger = useScrollTrigger();
  const classes = useStyles();

  if (isLoading) return "Loading...";
  if (error) return "An error has occurred: " + error.message;

  return (
    <>
      <AppBar position="static">
        <Toolbar variant="dense">
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <Menu />
          </IconButton>
          <Typography variant="h6" color="inherit">
            Check Meals
          </Typography>
        </Toolbar>
      </AppBar>
      <div className={classes.container}>
        <Typography variant="h4" gutterBottom>
          {format(date, "eeee, LLLL do")}
        </Typography>
        <Typography variant="subtitle2" gutterBottom>
          {totalPtsHit}/9{" "}
          {data
            .filter((meal) => isSameDay(date, new Date(meal.date)))
            .reduce(sum, 0)}{" "}
          grams
        </Typography>
        <div className={classes.list}>
          <List component="nav" aria-label="main mailbox folders">
            {data.filter((meal) => isSameDay(date, new Date(meal.date)))
              .length === 0 ? (
              <ListItem>
                <ListItemText primary="No meals yet" />
              </ListItem>
            ) : null}
            {data
              .filter((meal) => isSameDay(date, new Date(meal.date)))
              .map((meal, index) => (
                <ListItem button key={index}>
                  <ListItemIcon>
                    <InboxIcon />
                  </ListItemIcon>
                  <ListItemText
                    secondary={`${format(new Date(meal.date), "p")}`}
                    primary={meal.food}
                  />
                </ListItem>
              ))}
          </List>
        </div>
        <FormControl>
          <FormControlLabel
            control={
              <IconButton
                color="secondary"
                aria-label="Check Calender"
                component={Link}
                to="/Calendar"
              >
                <CalendarTodayIcon />
              </IconButton>
            }
            label="Pick date from calendar"
            labelPlacement="end"
          />
        </FormControl>
      </div>
    </>
  );
}

export default CheckMeals;
