import React from "react";
import {
  MenuItem,
  FormGroup,
  FormControl,
  FormControlLabel,
  Checkbox,
  FormLabel,
  TextField,
  Typography,
  FormHelperText,
  Select,
  Button,
} from "@material-ui/core";
import { useAppContext } from "../../AppContext";
import { makeStyles } from "@material-ui/core/styles";
import format from "date-fns/format";
import { Link as RouterLink, useHistory } from "react-router-dom";
import { useMutation, useQueryClient } from "react-query";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: theme.spacing(2),
    marginBottom: theme.mixins.toolbar,
  },
  checkboxes: {
    alignContent: "center",
  },
  bottomButton: {
    marginBottom: theme.spacing(6),
  },
}));

function NewMeal() {
  const queryClient = useQueryClient();
  const [state, setState] = React.useState({
    vegetables: false,
    fruitsNuts: false,
    legumes: false,
    wholeGrains: false,
    healthyFats: false,
    alcohol: false,
    lessThan7ozofDairy: false,
    lessThan4ozofMeat: false,
    fishSeafood: false,
  });
  const [meal, setMeal] = React.useState("");
  const [mealType, setMealType] = React.useState("");
  const [sugar, setSugar] = React.useState("");
  const herstory = useHistory();
  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };
  const { currentUser } = useAppContext();
  const classes = useStyles();
  const mutation = useMutation(
    (newMeal) =>
      fetch("http://localhost:3001/meals", {
        method: "POST",
        body: JSON.stringify(newMeal),
      }),
    {
      onSuccess: async (data, variables) => {
        const newMeal = await data.json();
        await queryClient.cancelQueries("meals");
        queryClient.setQueryData("meals", (old) => {
          return [...old, newMeal];
        });
        herstory.push("/CheckMeals");
      },
    }
  );
  return (
    <div className={classes.container}>
      <div className={classes.root}>
        <Typography align="center" variant="h3" gutterBottom>
          New Meal for {format(new Date(), "eeee, LLLL do")}
        </Typography>
      </div>
      <TextField
        id="outlined-helperText"
        label="What did you eat?"
        placeholder="Meal"
        margin="normal"
        helperText="Fish, Apple, etc"
        variant="outlined"
        value={meal}
        onChange={(event) => {
          setMeal(event.target.value);
        }}
      />
      <FormControl className={classes.formControl} variant="outlined">
        <Select
          value={mealType}
          onChange={(event) => {
            setMealType(event.target.value);
          }}
          margin="normal"
          displayEmpty
          className={classes.selectEmpty}
          inputProps={{ "aria-label": "Meal Type" }}
        >
          <MenuItem value="Breakfast">Breakfast</MenuItem>
          <MenuItem value="Lunch">Lunch</MenuItem>
          <MenuItem value="Dinner">Dinner</MenuItem>
          <MenuItem value="Snack">Snack</MenuItem>
        </Select>
        <FormHelperText>Meal Type</FormHelperText>

        <TextField
          id="outlined-helperText"
          label="How much total sugar in meal?"
          helperText="Amount of sugar in grams"
          variant="outlined"
          type="number"
          margin="normal"
          min={0}
          value={sugar}
          inputProps={{
            min: 0,
          }}
          onChange={(event) => {
            setSugar(event.target.value);
          }}
        />
      </FormControl>
      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend">
          Did your meal contain any of the following med pts?
        </FormLabel>
        <FormGroup className={classes.checkboxes}>
          <FormControlLabel
            control={
              <Checkbox
                checked={state.vegetables}
                onChange={handleChange}
                name="vegetables"
              />
            }
            label="vegetables"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={state.fruitsNuts}
                onChange={handleChange}
                name="fruitsNuts"
              />
            }
            label="Fruits and Nuts"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={state.legumes}
                onChange={handleChange}
                name="legumes"
              />
            }
            label="legumes"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={state.wholeGrains}
                onChange={handleChange}
                name="wholeGrains"
              />
            }
            label="Whole Grains"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={state.healthyFats}
                onChange={handleChange}
                name="healthyFats"
              />
            }
            label="Healthy Fats"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={state.alcohol}
                onChange={handleChange}
                name="alcohol"
              />
            }
            label="alcohol"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={state.lessThan7ozofDairy}
                onChange={handleChange}
                name="lessThan7ozofDairy"
              />
            }
            label="Less Than 7 oz of Dairy"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={state.lessThan4ozofMeat}
                onChange={handleChange}
                name="lessThan4ozofMeat"
              />
            }
            label="Less Than 4 oz of Meat"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={state.fishSeafood}
                onChange={handleChange}
                name="fishSeafood"
              />
            }
            label="Fish/Seafood"
          />
        </FormGroup>
      </FormControl>
      {mutation.isError ? (
        <div>An error occurred: {mutation.error.message}</div>
      ) : null}
      <Button
        variant="outlined"
        color="secondary"
        component={RouterLink}
        fullWidth
        to="/home"
      >
        Cancel
      </Button>

      <Button
        variant="contained"
        color="secondary"
        fullWidth
        disabled={mutation.isLoading}
        className={classes.bottomButton}
        onClick={() => {
          mutation.mutate({
            id: 200,
            userId: currentUser.id,
            date: new Date(),
            sugar,
            food: meal,
            legumes: state.legumes,
            fruitsNuts: state.fruitsNuts,
            healthyFats: state.healthyFats,
            dairy: state.dairy,
            meat: state.meat,
            wholeGrains: state.wholeGrains,
            vegetables: state.vegetables,
            alcohol: state.alcohol,
            fishSeafood: state.fishSeafood,
          });
        }}
      >
        Log Meals
      </Button>
    </div>
  );
}

export default NewMeal;
