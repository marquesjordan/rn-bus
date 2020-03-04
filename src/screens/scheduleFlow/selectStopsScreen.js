import _ from 'lodash';
import React, {useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, FlatList, Alert} from 'react-native';
import {CheckBox} from 'react-native-elements';
import Time from '../../components/time';

const STOPS = [
    {name: "Stop 1", value: 1, checked: false},
    {name: "Stop 2", value: 2, checked: false},
    {name: "Stop 3", value: 3, checked: false},
    {name: "Stop 4", value: 4, checked: false},
    {name: "Stop 5", value: 5, checked: false},
    {name: "Stop 6", value: 6, checked: false},
    {name: "Stop 7", value: 7, checked: false},
    {name: "Stop 8", value: 8, checked: false},
    {name: "Stop 9", value: 9, checked: false},
    {name: "Stop 10", value: 10, checked: false}
]

const SelectStopsScreen = ({navigation}) => {

    useEffect(() => {
        navigation.setParams({'onNext': showRoutes, 'data': STOPS})
    }, [])

    const _render = (item) => {
        return (
            <View style={styles.itemContainer}>
                <Text>{item.name}</Text>
                <CheckBox
                    checked={item.checked}
                    onPress={() => onSelected(item)}
                />
            </View>
        )
    }

    const onSelected = (item) => {
        let data = navigation.getParam('data');
        const index = _.findIndex(data, { 'name': item.name});;
        data[index].checked = !data[index].checked;
        navigation.setParams({'data': data});
    }

    const showRoutes = (list) => {
        const selectedList = list.filter((item) => {
            return item.checked;
        })

        if (!selectedList.length) {
            Alert.alert(
                'Stop Selection',
                'You must select at least 1 stop.',
                [
                  {text: 'Okay', onPress: () => console.log('OK Pressed'), style: 'cancel',},
                ],
                {cancelable: false},
            );
        } else {
            navigation.navigate('nextStops', {list: selectedList});
        }

    }

    return (
        <View style={styles.body}>
            <View>
                <Time />
            </View>
            <View style={styles.titleConatiner}>
                <Text style={styles.title}>Select Stops</Text>
            </View>
            <View style={styles.listContainer}>
                <FlatList
                    data={navigation.getParam('data')}
                    renderItem={({ item }) => _render(item)}
                    keyExtractor={item => item.name}
                />
            </View>
        </View>
    )
}

SelectStopsScreen.navigationOptions = ({navigation}) => {
    return {
      headerTitle: "Bus Stops",
      headerTintColor: '#000',
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.getParam('onNext')(navigation.getParam('data'))}> 
            <Text style={{ fontSize: 18, color: '#6F9FD8', paddingHorizontal: 10}}>Next</Text>
        </TouchableOpacity>
      )
    }
}

const styles = StyleSheet.create({
    body: {
        flex: 1
    },
    titleConatiner: {
        marginVertical: 20
    },
    title: {
        fontWeight: 'bold',
        fontSize: 22,
        textAlign: 'center'
    },
    itemContainer: {
        flex: 1,
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: "center",
        borderTopWidth: 1,
        backgroundColor: '#fff'
    },
    listContainer: {
        flex: 1
    }
});

export default SelectStopsScreen;