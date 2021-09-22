import React from 'react';
import { Avatar, Button, Grid, Link, Paper, TextField, FormControlLabel, Checkbox, Typography } from '@mui/material';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';

function Login() {

    const paperStyle = { padding: 20, width: 280, margin: "20px auto" };
    const avatarStyle = { backgroundColor: "#41a9e1" };
    const headerStyle = { margin: 10 };
    const marginStyle = { margin: "8px 0" };

    return (
        <Grid>
            <Paper elevation={10} style={paperStyle}>
                <Grid align="center">
                    <Avatar style={avatarStyle}>
                        <LockOpenOutlinedIcon />
                    </Avatar>
                    <h2 style={headerStyle}>Rickshaw Registry</h2>
                    <h4 style={headerStyle}>Log In</h4>
                </Grid>
                <TextField label="Email" type="email" variant="filled" size="small" style={marginStyle} fullWidth autoFocus required />
                <TextField label="Password" type="password" autoComplete="current-password" variant="filled" size="small" fullWidth required />
                <FormControlLabel control={<Checkbox defaultChecked />} label="Remember me" />
                <Button type="submit" color="primary" variant="contained" style={marginStyle} fullWidth>
                    Log In
                </Button>
                <Typography align="center">
                    <Link href="#" underline="none">Forgotten your password?</Link>
                </Typography>
            </Paper>
            <Paper elevation={10} style={paperStyle}>
                <Typography align="center">
                    Don't have an account?
                    <Link href="#" underline="none"> Sign up </Link>
                </Typography>
            </Paper>
        </Grid>
    )
}

export default Login;