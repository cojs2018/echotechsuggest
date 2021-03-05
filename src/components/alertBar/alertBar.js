import React from 'react';
import PropTypes from 'prop-types';
import { Snackbar, Button, Text } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';

export default function AlertBar(props) {
    const {
        visible,
        setVisible,
        severity,
        message
    } = props;

    const iconName = severity === "error" ? "alert-circle" : "alert-circle-check";
    const messageStyle = severity === "error" ? styles.errorRed : styles.successGreen;

    let messageString = typeof message === 'string' ? message.toUpperCase() : JSON.stringify(message);

    return (
        <Snackbar
            style={styles.dialog}
            visible={visible}
            onDismiss={() => setVisible(false)}
            action={{
                label: 'Close',
                onPress: () => setVisible(false)
            }}
        >
            <View style={styles.grid}>
                <Button 
                    icon={iconName} 
                    color={severity === "error" ? '#660000' : '#106124'} />
                <Text style={messageStyle}>{messageString}</Text>
            </View>
        </Snackbar>
    )
}

AlertBar.propTypes = {
    visible: PropTypes.bool.isRequired,
    severity: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired
}

const styles = StyleSheet.create({
    errorRed: {
        color: '#660000',
    },
    successGreen: {
        color: '#98fb98',
    },
    grid: {
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    dialog: {
        backgroundColor: '#000000',
    }
})