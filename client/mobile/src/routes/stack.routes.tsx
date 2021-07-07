import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import colors from '../styles/colors';
import { Welcome } from '../pages/Welcome';
import AuthRoutes from './tab.routes';

const StackRoutes = createStackNavigator();

const AppRoutes: React.FC = () => (
    <StackRoutes.Navigator
        initialRouteName={"Welcome"}
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
        <StackRoutes.Screen 
            name="Auth"
            component={AuthRoutes}
        />
    </StackRoutes.Navigator>
)

export default AppRoutes;