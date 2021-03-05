import React from 'react';
import { createBookmark } from '../../utils/storage';
import { Button, Subheading, Divider, TextInput, Text } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';
import AlertBar from '../alertBar/alertBar';

const columnGrid = {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
};

const rowGrid = {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
};

export default function NewBookmark() {

    const [bookmarkUrl, setBookmarkUrl] = React.useState('');
    const [message, setMessage] = React.useState('');
    const [error, setError] = React.useState(false);
    const [visible, setVisible] = React.useState(false);

    const handleURLChange = (text) => {
        setBookmarkUrl(text);
    }

    const handleSubmit = async () => {
        console.log(bookmarkUrl);
        return createBookmark(bookmarkUrl)
            .then(createBookmarkResult => {
                console.log(createBookmarkResult)
                setError(false);
                setMessage('Url has now been stored, please await your results.');
                setVisible(true);
            })
            .catch((errorThrown) => {
                console.log(errorThrown);
                setError(true);
                setMessage(errorThrown.message);
                setVisible(true);
            })
    }
    
    return (
        <View style={styles.columnGrid}>
            <Subheading>New Bookmark</Subheading>
            <Divider />
            <View style={styles.rowGrid}>
                <TextInput
                    testID="url"
                    placeholder="Add url to article you wish to bookmark"
                    onChangeText={handleURLChange}
                />
                <Button 
                    mode="contained" 
                    onPress={handleSubmit}
                    testID="send">
                    Submit
                </Button>
            </View>
            <AlertBar
                visible={visible}
                setVisible={setVisible}
                severity={error ? "error" : "success"}
                message={message}
            />
        </View>
    )
}

const styles= StyleSheet.create({
    columnGrid: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        maxWidth: '97%',
        maxHeight: '50%'
    },
    rowGrid: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        maxWidth: '90%'
    }
})