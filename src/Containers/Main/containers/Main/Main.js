import React from "react";
import ComposedComponent from "../../../../utils/requireAuth";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  main: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    height: "100vh",
  },
}));

export default ComposedComponent(({ children }) => {
  const classes = useStyles();
  return <div className={classes.main}>{children}</div>;
});
