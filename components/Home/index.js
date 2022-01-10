import React, { useState } from 'react';
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Tooltip from '@mui/material/Tooltip';
import Stack from "@mui/material/Stack";
export default function Home({ title, result, newUrl, handleClick, handleSnackBar }) {

  const [ url, setUrl ] = useState("");

  const handleCopy = () => {
      if(typeof window !== "undefined") {
        window.navigator.clipboard.writeText(newUrl);
        handleSnackBar({ open: true, severity: "success", message: "URL COPIED" })
      }
  }

  return (
    <div>
      <Grid container style={{marginTop: "100px"}}>
        <Grid item xs={3} />
        <Grid item xs={6}>
          <InputLabel>{title}</InputLabel>
          <TextField
            required
            label="URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            fullWidth
            margin='normal'
          />
          <Button
            onClick={() => handleClick(url)}
            variant="contained"
            disabled={url.length === 0 ? true : false}
          >
            Submit
          </Button>
        </Grid>
        <Grid item xs={3} />
        <Grid item xs={12} style={{marginTop: "50px", textAlign: "center"}}>
          {newUrl.length > 0
          ?
          <div>
            <Typography variant="h5" textAlign={"center"}>{result}</Typography>
            <Typography variant="h5" textAlign={"center"}>{newUrl}</Typography>
            <div>
              { newUrl !== "NO Url Found"
              ?
                <Tooltip title="Copy">
                    <IconButton 
                        aria-label="Copy"
                        onClick={handleCopy}
                    >
                        <ContentCopyIcon />
                    </IconButton>
                </Tooltip> : null }
            </div>
          </div> : null }
        </Grid>
      </Grid>
    </div>
  )
}
