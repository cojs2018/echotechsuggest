import React from 'react';
import { View } from 'react-native';
import { Button, Title, FAB } from 'react-native-paper';
import { Icon } from 'react-native-vector-icons';
import NewBookmark from '../newBookmark/newBookmark';
import ManageBookmarks from '../manageBookmarks/manageBookmarks';

const columnGrid = {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
};


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
        <View >
            <Title>
                Echo-Tech-Suggest
            </Title>
            {page === 0 ? (
                <View>
                    <Button
                        testID="create" 
                        mode="contained" 
                        icon="bookmark-plus"
                        onPress={handleNewBookmark}
                    >
                        Create new bookmark
                    </Button>
                    <Button 
                        testID="manage" 
                        icon="database-edit" 
                        mode="contained" 
                        onPress={handleManageBookmarks}
                    >
                        Manage bookmarks
                    </Button>
                </View>
            ) : (
                <View>
                    {page === 1 ? (
                        <NewBookmark />
                    ) : (
                        <View>
                            {page === 2 ? (
                                <ManageBookmarks />
                            ) : (
                                <div />
                            )}
                        </View>
                    )}
                    <FAB 
                        testID="home-menu" 
                        icon="menu" 
                        onPress={handleMenu} 
                    />
                </View>
            )}
        </View>
    )
}