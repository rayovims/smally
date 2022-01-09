import React, { useState, useEffect } from 'react';
import { Grid, TextField, InputLabel, Button, Typography } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import axios from 'axios';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Retrieve() {

  const [ url, setUrl ] = useState("");
  const [ snackbar, setSnackbar ] = useState({open: false, severity: "", message: ""});
  const [ newUrl, setNewUrl ] = useState("");

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
        let ref;
        if(url.includes("localhost") || url.includes("smally.vercel.app")) {
            let _url = url.substring(8);
            let index = _url.indexOf("/");
            ref = _url.substring(index + 1)
        } else {
            ref = -1;
        }
        const response = await axios.post("/api/retrieve", { ref });
        if(response.status !== 200) {
        setSnackbar({ open: true, severity: "error", message: response });
        } else {
            if(response.data.response.status === 200) {
            setNewUrl(response.data.response.value);
            } else {
            setNewUrl("NO Url Found");
            }
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
      <Grid container style={{marginTop: "100px"}}>
        <Grid item xs={3} />
        <Grid item xs={6}>
          <InputLabel>Enter the shortened URL to retrieve the orginal URL</InputLabel>
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
              <Typography variant="h5" textAlign={"center"}>The Original URL Is</Typography>
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
