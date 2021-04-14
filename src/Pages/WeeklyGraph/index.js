import React, { useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  AreaChart,
  ReferenceLine,
  Area,
  Label,
} from "recharts";
import { Typography, makeStyles } from "@material-ui/core";
import {
  isSameWeek,
  isSunday,
  isMonday,
  isTuesday,
  isWednesday,
  isThursday,
  isFriday,
  isSaturday,
} from "date-fns";
import { useQuery } from "react-query";
import { useAppContext } from "../../AppContext";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));
const daysOfWeek = ["Sun", "Mon", "Tues", "Weds", "Thurs", "Fri", "Sat"];

const sumSugar = (accumulator, currentValue) => {
  if (typeof accumulator === "object") {
    return accumulator.sugar + currentValue.sugar;
  } else {
    return accumulator + currentValue.sugar;
  }
};

const WeeklyGraph = ({ meals }) => {
  const classes = useStyles();
  const { currentUser } = useAppContext();
  const patientMealsData = useQuery(
    `getMeals${currentUser.id}`,
    () =>
      fetch(
        `http://localhost:3001/meals/?userId=${currentUser.id}`
      ).then((res) => res.json()),
    {
      enabled: false,
    }
  );
  useEffect(() => {
    if (!meals) {
      patientMealsData.refetch();
    }
  }, [meals]);

  const thisWeeksMeals = meals
    ? meals.filter((meal) => isSameWeek(new Date(meal.date), new Date()))
    : patientMealsData.data
    ? patientMealsData.data.filter((meal) => (new Date(meal.date), new Date()))
    : [];
  const data = daysOfWeek.map((dayOfWeek) => {
    switch (dayOfWeek) {
      case "Sun":
        const sundayMeals = thisWeeksMeals.filter((meal) =>
          isSunday(new Date(meal.date))
        );
        var todaysPointsHit = {
          legumes: false,
          fruitsNuts: false,
          healthyFats: false,
          dairy: false,
          meat: false,
          wholeGrains: false,
          vegtables: false,
          alcohol: false,
          fishSeafood: false,
        };
        sundayMeals.forEach((meal) => {
          todaysPointsHit = {
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
          };
        });
        return {
          name: "Sun",
          sugar: sundayMeals.reduce(sumSugar, 0),
          medPts: Object.values(todaysPointsHit).filter(
            (pointHit) => pointHit === true
          ).length,
        };
      case "Mon":
        const mondayMeals = thisWeeksMeals.filter((meal) =>
          isMonday(new Date(meal.date))
        );
        var todaysPointsHit = {
          legumes: false,
          fruitsNuts: false,
          healthyFats: false,
          dairy: false,
          meat: false,
          wholeGrains: false,
          vegtables: false,
          alcohol: false,
          fishSeafood: false,
        };
        mondayMeals.forEach((meal) => {
          todaysPointsHit = {
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
          };
        });
        return {
          name: "Mon",
          sugar: mondayMeals.reduce(sumSugar, 0),
          medPts: Object.values(todaysPointsHit).filter(
            (pointHit) => pointHit === true
          ).length,
        };
      case "Tues":
        const tuesdayMeals = thisWeeksMeals.filter((meal) =>
          isTuesday(new Date(meal.date))
        );
        var todaysPointsHit = {
          legumes: false,
          fruitsNuts: false,
          healthyFats: false,
          dairy: false,
          meat: false,
          wholeGrains: false,
          vegtables: false,
          alcohol: false,
          fishSeafood: false,
        };
        tuesdayMeals.forEach((meal) => {
          todaysPointsHit = {
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
          };
        });
        return {
          name: "Tues",
          sugar: tuesdayMeals.reduce(sumSugar, 0),
          medPts: Object.values(todaysPointsHit).filter(
            (pointHit) => pointHit === true
          ).length,
        };
      case "Weds":
        const wednesdayMeals = thisWeeksMeals.filter((meal) =>
          isWednesday(new Date(meal.date))
        );
        var todaysPointsHit = {
          legumes: false,
          fruitsNuts: false,
          healthyFats: false,
          dairy: false,
          meat: false,
          wholeGrains: false,
          vegtables: false,
          alcohol: false,
          fishSeafood: false,
        };
        wednesdayMeals.forEach((meal) => {
          todaysPointsHit = {
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
          };
        });
        return {
          name: "Weds",
          sugar: wednesdayMeals.reduce(sumSugar, 0),
          medPts: Object.values(todaysPointsHit).filter(
            (pointHit) => pointHit === true
          ).length,
        };
      case "Thurs":
        const thursdayMeals = thisWeeksMeals.filter((meal) =>
          isThursday(new Date(meal.date))
        );
        var todaysPointsHit = {
          legumes: false,
          fruitsNuts: false,
          healthyFats: false,
          dairy: false,
          meat: false,
          wholeGrains: false,
          vegtables: false,
          alcohol: false,
          fishSeafood: false,
        };
        thursdayMeals.forEach((meal) => {
          todaysPointsHit = {
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
          };
        });
        return {
          name: "Thurs",
          sugar: thursdayMeals.reduce(sumSugar, 0),
          medPts: Object.values(todaysPointsHit).filter(
            (pointHit) => pointHit === true
          ).length,
        };
      case "Fri":
        const fridayMeals = thisWeeksMeals.filter((meal) =>
          isFriday(new Date(meal.date))
        );
        var todaysPointsHit = {
          legumes: false,
          fruitsNuts: false,
          healthyFats: false,
          dairy: false,
          meat: false,
          wholeGrains: false,
          vegtables: false,
          alcohol: false,
          fishSeafood: false,
        };
        fridayMeals.forEach((meal) => {
          todaysPointsHit = {
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
          };
        });
        return {
          name: "Fri",
          sugar: fridayMeals.reduce(sumSugar, 0),
          medPts: Object.values(todaysPointsHit).filter(
            (pointHit) => pointHit === true
          ).length,
        };
      case "Sat":
        const saturdayMeals = thisWeeksMeals.filter((meal) =>
          isSaturday(new Date(meal.date))
        );
        var todaysPointsHit = {
          legumes: false,
          fruitsNuts: false,
          healthyFats: false,
          dairy: false,
          meat: false,
          wholeGrains: false,
          vegtables: false,
          alcohol: false,
          fishSeafood: false,
        };
        saturdayMeals.forEach((meal) => {
          todaysPointsHit = {
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
          };
        });
        return {
          name: "Sat",
          sugar: saturdayMeals.reduce(sumSugar, 0),
          medPts: Object.values(todaysPointsHit).filter(
            (pointHit) => pointHit === true
          ).length,
        };
    }
  });
  return (
    <div className={classes.container}>
      <Typography variant="h5">Previous 7 days</Typography>
      <LineChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis yAxisId="left" />
        <YAxis yAxisId="right" orientation="right" />
        <Tooltip />
        <Legend />
        <Line yAxisId="left" type="monotone" dataKey="sugar" stroke="#8884d8" />
        <Line
          yAxisId="right"
          type="monotone"
          dataKey="medPts"
          stroke="#82ca9d"
        />
        <ReferenceLine
          y={30}
          yAxisId="left"
          label="Avg sugar"
          stroke="red"
          alwaysShow
          strokeDasharray="3 3"
        />
        <ReferenceLine
          y={7}
          yAxisId="right"
          stroke="blue"
          strokeDasharray="3 3"
        >
          <Label value="Med Points" offset={0} position="insideBottom">
            <Typography>Med Points</Typography>
          </Label>
        </ReferenceLine>
      </LineChart>
    </div>
  );
};
export default WeeklyGraph;
