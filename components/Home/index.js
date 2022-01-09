import React, { useState } from 'react';
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Tooltip from '@mui/material/Tooltip';

export default function Home({ title, result, newUrl, handleClick }) {

  const [ url, setUrl ] = useState("");

  const handleCopy = () => {
      if(typeof window !== "undefined") {
          window.navigator.clipboard.writeText(newUrl);
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
        <Grid item xs={12} style={{marginBottom: "50px"}}>
        {newUrl.length > 0
        ?
          <Grid container style={{marginTop: "50px"}}>
            <Grid item xs={3} />
            <Grid item xs={6}>
                <Typography variant="h5" textAlign={"center"}>{result}</Typography>
                <Grid container>
                    <Grid item xs={11}>
                        <Typography variant="h5" textAlign={"center"}>{newUrl}</Typography>
                    </Grid>
                    <Grid item xs={1}>
                        <Tooltip title="Copy">
                            <IconButton 
                                aria-label="Copy"
                                onClick={handleCopy}
                            >
                                <ContentCopyIcon />
                            </IconButton>
                        </Tooltip>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={3} />
          </Grid>
           : null }
        </Grid>
      </Grid>
    </div>
  )
}