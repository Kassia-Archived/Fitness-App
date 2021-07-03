import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import colors from '../styles/colors';
import { Welcome } from '../pages/Welcome';

const StackRoutes = createStackNavigator();

const AppRoutes: React.FC = () => (
    <StackRoutes.Navigator
        headerMode="none"
        screenOptions={{
            cardStyle: {
                backgroundColor: colors.background
            }
        }}
    >
        <StackRoutes.Screen 
            name="Welcome"
            component={Welcome}
        />
    </StackRoutes.Navigator>
)

export default AppRoutes;