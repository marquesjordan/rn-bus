import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import moment from 'moment';

const Time = () => {

    // Used if we need to pass time to function
    const [currentTime, setCurrentTime] = useState(null);

    useEffect(() => {
        const timer = setInterval( () => {
            setCurrentTime(new Date().toLocaleString())
          }, 1000)

          return () => clearInterval(timer);

    }, [])

    return (
        <View style={styles.container}>
            <Text style={styles.time}>{moment().format('h:mm:ss a')}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 20,
        alignItems: 'center'
    },
    time: {
        fontSize: 40
    }
});

export default Time;