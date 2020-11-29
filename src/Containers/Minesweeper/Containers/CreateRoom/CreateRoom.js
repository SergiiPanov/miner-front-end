import React from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import { Button } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { actions } from "../../store";
import { Formik, Form } from "formik";

export default () => {
  const dispatch = useDispatch();
  return (
    <Formik
      initialValues={{
        fieldSize: "10",
        bombsCount: "10",
      }}
      onSubmit={(values) => {
        const bombsCount = Math.floor((values.fieldSize ** 2 / 100) * values.bombsCount);
        dispatch(actions.A_SendFieldSizeAndBombsRequest({ fieldSize: values.fieldSize, bombsCount }));
      }}
    >
      {({ handleChange, isSubmitting }) => (
        <Form>
          <FormLabel component="legend">Field size</FormLabel>
          <RadioGroup aria-label="Field Size" name="fieldSize" onChange={handleChange}>
            <FormControlLabel value="10" control={<Radio />} label="10" />
            <FormControlLabel value="15" control={<Radio />} label="15" />
            <FormControlLabel value="20" control={<Radio />} label="20" />
          </RadioGroup>
          <FormLabel component="legend">Bombs</FormLabel>
          <RadioGroup aria-label="Field Size" name="bombsCount" onChange={handleChange}>
            <FormControlLabel value="10" control={<Radio />} label="Easy" />
            <FormControlLabel value="20" control={<Radio />} label="Normal" />
            <FormControlLabel value="30" control={<Radio />} label="Hell" />
          </RadioGroup>
          <Button disabled={isSubmitting} type="submit" fullWidth variant="contained" color="primary">
              Create The Game
          </Button>
        </Form>
      )}
    </Formik>
  );
};
