import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Title, FAB, Switch } from 'react-native-paper';
import NewBookmark from '../newBookmark/newBookmark';
import ManageBookmarks from '../manageBookmarks/manageBookmarks';
import ViewBookmark from '../viewBookmark/viewBookmark';


export default function Menu({ switchValue, handleSwitch }) {
    
    const [page, setPage] = React.useState(0);
    const [bookmarkIdSelected, setBookmarkIdSelected] = React.useState('');

    const handleNewBookmark = () => {
        setPage(1);
    };

    const handleManageBookmarks = () => {
        setPage(2);
    };

    const handleMenu = () => {
        setPage(0);
    }

    const pageElement = () => {
        if (page === 0) {
            return (
                <View style={styles.menuOptions}>
                    <Button
                        style={styles.menuButton}
                        testID="create" 
                        mode="contained"
                        icon="bookmark-plus"
                        onPress={handleNewBookmark}
                    >
                        Create new bookmark
                    </Button>
                    <Button 
                        styles={styles.menuButton}
                        testID="manage" 
                        icon="database-edit" 
                        mode="contained" 
                        onPress={handleManageBookmarks}
                    >
                        Manage bookmarks
                    </Button>
                </View>
            )
        }
        else if (page === 1) {
            return (
                <View style={styles.pageStyle}>
                    <NewBookmark />
                    <FAB 
                        testID="home-menu" 
                        icon="menu" 
                        onPress={handleMenu} 
                    />
                </View>
            )
        }
        else if (page === 2) {
            return (
                <View style={styles.pageStyle}>
                    <ManageBookmarks setPage={setPage} bookmarkIdSelected={bookmarkIdSelected} setBookmarkIdSelected={setBookmarkIdSelected} />
                    <FAB 
                        testID="home-menu" 
                        icon="menu" 
                        onPress={handleMenu} 
                    />
                </View>
            )
        }
        else if (page === 3 && bookmarkIdSelected !== '') {
            return (
                <View>
                    <ViewBookmark 
                        bookmarkIdSelected={bookmarkIdSelected} 
                        setPage={setPage} 
                        dark={switchValue}
                    />
                </View>
            )
        }
    }

    return (
        <View style={{ height: '100%', width: '100%' }}>
            <Switch
                value={switchValue}
                onValueChange={handleSwitch}
            />
            <View style={styles.gridStyle}>
                <Title>
                    Echo-Tech-Suggest
                </Title>
                {pageElement()}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    gridStyle: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '100%',
        height: '100%'
    },
    menuOptions: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '100%',
        height: '90%'
    },
    menuButton: {
        minWidth: 300,
        maxWidth: 300,
    },
    pageStyle: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '100%',
        height: '100%'
    }
})