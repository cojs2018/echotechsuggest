import React from 'react';
import { StyleSheet, View } from 'react-native';
import LoadingView from 'react-native-loading-view';
import { getBookmark, deleteBookmark } from '../../utils/storage';
import { Appbar, Chip, Text, IconButton, TextInput } from 'react-native-paper';
import AlertBar from '../alertBar/alertBar';

export default function ViewBookmark ({
    bookmarkIdSelected,
    setPage,
}) {

    const [isLoading, setIsLoading] = React.useState(false);
    const [details, setDetails] = React.useState({
        bookmarkId: bookmarkIdSelected,
        articleName: '',
        path: 'No Path',
        url: 'No URL',
        title: 'No Title',
        description: 'No description',
        tags: [],
        images: [],
    });
    const [alertMessage, setAlertMessage] = React.useState({
        status: 'none',
        message: ''
    });
    const [visible, setVisible] = React.useState(false);
    const [tags, setTags] = React.useState([]);

    const [editTags, setEditTags] = React.useState(false);

    const handleBookmarkDetails = async () => {
        setIsLoading(true);
        return getBookmark(bookmarkIdSelected)
            .then(bookmarkItem => {
                setDetails(bookmarkItem);
                setIsLoading(false);
            });
    }

    React.useEffect(() => {
        handleBookmarkDetails();
    }, []);

    const handleEdit = () => {
        setTags(details.tags);
        setEditTags(true);
    }

    const handleCancel = () => {
        setTags([]);
        setEditTags(false);
    }

    const handleDelete = async () => {
        return deleteBookmark(bookmarkId)
            .then((onfulfilled) => {
                const responseAlertMessage = {
                    status: 'success',
                    message: onfulfilled.message
                }
                setAlertMessage(responseAlertMessage);
                setVisible(true);
            })
            .catch((onrejected) => {
                const rejectAlertMessage = {
                    status: 'error',
                    message: onrejected.message
                }
                setAlertMessage(rejectAlertMessage);
                setVisible(true);
            });
    };

    const handleRemoveTag = (tagToRemove) => {
        setTags(tags.filter(tag => tag !== tagToRemove));
    };

    const handleNewTag = (newTag) => {
        const newTagSet = [].concat(tags, [newTag]);
        setTags(newTagSet);
    }

    const handleClose = () => {
        setPage(2);
    };

    const tagOptions = editTags ? (
        <View style={styles.updatable}>
            <IconButton
                icon="cancel"
                onPress={handleCancel}
            />
            <IconButton
                icon="content-save"
            />
        </View>
    ) : (
        <IconButton
            icon="circle-edit-outline"
            onPress={handleEdit}
        />
    );

    const tagRender = editTags ? (
        <View>
            {tags.map(tag => <Chip onClose={handleRemoveTag(tag)}>{tag}</Chip>)}
            <TextInput onSubmitEditing={synth => handleNewTag(synth.nativeEvent.text)} />
        </View>
    ) : (
        details.tags.map(tag => <Chip>{tag}</Chip>)
    )

    return (
        <View>
            <Appbar>
                <Appbar.Content title={bookmarkIdSelected} />
                <Appbar.Action icon="delete" onPress={handleDelete} />
                <Appbar.Action icon="close" onPress={handleClose} />
            </Appbar>
            {isLoading ? (
                <View>
                    <LoadingView loading={isLoading} />
                </View>
            ) : (
                <View style={styles.gridContainer}>
                    <View>
                        <AlertBar
                            severity={alertMessage.status}
                            message={alertMessage.message}
                            visible={visible}
                            setVisible={setVisible}
                        />
                    </View>
                    <View>
                        <Text style={styles.section}>Title</Text>
                        <Text>{details.title}</Text>
                    </View>
                    <View>
                        <Text style={styles.section}>Description</Text>
                        <Text>{details.description}</Text>
                    </View>
                    <View>
                        <Text style={styles.section}>Path</Text>
                        <Text
                            accessibilityRole="link"
                            dataDetectorType="link"
                        >
                            {details.path}
                        </Text>
                    </View>
                    <View>
                        <View style={styles.updatable}>
                            <Text style={styles.section}>Tags</Text>
                            {tagOptions}
                        </View>
                        {tagRender}
                    </View>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    gridContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        width: '97%',
        height: '100%'
    },
    section: {
        fontWeight: "bold",
        paddingTop: 20,
        paddingBottom: 10
    },
    updatable: {
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
})