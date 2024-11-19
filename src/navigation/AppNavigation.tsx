import React from 'react';
import { Button, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainScreen from '../screeens/main';
import FormRenderer from '../screeens/renderform';

// Define Types for Stack Parameters
export type RootStackParamList = {
  Home: undefined; // Home screen has no params
  Details: {htmlContent: string};
};

// Create Stack Navigator with TypeScript
const Stack = createNativeStackNavigator<RootStackParamList>();

// Home Screen Component
const HomeScreen: React.FC<{ navigation: any }> = ({ navigation }) => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Home Screen</Text>
    <Button
      title="Go to Details"
      onPress={() =>
        navigation.navigate('Details', { itemId: 42, otherParam: 'Hello World!' })
      }
    />
  </View>
);



// Main App Component
const AppNavigation: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={MainScreen} />
        <Stack.Screen name="Detail" component={FormRenderer} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
