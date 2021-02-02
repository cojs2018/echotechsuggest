import React from 'react';
import PropTypes from 'prop-types';
import { Banner } from 'react-native-paper';
import { StyleSheet } from 'react-native';

export default function AlertBar(props) {
    const {
        visible,
        setVisible,
        severity,
        message
    } = props;

    const iconName = severity === "error" ? "error" : "alert-circle-check";
    const messageStyle = severity === "error" ? styles.errorRed : styles.successGreen;

    return (
        <Banner
            style={messageStyle}
            visible={visible}
            actions={[{
                label: 'Close',
                onPress: () => setVisible(false)
            }]}
            icon={iconName}
        >
                {message}
        </Banner>
    )
}

AlertBar.propTypes = {
    visible: PropTypes.bool.isRequired,
    setVisible: PropTypes.func.isRequired,
    severity: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired
}

const styles = StyleSheet.create({
    errorRed: {
        backgroundColor: '#e9967a',
        color: '#ff0000'
    },
    successGreen: {
        backgroundColor: '#98fb98',
        color: '#008000'
    }
})