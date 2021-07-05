import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';

import { Profile } from '../pages/Profile';
import { Home } from '../pages/Home';

import colors from '../styles/colors';
import ProgramRoutes from './program.route';

const AppTab = createBottomTabNavigator();

const AuthRoutes = () => {
    return (
        <AppTab.Navigator
            initialRouteName={"Inicio"}
            tabBarOptions={{
                activeTintColor: colors.red,
                inactiveTintColor: colors.gray,
                labelPosition: 'beside-icon',
                style: {
                    paddingHorizontal: 20,
                    height: 70,
                    backgroundColor: "#232323",
                    borderTopWidth: 0,
                },
            }}
        >
            <AppTab.Screen
                name="Programas"
                component={ProgramRoutes}
                options={{
                    tabBarIcon: (({ size, color }) => (
                        <MaterialIcons 
                            name="video-collection"
                            size={size}
                            color={color}
                        />
                    ))
                }}
            />
            <AppTab.Screen
                name="Inicio"
                component={Home}
                options={{
                    tabBarIcon: (({ size, color }) => (
                        <MaterialIcons 
                            name="home"
                            size={size}
                            color={color}
                        />
                    ))
                }}
            />
            <AppTab.Screen
                name="Perfil"
                component={Profile}
                options={{
                    tabBarIcon: (({ size, color }) => (
                        <MaterialIcons 
                            name="account-circle"
                            size={size}
                            color={color}
                        />
                    ))
                }}
            />
            

        </AppTab.Navigator>
    )
}

export default AuthRoutes;
