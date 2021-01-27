import React from 'react';
import { 
    Button,
    Fab,
    Grid,
    Typography
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import AddIcon from '@material-ui/icons/Add';
import CollectionsBookmarkIcon from '@material-ui/icons/CollectionsBookmark';
import NewBookmark from '../newBookmark/newBookmark';
import ManageBookmarks from '../manageBookmarks/manageBookmarks';


export default function Menu() {
    
    const [page, setPage] = React.useState(0);

    const handleNewBookmark = () => {
        setPage(1);
    };

    const handleManageBookmarks = () => {
        setPage(2);
    };

    const handleMenu = () => {
        setPage(0);
    }

    return (
        <Grid container direction="column" justify="center" alignItems="center" >
            <Grid item>
                <Typography variant="h1">
                    Echo-Tech-Suggest
                </Typography>
            </Grid>
            <Grid item>
                {page === 0 ? (
                    <div>
                        <Button id="create" onClick={handleNewBookmark}>
                            <Typography variant="h3">
                                <AddIcon />
                                Create new bookmark
                            </Typography>
                        </Button>
                        <Button id="manage" onClick={handleManageBookmarks}>
                            <Typography variant="h3">
                                <CollectionsBookmarkIcon />
                                Manage bookmarks
                            </Typography>
                        </Button>
                    </div>
                ) : (
                    <div>
                        {page === 1 ? (
                            <NewBookmark />
                        ) : (
                            <div>
                                {page === 2 ? (
                                    <ManageBookmarks />
                                ) : (
                                    <div />
                                )}
                            </div>
                        )}
                        <Fab id="homemenu" onClick={handleMenu}>
                            <MenuIcon />
                        </Fab>
                    </div>
                )}
            </Grid>
        </Grid>
    )
}