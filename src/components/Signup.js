import React from 'react';
import { Avatar, Button, Grid, Link, Paper, TextField, FormControlLabel, Checkbox, Typography } from '@mui/material';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';

function Signup() {

    const paperStyle = { padding: 20, width: 280, margin: "20px auto" };
    const avatarStyle = { backgroundColor: "#41a9e1" };
    const headerStyle = { margin: 10 };
    const marginStyle = { margin: "8px 0" };

    return (
        <Grid>
            <Paper elevation={10} style={paperStyle}>
                <Grid align="center">
                    <Avatar style={avatarStyle}>
                        <AddBoxOutlinedIcon />
                    </Avatar>
                    <h2 style={headerStyle}>Rickshaw Registry</h2>
                    <h4 style={headerStyle}>Sign Up</h4>
                </Grid>
                <form>
                    <TextField label="Name" variant="filled" size="small" style={marginStyle} fullWidth autoFocus required />
                    <TextField label="Email" type="email" variant="filled" size="small" style={marginStyle} fullWidth required />
                    <TextField label="Phone number" type="number" variant="filled" size="small" style={marginStyle} fullWidth />
                    <TextField label="Password" type="password" variant="filled" size="small" style={marginStyle} fullWidth required />
                    <TextField label="Confirm password" type="password" variant="filled" size="small" style={marginStyle} fullWidth required />
                    <FormControlLabel control={<Checkbox required />} label="By signing up, you agree to our Terms." />
                    <Button type="submit" color="primary" variant="contained" style={marginStyle} fullWidth>
                        Create Account
                    </Button>
                </form>
            </Paper>
            <Paper elevation={10} style={paperStyle}>
                <Typography align="center">
                    Have an account?
                    <Link href="#" underline="none"> Log in </Link>
                </Typography>
            </Paper>
        </Grid>
    )
}

export default Signup;