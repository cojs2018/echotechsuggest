import { Button, Grid, Typography, TextField } from '@material-ui/core';
import React from 'react';

export default function NewBookmark() {

    const [bookmarkUrl, setBookmarkUrl] = React.useState('');
    const [message, setMessage] = React.useState('');
    //const [error, setError] = React.useState(false);

    const handleURLChange = (event) => {
        setBookmarkUrl(event.target.value);
    }

    const handleSubmit = () => {
        setMessage('Url has now been stored, please await your results.');
    }
    
    return (
        <Grid container direction="column" justify="center" alignItems="center" >
            <Grid item>
                <Typography variant="h2">
                    New Bookmark
                </Typography>
            </Grid>
            <Grid item>
                <Grid container direction="row" justify="center" alignItems="center">
                    <Grid item>
                        <TextField
                            id="url"
                            placeholder="Add url to article you wish to bookmark"
                            onChange={handleURLChange}
                        />
                    </Grid>
                    <Grid item>
                        <Button id="submit" variant="contained" onClick={handleSubmit}>
                            Submit
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item>
                <Typography variant='body1'>
                    {message}
                </Typography>
            </Grid>
        </Grid>
    )
}