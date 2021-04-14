import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import React from "react";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { withStyles, makeStyles, ButtonGroup, Button } from "@material-ui/core";
import clsx from "clsx";
import { mergeClasses } from "@material-ui/styles";
import { useAppContext } from "../AppContext";
import { useQuery } from "react-query";

const navigate = {
  PREVIOUS: "PREV",
  NEXT: "NEXT",
  TODAY: "TODAY",
  DATE: "DATE",
};
class Toolbar extends React.Component {
  render() {
    let {
      localizer: { messages },
      label,
      classes,
    } = this.props;
    return (
      <div className={classes.toolbar}>
        <ButtonGroup>
          <Button
            type="button"
            onClick={this.navigate.bind(null, navigate.TODAY)}
          >
            {messages.today}
          </Button>
          <Button
            type="button"
            onClick={this.navigate.bind(null, navigate.PREVIOUS)}
          >
            {messages.previous}
          </Button>
          <Button
            type="button"
            onClick={this.navigate.bind(null, navigate.NEXT)}
          >
            {messages.next}
          </Button>
        </ButtonGroup>
        <span className="rbc-toolbar-label">{label}</span>
        <ButtonGroup>{this.viewNamesGroup(messages)}</ButtonGroup>
      </div>
    );
  }
  navigate = (action) => {
    this.props.onNavigate(action);
  };
  view = (view) => {
    this.props.onView(view);
  };
  viewNamesGroup(messages) {
    let viewNames = this.props.views;
    const view = this.props.view;
    if (viewNames.length > 1) {
      return viewNames.map((name) => (
        <Button type="button" key={name} onClick={this.view.bind(null, name)}>
          {messages[name]}
        </Button>
      ));
    }
  }
}

const useStyles = makeStyles((theme) => ({
  event: {
    backgroundColor: "#3b7f39",
  },
  slot: {
    backgroundColor: "#77bc74",
  },
  day: {
    backgroundColor: "#77bc74",
  },
}));
const styles = {
  toolbar: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginBottom: "10px",
    fontSize: "16px",
  },
};
const locales = {
  "en-US": require("date-fns/locale/en-US"),
};
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

function Event({ event }) {
  const classes = useStyles();
  return (
    <div className={classes.event}>
      <strong style={{ color: "white" }}>{event.meal}</strong>
      {event.details && ":  " + event.details}
    </div>
  );
}

const MyCalendar = (props) => {
  const classes = useStyles();
  const { currentUser } = useAppContext();
  const { isLoading, error, data, status } = useQuery("repoData", () =>
    fetch(`http://localhost:3001/meals/?userId=${currentUser.id}`).then((res) =>
      res.json()
    )
  );
  if (isLoading) return "loading...";
  return (
    <Calendar
      localizer={localizer}
      events={data}
      startAccessor="date"
      endAccessor="date"
      eventPropGetter={() => ({
        className: classes.event,
      })}
      style={{ height: 700 }}
      components={{
        event: Event,
        toolbar: withStyles(styles)(Toolbar),
      }}
      slotPropGetter={() => ({
        className: classes.slot,
      })}
      dayPropGetter={() => ({
        className: classes.day,
      })}
    />
  );
};

export default MyCalendar;
