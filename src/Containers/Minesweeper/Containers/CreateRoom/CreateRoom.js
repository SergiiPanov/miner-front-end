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
    const firstUser = useSelector(getUser())

    const validationSchema = Yup.object().shape({
        fieldSize: Yup.number()
            .required("write any word"),
        bombsCount: Yup.number()
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
                        fieldSize: null,
                        bombsCount : null,
                    }}
                    validationSchema={validationSchema}
                    onSubmit={values => {
                        dispatch(actions.A_SendFieldSizeAndBombsRequest({...values, firstUser}));
                    }}
                >
                    {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
                        <form onSubmit={handleSubmit} className={classes.form}>
                            <TextField
                                error={ touched.fieldSize && Boolean(errors.fieldSize) }
                                helperText={ touched.fieldSize && errors.fieldSize }
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="fieldSize"
                                label="fieldSize"
                                name="fieldSize"
                                autoFocus
                                onChange={handleChange}
                                value={values.fieldSize}
                            />
                            <Grid item xs={12}>
                                <TextField
                                    error={ touched.bombsCount && Boolean(errors.bombsCount) }
                                    helperText={ touched.bombsCount && errors.bombsCount }
                                    variant="outlined"
                                    required
                                    fullWidth
                                    name="bombsCount"
                                    label="bombsCount"
                                    type="bombsCount"
                                    id="bombsCount"
                                    onChange={handleChange}
                                    value={values.bombsCount}
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
