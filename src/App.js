import React from "react";
import {
  createMuiTheme,
  ThemeProvider,
  CssBaseline,
  Button,
  BottomNavigation,
  BottomNavigationAction,
  makeStyles,
} from "@material-ui/core";
import {
  BrowserRouter,
  Switch,
  Route,
  Link,
  Redirect,
  useLocation,
} from "react-router-dom";
import {
  AppContextProvider,
  AppContextConsumer,
  useAppContext,
} from "./AppContext";
import HomeIcon from "@material-ui/icons/Home";
import TodayIcon from "@material-ui/icons/Today";
import TimelineIcon from "@material-ui/icons/Timeline";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import { QueryClient, QueryClientProvider } from "react-query";

import HomePage from "./Pages/HomePage";
import WeeklyGraph from "./Pages/WeeklyGraph";
import CheckMeals from "./Pages/CheckMeals";
import NewMeals from "./Pages/NewMeals";
import SignIn from "./Pages/SignIn";
import DoctorHome from "./Pages/DoctorHome";
import Calendar from "./Pages/Calendar";
import PatientOverview from "./Pages/PatientOverview";

const queryClient = new QueryClient();
const outerTheme = createMuiTheme({
  typography: {
    h1: {
      fontFamily: '"Libre Baskerville", "Roboto", "Helvetica", "Arial", serif',
      fontWeight: 300,
      fontSize: "6rem",
      lineHeight: 1.167,
      letterSpacing: "-0.01562em",
    },
    h2: {
      fontFamily: '"Libre Baskerville", "Roboto", "Helvetica", "Arial", serif',
      fontWeight: 300,
      fontSize: "3.75rem",
      lineHeight: 1.2,
      letterSpacing: "-0.00833em",
    },
    h3: {
      fontFamily: '"Libre Baskerville", "Roboto", "Helvetica", "Arial", serif',
      fontWeight: 400,
      fontSize: "3rem",
      lineHeight: 1.167,
      letterSpacing: "0em",
    },
    h4: {
      fontFamily: '"Libre Baskerville", "Roboto", "Helvetica", "Arial", serif',
      fontWeight: 400,
      fontSize: "2.125rem",
      lineHeight: 1.235,
      letterSpacing: "0.00735em",
    },
    h5: {
      fontFamily: '"Libre Baskerville", "Roboto", "Helvetica", "Arial", serif',
      fontWeight: 400,
      fontSize: "1.5rem",
      lineHeight: 1.334,
      letterSpacing: "0em",
    },
    h6: {
      fontFamily: '"Libre Baskerville", "Roboto", "Helvetica", "Arial", serif',
      fontWeight: 500,
      fontSize: "1.25rem",
      lineHeight: 1.6,
      letterSpacing: "0.0075em",
    },
  },
  palette: {
    type: "dark",
    primary: {
      main: "#009688",
    },
    secondary: {
      main: "#ffc400",
    },
  },
});

const useStyles = makeStyles((theme) => ({
  bottomNavigation: {
    width: "100%",
    position: "fixed",
    bottom: 0,
  },
}));

function ProtectedRoute({ children, ...rest }) {
  const classes = useStyles();
  const location = useLocation();
  const { currentUser, setCurrentUser } = useAppContext();
  if (currentUser !== null) {
    return (
      <>
        <Route className={classes.content} {...rest}>
          {children}
        </Route>
        <BottomNavigation
          value={location.pathname}
          showLabels
          className={classes.bottomNavigation}
        >
          <BottomNavigationAction
            component={Link}
            to="/home"
            label="Home"
            value="/home"
            icon={<HomeIcon />}
          />
          <BottomNavigationAction
            component={Link}
            to="/CheckMeals"
            value="/CheckMeals"
            label="Past Meals"
            icon={<TodayIcon />}
          />
          <BottomNavigationAction
            component={Link}
            to="/WeeklyGraph"
            value="/WeeklyGraph"
            label="Timeline"
            icon={<TimelineIcon />}
          />
          <BottomNavigationAction
            component={Link}
            to="/NewMeals"
            value="/NewMeals"
            label="New Meals"
            icon={<AddCircleOutlineIcon />}
          />
        </BottomNavigation>
      </>
    );
  } else {
    return <Redirect to="/" />;
  }
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={outerTheme}>
        <AppContextProvider>
          <AppContextConsumer>
            {({ currentUser }) => (
              <BrowserRouter>
                <CssBaseline />
                <Switch>
                  <Route exact path="/">
                    <SignIn />
                  </Route>
                  <ProtectedRoute path="/home">
                    <HomePage />
                  </ProtectedRoute>
                  <ProtectedRoute path="/patient/:patientId">
                    <PatientOverview />
                  </ProtectedRoute>
                  <ProtectedRoute path="/WeeklyGraph">
                    <WeeklyGraph />
                  </ProtectedRoute>
                  <ProtectedRoute path="/CheckMeals">
                    <CheckMeals />
                  </ProtectedRoute>
                  <ProtectedRoute path="/Calendar">
                    <Calendar />
                  </ProtectedRoute>
                  <ProtectedRoute path="/NewMeals">
                    <NewMeals />
                  </ProtectedRoute>
                </Switch>
              </BrowserRouter>
            )}
          </AppContextConsumer>
        </AppContextProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
