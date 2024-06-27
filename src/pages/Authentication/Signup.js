import React, { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import classNames from "classnames";
import { makeStyles } from "@material-ui/core/styles";
import { signupValidationSchema } from "../../schema";
import { USER_LOGIN, USER_REGISTRATION } from "../../constants/endpoints";
import AxiosService from "../../constants/api";
import { toast } from "react-toastify";

const useStyles = makeStyles((theme) => ({
  card: {
    overflow: "visible",
  },
  session: {
    position: "relative",
    zIndex: 4000,
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
  },
  background: {
    backgroundColor: theme.palette.primary.main,
  },
  content: {
    padding: `40px ${theme.spacing(1)}px`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flex: "1 0 auto",
    flexDirection: "column",
    minHeight: "100%",
    textAlign: "center",
  },
  wrapper: {
    flex: "none",
    maxWidth: "400px",
    width: "100%",
    margin: "0 auto",
  },
  fullWidth: {
    width: "100%",
  },
  logo: {
    display: "flex",
    flexDirection: "column",
  },
}));

const Signup = () => {
  const classes = useStyles();
  const history = useHistory();

  useEffect(() => {
    const isLogin = localStorage.getItem("auth");

    if (isLogin) {
      history.push("/");
    }
  }, []);

  //   handle Registration
  const handleRegistration = async (data) => {
    try {
      const res = await AxiosService.post(USER_REGISTRATION, data);
      toast.success("Registered successfully.")
      history.push("/signin");
    } catch (error) {
      
      toast.error(error.response.data.message)
      console.log("Error", error);
   

    }
  };

  // Formik form handling
  const formik = useFormik({
    initialValues: {
      name:"",
      email: "",
      password: "",
      cpassword: "",
      terms: false,
    },
    validationSchema: signupValidationSchema,
    onSubmit: (values) => {
      console.log("Form submitted successfully", values);
      handleRegistration(values);
    },
  });

  return (
    <div className={classNames(classes.session, classes.background)}>
      <div className={classes.content}>
        <div className={classes.wrapper}>
          <Card>
            <CardContent>
              <form onSubmit={formik.handleSubmit}>
                <div
                  className={classNames(classes.logo, `text-xs-center pb-xs`)}
                >
                  <img
                    src={`${process.env.PUBLIC_URL}/static/images/logo-dark.svg`}
                    alt=""
                  />
                  <Typography variant="caption">
                    Create an app id to continue.
                  </Typography>
                </div>
                <TextField
                  id="name"
                  name="name"
                  label="Full Name"
                  className={classes.textField}
                  fullWidth
                  margin="normal"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.name && Boolean(formik.errors.name)}
                  helperText={formik.touched.name && formik.errors.name}
                />
                <TextField
                  id="email"
                  name="email"
                  label="Email address"
                  className={classes.textField}
                  fullWidth
                  margin="normal"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />
                <TextField
                  id="password"
                  name="password"
                  label="Password"
                  className={classes.textField}
                  type="password"
                  fullWidth
                  margin="normal"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.password && Boolean(formik.errors.password)
                  }
                  helperText={formik.touched.password && formik.errors.password}
                />
                <TextField
                  id="cpassword"
                  name="cpassword"
                  label="Confirm Password"
                  className={classes.textField}
                  type="password"
                  fullWidth
                  margin="normal"
                  value={formik.values.cpassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.cpassword && Boolean(formik.errors.cpassword)
                  }
                  helperText={
                    formik.touched.cpassword && formik.errors.cpassword
                  }
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      name="terms"
                      checked={formik.values.terms}
                      onChange={formik.handleChange}
                    />
                  }
                  label="I have read and agree to the terms of service."
                  className={classes.fullWidth}
                />
                {formik.touched.terms && formik.errors.terms && (
                  <Typography
                    color="error"
                    variant="body2"
                    style={{ paddingBottom: "8px" }}
                  >
                    {formik.errors.terms}
                  </Typography>
                )}
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  type="submit"
                >
                  Create your account
                </Button>
                <div className="pt-1 text-xs-center">
                  {/* <Link to="/forgot">
                    <Button>Forgot password?</Button>
                  </Link> */}
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <Link to="/signin">
                    <Button>Access your account.</Button>
                  </Link>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Signup;
