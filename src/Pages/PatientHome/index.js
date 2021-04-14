import { Typography, makeStyles } from "@material-ui/core";
import PieChart from "./PieChart";
import { format } from "date-fns";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    flexGrow: 1,
  },
}));
const PatientHome = () => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <Typography variant="h4">
        {format(new Date(), "eeee, LLLL do")}
      </Typography>
      <PieChart />
    </div>
  );
};
export default PatientHome;
