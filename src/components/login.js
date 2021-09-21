import React from 'react';
import { Avatar, Button, Grid, Paper, TextField } from '@mui/material';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

function Login() {
    
    const paperStyle={padding:20, height:"70vh", width:280, margin:"20px auto"};
    const avatarStyle={backgroundColor:"#41a9e1"};
    
    return(
        <Grid>
            <Paper elevation={10} style={paperStyle}>
                <Grid align="center">
                    <Avatar style={avatarStyle}><LockOpenOutlinedIcon/></Avatar>
                    <h2>Sign In</h2>
                </Grid>
                <TextField label="Email" variant="filled" fullWidth required />
                <TextField label="Password" type="password" autoComplete="current-password" variant="filled" fullWidth required />
                <FormControlLabel control={<Checkbox defaultChecked />} label="Remember me" />
                <Button type="submit" color="primary" variant="contained" fullWidth>Sign in</Button>
            </Paper>
        </Grid>
    )
}

export default Login;