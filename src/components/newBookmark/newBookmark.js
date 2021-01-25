import { Button, Grid, Typography, TextField } from '@material-ui/core';
import React from 'react';
import { createBookmark } from '../../utils/storage';
import { Alert } from '@material-ui/lab';

export default function NewBookmark() {

    const [bookmarkUrl, setBookmarkUrl] = React.useState('');
    const [message, setMessage] = React.useState('');
    const [error, setError] = React.useState(false);

    const handleURLChange = (event) => {
        setBookmarkUrl(event.target.value);
    }

    const handleSubmit = async () => {
        return createBookmark(bookmarkUrl)
            .then(() => {
                setError(false);
                setMessage('Url has now been stored, please await your results.');
            })
            .catch((errorThrown) => {
                setError(true);
                setMessage(errorThrown.message);
            })
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
                {message.length > 0 ? (
                    <Alert severity={error ? "error" : "info"}>
                        {message}
                    </Alert>
                ) : (<div/>)}
            </Grid>
        </Grid>
    )
}