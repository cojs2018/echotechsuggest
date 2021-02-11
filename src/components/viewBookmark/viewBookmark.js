import React from 'react';
import { Text, View } from 'react-native';
import LoadingView from 'react-native-loading-view';
import PropTypes from 'prop-types';
import { getBookmark, deleteBookmark } from '../../utils/storage';
import { Appbar, Caption, Chip, Headline } from 'react-native-paper';
import AlertBar from '../alertBar/alertBar';

export default function ViewBookmark (props) {
    const {
        bookmarkId,
        setPage,
    } = props;

    const [isLoading, setIsLoading] = React.useState(false);
    const [details, setDetails] = React.useState({
        bookmarkId,
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

    const handleBookmarkDetails = async () => {
        setIsLoading(true);
        return getBookmark(bookmarkId)
            .then(bookmarkItem => {
                setDetails(bookmarkItem)
                setIsLoading(false);
            });
    }

    React.useEffect(() => {
        handleBookmarkDetails();
    }, []);

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

    const handleClose = () => {
        setPage(2);
    }

    return (
        <View>
            <Appbar>
                <Appbar.Content title={bookmarkId} />
                <Appbar.Action icon="delete" onPress={handleDelete} />
                <Appbar.Action icon="close" onPress={handleClose} />
            </Appbar>
            {isLoading ? (
                <View>
                    <LoadingView loading={isLoading} />
                </View>
            ) : (
                <View>
                    <View>
                        <AlertBar
                            severity={alertMessage.status}
                            message={alertMessage.message}
                            visible={visible}
                            setVisible={setVisible}
                        />
                    </View>
                    <View>
                        <Text>Title</Text>
                        <Headline>{details.title}</Headline>
                    </View>
                    <View>
                        <Text>Description</Text>
                        <Text>{details.description}</Text>
                    </View>
                    <View>
                        <Text>Path</Text>
                        <Text>{details.path}</Text>
                    </View>
                    <View>
                        <Text>Tags</Text>
                        {details.tags.map(tag => <Chip>{tag}</Chip>)}
                    </View>
                </View>
            )}
        </View>
    );
}

ViewBookmark.propTypes = {
    bookmarkId: PropTypes.string.isRequired,
}