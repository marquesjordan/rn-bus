import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator} from 'react-navigation-stack';
import {Provider as ScheduleProvider} from './src/contexts/scheduleContext';
import SelectStopsScreen from './src/screens/scheduleFlow/selectStopsScreen';
import NextStopsScreen from './src/screens/scheduleFlow/nextStopsScreen';
import { setNavigator} from './src/navigationRef';

const switchNavigator = createSwitchNavigator({
  scheduleFlow: createStackNavigator({
    stopsSelect: {
      screen: SelectStopsScreen
    },
    nextStops: {
      screen: NextStopsScreen
    }
  })
});

const App = createAppContainer(switchNavigator);

export default () => {
  return (
    <ScheduleProvider>
      <App ref={(navigator) => {setNavigator(navigator)}} />
    </ScheduleProvider>
  )
}

