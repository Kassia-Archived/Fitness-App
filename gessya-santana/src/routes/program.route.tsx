import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Feather } from '@expo/vector-icons'; 
import colors from '../styles/colors';
import { Programs } from '../pages/Programs';
import { Program } from '../pages/Program';
import AuthRoutes from './tab.routes';
import { ProgramProps } from '../libs/storage';
import { Lesson } from '../pages/Lesson';
  

const StackRoutes = createStackNavigator();

const ProgramRoutes: React.FC = () => (
    <StackRoutes.Navigator
        initialRouteName={"Programs"}
        screenOptions={{
            cardStyle: {
                backgroundColor: colors.background
            }
        }}
    >
        <StackRoutes.Screen 
            name="Programs"
            component={Programs}
            options={{ headerShown: false }}
        />
        <StackRoutes.Screen 
            name="Program"
            component={Program}
            options={({ navigation, route }) => ({
                headerTransparent: true,
                headerStyle: {
                    elevation: 0,
                    shadowOpacity: 0,
                    borderBottomWidth: 0,
                },
                headerTintColor: colors.white,
                headerLeft: () => (
                    <Feather 
                        name="arrow-left" 
                        size={24} 
                        color={colors.white}
                        style={{ paddingHorizontal: 10 }}
                        onPress={() => navigation.goBack()}
                    />
                ),
            })}
        />
        <StackRoutes.Screen 
            name="Lesson"
            component={Lesson}
            options={({ navigation, route }) => ({
                headerStyle: {
                    elevation: 0,
                    shadowOpacity: 0,
                    borderBottomWidth: 0,
                    backgroundColor: colors.background
                },
                headerTintColor: colors.white,
                headerLeft: () => (
                    <Feather 
                        name="arrow-left" 
                        size={24} 
                        color={colors.white}
                        style={{ paddingHorizontal: 10 }}
                        onPress={() => navigation.goBack()}
                    />
                ),
            })}
        />
    </StackRoutes.Navigator>
)

export default ProgramRoutes;