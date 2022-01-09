import React, { useState, useEffect } from 'react';
import { Grid, TextField, InputLabel, Button, Typography } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Header from '../../components/Header';
import axios from 'axios';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Home() {

  const [ url, setUrl ] = useState("");
  const [ snackbar, setSnackbar ] = useState({open: false, severity: "", message: ""});
  const [ newUrl, setNewUrl ] = useState("");
  const [ shortUrl, setShortUrl ] = useState("");

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackbar({ open: false, severity: "", message: ""});
  };

  function isValidUrl(_string) {
    const matchpattern = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/gm;
    return matchpattern.test(_string);
  }

  const handleClick = async () => {
    if(isValidUrl(url)) {
      const response = await axios.post("/api/url", { url });
      if(response.status !== 200) {
        setSnackbar({ open: true, severity: "error", message: response });
      } else {
        setNewUrl(response.data.response.value);
      }
    } else {
      setSnackbar({ open: true, severity: "error", message: "URL IS INVALID" });
    }
  }

  return (
    <div>
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
      <Header />
      <Grid container style={{marginTop: "100px"}}>
        <Grid item xs={3} />
        <Grid item xs={6}>
          <InputLabel>Enter the URL you wish to shorten!</InputLabel>
          <TextField
            required
            label="URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            fullWidth
            margin='normal'
          />
          <Button
            onClick={handleClick}
            variant="contained"
            disabled={url.length === 0 ? true : false}
          >
            Submit
          </Button>
        </Grid>
        <Grid item xs={3} />
        <Grid item xs={12} style={{marginBottom: "50px"}}>
        {newUrl.length > 0
        ?
          <Grid container style={{marginTop: "50px"}}>
            <Grid item xs={3} />
            <Grid item xs={6}>
              <Typography variant="h5" textAlign={"center"}>Your new Shortened URL is</Typography>
              <Typography variant="h5" textAlign={"center"}>{newUrl}</Typography>
            </Grid>
            <Grid item xs={3} />
          </Grid>
           : null }
        </Grid>
      </Grid>
    </div>
  )
}
