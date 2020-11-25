import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useDispatch, useSelector} from "react-redux";
import { push } from "connected-react-router";
import { actions } from "../../store";
import { Formik } from "formik";
import * as Yup from "yup";
import {getUser} from "../../../Auth/store/selectors";

const useStyles = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: "100%",
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const secondUser = useSelector(getUser())

    const validationSchema = Yup.object().shape({
        roomNumber: Yup.number()
            .required("write any word"),
    });

    return (
        <Container component="main" maxWidth="xs">
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <Formik
                    initialValues={{
                        roomNumber : null,
                    }}
                    validationSchema={validationSchema}
                    onSubmit={values => {
                        dispatch(actions.A_SecondUserConnectRequest({id: values.roomNumber, secondUser}));
                    }}
                >
                    {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
                        <form onSubmit={handleSubmit} className={classes.form}>
                            <Grid item xs={12}>
                                <TextField
                                    error={ touched.roomNumber && Boolean(errors.roomNumber) }
                                    helperText={ touched.roomNumber && errors.roomNumber }
                                    variant="outlined"
                                    required
                                    fullWidth
                                    name="roomNumber"
                                    label="roomNumber"
                                    type="roomNumber"
                                    id="roomNumber"
                                    onChange={handleChange}
                                    value={values.roomNumber}
                                />
                            </Grid>
                            <Button
                                disabled={isSubmitting}
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                Sign In
                            </Button>
                        </form>
                    )}
                </Formik>
            </div>
        </Container>

    );
};