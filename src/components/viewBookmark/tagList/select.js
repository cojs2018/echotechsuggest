import React from 'react';
import { Portal, Modal, Button } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';

const ItemButton = ({key, onPress, children}) => {
    return (
        <Button key={key} onPress={onPress}>
            {children}
        </Button>
    )
}

export default function Select({
    items,
}) {

    const [drop, setDrop] = React.useState(false);

    const handleOpen = () => setDrop(true);
    const handleClose = () => setDrop(false);

    const options = items.map(item => {
        const {
            tag,
            pressHandler
        } = item;

        return (
            <ItemButton 
                key={tag.tagId}
                onPress={pressHandler}
                children={tag.value}
            />
        )
    });

    return (
        <View>
            <Portal>
                <Modal visible={drop} onDismiss={handleClose} contentContainerStyle={styles.modalContent}>
                    {options}
                </Modal>
            </Portal>
            <Button icon="menu" onPress={handleOpen} />
        </View>
    )
}

const styles = StyleSheet.create({
    modalContent: {
        backgroundColor: '#ffffff'
    }
})