import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { Profile } from '../pages/Profile';
import { Home } from '../pages/Home';

import colors from '../styles/colors';
import ProgramRoutes from './program.route';
import { AuthContextProvider } from '../contexts/Auth';

const AppTab = createBottomTabNavigator();

const AuthRoutes = () => {
    return (
        <AuthContextProvider>
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
                            <Icon 
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
                            <Icon 
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
                            <Icon 
                                name="account-circle"
                                size={size}
                                color={color}
                            />
                        ))
                    }}
                />
            </AppTab.Navigator>
        </AuthContextProvider>
    )
}

export default AuthRoutes;
