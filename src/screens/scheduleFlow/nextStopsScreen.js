import React, {useEffect, useContext, useState} from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import {Context as ScheduleContext} from '../../contexts/scheduleContext';
import Time from '../../components/time';

const NextStopsScreen = ({navigation}) => {

    const {state, getStopTimes} = useContext(ScheduleContext);
    const [currentMin, setCurrentMin] = useState(null);

    useEffect(() => {

        const list = navigation.state.params.list.map( (item) => {
            return item.value
        });

        const timer = setInterval( () => {
            var d = new Date();
            var n = d.getMinutes();
            if ( n !== currentMin) {
                setCurrentMin(n);
            }
        }, 1000)

        getStopTimes({"stops": list})
        return () => clearInterval(timer);

    }, [currentMin]);

    const _render = (item) => {
        return (
            <View style={styles.itemContainer}>
                <View>
                    <Text style={styles.title}>Stop {item.stop}:</Text>
                </View>
                <View style={styles.route}>
                    <Text style={styles.details}>Route 1:</Text>
                    <Text style={styles.details}>{item.route1.time1},</Text>
                    <Text style={styles.details}>{item.route1.time2}</Text>
                </View>
                <View style={styles.route}>
                    <Text style={styles.details}>Route 2:</Text>
                    <Text style={styles.details}>{item.route2.time1},</Text>
                    <Text style={styles.details}>{item.route2.time2}</Text>
                </View>
                <View style={styles.route}>
                    <Text style={styles.details}>Route 3:</Text>
                    <Text style={styles.details}>{item.route3.time1},</Text>
                    <Text style={styles.details}>{item.route3.time2}</Text>
                </View>
            </View>
        )
    }

    return (
        <View style={styles.body}>
            <View>
                <Time />
            </View>
            <View style={styles.titleConatiner}>
                <Text style={styles.header}>Next 2 Stop Times</Text>
            </View>
            {state.routes && (
                <FlatList
                    data={state.routes}
                    renderItem={({ item }) => _render(item)}
                    keyExtractor={item => item["route1"]["time1"]}
                />
            )}
        </View>
    )
}

NextStopsScreen.navigationOptions = ({navigation}) => {
    return {
      headerTitle: "Upcominig Stops",
      headerTintColor: '#000'
    }
}

const styles = StyleSheet.create({
    body: {
        flex: 1
    },
    titleConatiner: {
        marginVertical: 20
    },
    header: {
        fontWeight: 'bold',
        fontSize: 22,
        textAlign: 'center',
    },
    title: {
        fontWeight: 'bold',
        fontSize: 22,
        textAlign: 'center',
        textAlign: 'left'
    },
    details: {
        fontSize: 18,
        marginRight: 10
    },
    itemContainer: {
        flex: 1,
        marginVertical: 10,
        backgroundColor: '#fff',
        padding: 10
    },
    route: {
        flexDirection:'row',
        alignContent: 'center'
    }
});



export default NextStopsScreen;