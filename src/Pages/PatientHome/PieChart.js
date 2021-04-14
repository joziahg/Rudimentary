import React, { PureComponent, useState, useEffect } from "react";
import {
  PieChart,
  Pie,
  Sector,
  Cell,
  ResponsiveContainer,
  Label,
} from "recharts";
import { useQuery } from "react-query";
import { isSameDay } from "date-fns";
import { useAppContext } from "../../AppContext";
import AppleIcon from "@material-ui/icons/Apple";
import OutdoorGrillIcon from "@material-ui/icons/OutdoorGrill";
import {
  Fish,
  Carrot,
  BreadSlice,
  Seed,
  IceCream,
  Peanut,
  GlassCocktail,
} from "mdi-material-ui";
import { makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  sugar: {
    display: "flex",
    justifyContent: "center",
    height: "100%",
  },
}));

const fakeData = [
  { name: "legumes", value: 1 },
  { name: "fruitsNuts", value: 1 },
  { name: "healthyFats", value: 1 },
  { name: "dairy", value: 1 },
  { name: "meat", value: 1 },
  { name: "wholeGrains", value: 1 },
  { name: "vegtables", value: 1 },
  { name: "alcohol", value: 1 },
  { name: "fishSeafood", value: 1 },
];

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#AFECA5",
  "#689D5F",
  "#FBDC8D",
  "#3F969B",
  "#F1F52F",
];

const pointCategories = [
  { name: "Legumes", dataKey: "legumes" },
  { name: "Fruits & Nuts", dataKey: "fruitsNuts" },
  { name: "Healthy Fats", dataKey: "healthyFats" },
  { name: "Dairy Less than 7oz", dataKey: "dairy" },
  { name: "Meat less than 4oz", dataKey: "meat" },
  { name: "Whole Grains", dataKey: "wholeGrains" },
  { name: "Vegtables", dataKey: "vegtables" },
  { name: "Alcohol", dataKey: "alcohol" },
  { name: "Fish/Seafood", dataKey: "fishSeafood" },
];
const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx - 10 + radius * Math.cos(-midAngle * RADIAN);
  const y = cy - 10 + radius * Math.sin(-midAngle * RADIAN);

  switch (pointCategories[index].name) {
    case "Fruits & Nuts":
      return (
        <foreignObject x={x} y={y} width={24} height={24}>
          <div xmlns="http://www.w3.org/1999/xhtml">
            <AppleIcon />
          </div>
        </foreignObject>
      );
    case "Legumes":
      return (
        <foreignObject x={x} y={y} width={24} height={24}>
          <div xmlns="http://www.w3.org/1999/xhtml">
            <Seed />
          </div>
        </foreignObject>
      );
    case "Whole Grains":
      return (
        <foreignObject x={x} y={y} width={24} height={24}>
          <div xmlns="http://www.w3.org/1999/xhtml">
            <BreadSlice />
          </div>
        </foreignObject>
      );
    case "Vegtables":
      return (
        <foreignObject x={x} y={y} width={24} height={24}>
          <div xmlns="http://www.w3.org/1999/xhtml">
            <Carrot />
          </div>
        </foreignObject>
      );
    case "Alcohol":
      return (
        <foreignObject x={x} y={y} width={24} height={24}>
          <div xmlns="http://www.w3.org/1999/xhtml">
            <GlassCocktail />
          </div>
        </foreignObject>
      );
    case "Healthy Fats":
      return (
        <foreignObject x={x} y={y} width={24} height={24}>
          <div xmlns="http://www.w3.org/1999/xhtml">
            <Peanut />
          </div>
        </foreignObject>
      );
    case "Dairy Less than 7oz":
      return (
        <foreignObject x={x} y={y} width={24} height={24}>
          <div xmlns="http://www.w3.org/1999/xhtml">
            <IceCream />
          </div>
        </foreignObject>
      );
    case "Meat less than 4oz":
      return (
        <foreignObject x={x} y={y} width={24} height={24}>
          <div xmlns="http://www.w3.org/1999/xhtml">
            <OutdoorGrillIcon />
          </div>
        </foreignObject>
      );
    case "Fish/Seafood":
      return (
        <foreignObject x={x} y={y} width={24} height={24}>
          <div xmlns="http://www.w3.org/1999/xhtml">
            <Fish />
          </div>
        </foreignObject>
      );
  }
};

const sum = (accumulator, currentValue) => {
  if (typeof accumulator === "object") {
    return accumulator.sugar + currentValue.sugar;
  } else {
    return accumulator + currentValue.sugar;
  }
};

export default function MealsPieChart() {
  const classes = useStyles();
  const { currentUser } = useAppContext();
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
    if (status === "success") {
      data
        .filter((meal) => isSameDay(new Date(), new Date(meal.date)))
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
  if (isLoading) return "loading...";
  return (
    <>
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <foreignObject width="100%" height="100%">
            <div className={classes.sugar} xmlns="http://www.w3.org/1999/xhtml">
              <svg
                viewBox="0 0 200 200"
                width="100%"
                height="100%"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx={100} cy={100} r={40} fill="white" />
                <text
                  x="50%"
                  y="50%"
                  color="white"
                  dominant-baseline="middle"
                  text-anchor="middle"
                >
                  {data.reduce(sum, 0)} g
                </text>
              </svg>
            </div>
          </foreignObject>

          <Pie
            data={fakeData}
            labelLine={false}
            paddingAngle={3}
            label={renderCustomizedLabel}
            outerRadius={175}
            innerRadius={100}
            fill="#8884d8"
            dataKey="value"
          >
            {pointCategories.map((category, index) => {
              const filled = todaysPointsHit[category.dataKey];
              return (
                <Cell
                  key={`cell-${index}`}
                  fill={filled ? COLORS[index % COLORS.length] : "#AEAEAB"}
                />
              );
            })}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </>
  );
}
