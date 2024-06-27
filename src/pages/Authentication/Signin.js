import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { Link } from "react-router-dom";
import React,{useEffect} from "react";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import classNames from "classnames";
import { makeStyles } from "@material-ui/core/styles";
import { useFormik } from "formik";
import {signinValidationSchema} from "../../schema"
import { useHistory } from "react-router-dom";
import AxiosService from "../../constants/api";
import { USER_LOGIN } from "../../constants/endpoints";


const useStyles = makeStyles(theme => ({
  card: {
    overflow: "visible"
  },
  session: {
    position: "relative",
    zIndex: 4000,
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column"
  },
  background: {
    backgroundColor: theme.palette.primary.main
  },
  content: {
    padding: `40px ${theme.spacing(1)}px`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flex: "1 0 auto",
    flexDirection: "column",
    minHeight: "100%",
    textAlign: "center"
  },
  wrapper: {
    flex: "none",
    maxWidth: "400px",
    width: "100%",
    margin: "0 auto"
  },
  fullWidth: {
    width: "100%"
  },
  logo: {
    display: "flex",
    flexDirection: "column"
  }
}));


const Signin = () => {
  const classes = useStyles();
  const history = useHistory()


  useEffect(()=>{
    const isLogin = localStorage.getItem('auth') 
  
    if(isLogin){
      history.push('/')
    }
  
    },[])


    const handleLogin = async (data) => {   
      try{
        const res =  await AxiosService(USER_LOGIN,data)
        toast.success("Login successfully.")
        history.push("/")
      }
      catch(error){
           toast.error(error.response.data.message)
           console.log("Error:",error)
      }
    }

 


  const formik = useFormik({
    initialValues: {
      email: '',
      password:'',
    },
    validationSchema:signinValidationSchema,
    onSubmit: values => {
      // alert(JSON.stringify(values, null, 2));
      localStorage.setItem("auth", JSON.stringify(values));
      console.log("form data:",values)
      handleLogin(values)

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
                    className="block"
                  />
                  <Typography variant="caption">
                    Sign in with your app id to continue.
                  </Typography>
                </div>
                <TextField
                  id="email"
                  name="email"
                  label="Email"
                  className={classes.textField}
                  fullWidth
                  margin="normal"
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
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.password && Boolean(formik.errors.password)}
                  helperText={formik.touched.password && formik.errors.password}
                  
                />
                {/* <FormControlLabel
                  control={<Checkbox value="checkedA" />}
                  label="Stayed logged in"
                  className={classes.fullWidth}
                /> */}
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  type="submit"
                  style={{ marginTop: '20px' }} 
                >
                  Login
                </Button>
                <div className="pt-1 text-md-center">
                
                  {/* <Link to="/forgot">
                    <Button>Forgot password?</Button>
                  </Link> */}
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <Link to="/signup">
                    <Button>Create new account.</Button>
                  </Link>
                 
                {/* Your information is always secure */}
                  </div> 
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Signin;
