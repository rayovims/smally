import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useRouter } from 'next/router';

export default function ButtonAppBar({ nav, clicks }) {
  const router = useRouter();
  const pages = [ "create", "retrieve" ];

  return (
      <AppBar style={{backgroundColor: "black"}}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Welcome To Smally
          </Typography>
          {nav
          ?
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={() => {
                  if(page === "create") {
                    router.push("/");
                  } else {
                    router.push("/" + page)
                  }
                }}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box> : null }
          {clicks
          ?
          <Typography>Urls Created:{" "}{clicks}</Typography> : null }
        </Toolbar>
      </AppBar>
  );
}
