import React from 'react';
import { StyleSheet, View } from 'react-native';
import { listTags, updateBookmark } from '../../../utils/storage';
import { Chip, Text, IconButton, TextInput, Menu, Button } from 'react-native-paper';
import Select from './select';

export default function tagList({
    bookmarkId,
    currentTags, 
    setAlertMessage,
    setVisible,
}) {

    const [tagSelection, setTagSelection] = React.useState([]);
    const oldTags = currentTags;
    const [newTags, setNewTags] = React.useState([]);
    const [edit, setEdit] = React.useState(false);

    const handleTagSelection = async () => {
        return listTags()
            .then(allTagItems => {
                setTagSelection(allTagItems);
            })
            .catch(reasonForError => {
                setAlertMessage({
                    status: 'error',
                    message: reasonForError,
                });
                setVisible(true);
            });
    };

    const handleEdit = () => {
        setNewTags(oldTags);
        setEdit(true);
    };

    const handleCancel = () => {
        setNewTags([]);
        setEdit(false);
    };

    const handleSelect = (tag) => {
        const tempNewTags = newTags;
        tempNewTags.push(tag);
        setNewTags(tempNewTags);
    };

    const handleNewTag = (synthEvent) => {
        const {
            text
        } = synthEvent.nativeEvent;

        const newTagItem = {
            value: text,
        };

        const tempNewTags = newTags;
        tempNewTags.push(newTagItem);
        setNewTags(tempNewTags);
    };

    const handleRemoveTag = (tagToRemove) => {
        const tempNewTags = newTags;
        const indexOfRemoval = newTags.indexOf(tagToRemove);
        tempNewTags.splice(indexOfRemoval, 1);
        setNewTags(tempNewTags);
    }

    const handleSave = async () => {
        const bodyJSON = {
            oldTags,
            newTags,
        };

        console.log(bodyJSON);

        return updateBookmark(bookmarkId, bodyJSON)
            .then(successResult => {
                console.log(successResult);
                setAlertMessage({
                    status: 'success',
                    message: successResult.message,
                });
                setVisible(true);
            })
            .catch(reasonForError => {
                console.log(reasonForError);
                setAlertMessage({
                    status: 'error',
                    message: reasonForError,
                });
                setVisible(true);
            });
    }

    React.useEffect(() => {
        handleTagSelection();
    }, []);

    const selectTags = tagSelection
        .filter(tag => !currentTags.includes(tag))
        .map(tag => ({
            tag,
            pressHandler: () => handleSelect(tag),
        }));

    return (
        <View>
            <View style={styles.updatable}>
                <Text style={styles.section}>Tags</Text>
                {edit ? (
                    <View style={styles.updatable}>
                        <IconButton
                            icon="cancel"
                            onPress={handleCancel}
                        />
                        <IconButton
                            icon="content-save"
                            onPress={handleSave}
                        />
                    </View>
                ) : (
                    <IconButton
                        icon="circle-edit-outline"
                        onPress={handleEdit}
                    />
                )}
            </View>
            <View>
                {edit ? (
                    <View>
                        {newTags.map(tag => (<Chip 
                            key={tag.tagId ? tag.tagId : tag.value} 
                            onClose={() => handleRemoveTag(tag)}
                            >
                                {tag.value}
                            </Chip>))}
                        <Select items={selectTags} />
                        <TextInput
                            onEndEditing={handleNewTag}
                        />
                    </View>
                ) : (
                    <View>
                        {oldTags.map(tag => (<Chip key={tag.tagId}>{tag.value}</Chip>))}
                    </View>
                )}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    updatable: {
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
})