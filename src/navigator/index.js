import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import StackScreen from './stackNavigation';


const RootNavigator = () => {
    return(
        <NavigationContainer>
            <StackScreen/>
        </NavigationContainer>
    )
}

export default RootNavigator;