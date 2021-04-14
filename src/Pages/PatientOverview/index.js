import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { Typography, makeStyles, Button } from "@material-ui/core";
import WeeklyGraph from "../WeeklyGraph";
import React, { useState } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/Inbox";
import { format, isSameDay } from "date-fns";

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(10),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  list: {
    width: "100%",
    overflowY: "auto",
  },
}));

const PatientOverview = () => {
  const classes = useStyles();
  const { patientId } = useParams();
  const patientData = useQuery(`getPatient${patientId}`, () =>
    fetch(`http://localhost:3001/users/${patientId}`).then((res) => res.json())
  );
  const patientMealsData = useQuery(`getPatientMeals${patientId}`, () =>
    fetch(`http://localhost:3001/meals/?userId=${patientId}`).then((res) =>
      res.json()
    )
  );
  if (patientData.isLoading || patientMealsData.isLoading) return "loading";
  return (
    <>
      <div className={classes.container}>
        <Typography align="center" variant="h5">
          {patientData.data.firstName} {patientData.data.lastName}
        </Typography>
        <Typography align="center" variant="h6">
          {patientData.data.email}
        </Typography>
        <Typography align="center" variant="h6">
          {patientData.data.phoneNumber}
        </Typography>
        <div style={{ display: "flex", flexGrow: 0.66 }}>
          <WeeklyGraph meals={patientMealsData.data} />
          <MealsList meals={patientMealsData.data} />
        </div>
        <Typography>
          <Button variant="contained" color="primary" onClick>
            Comments
          </Button>
        </Typography>
      </div>
    </>
  );
};

const MealsList = ({ meals }) => {
  const classes = useStyles();
  return (
    <div className={classes.list}>
      <List component="nav" aria-label="main mailbox folders">
        {meals.length === 0 ? (
          <ListItem>
            <ListItemText primary="No meals yet" />
          </ListItem>
        ) : null}
        {meals.map((meal, index) => (
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
  );
};

export default PatientOverview;
