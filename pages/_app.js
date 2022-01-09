import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import axios from "axios";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


export default function App({ Component, pageProps, test }) {
  const [ nav, setNav ] = useState(true);
  const [ clicks, setClicks ] = useState(null);
  const [ snackbar, setSnackbar ] = useState({ open: false, severity: "", message: "" });
  const [ loading, setLoading ] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackbar({ open: false, severity: "", message: ""});
  };

  const submitButtonClicked = async () => {
    const response = await axios.get("/api/stats");
    setClicks(response.data.clicks + 1)
  }

  useEffect(() => {
    submitButtonClicked();
  }, [])

  return (
    <div>
      <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={loading}
        >
          <CircularProgress color="inherit" />
      </Backdrop>
      <Snackbar 
        open={snackbar.open} 
        autoHideDuration={6000} 
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
      <Header nav={nav} clicks={clicks}/>
      <Component {...pageProps} changeNav={(nav) => setNav(nav)} refresh={() => submitButtonClicked()} handleSnackBar={(snack) => setSnackbar(snack)} spinner={(bool) => setLoading(bool)}/>
    </div>
  ) 
}