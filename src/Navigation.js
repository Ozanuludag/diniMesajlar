import React from 'react';
import HomeScreen from './screens/HomeScreen';
import {NavigationContainer, DrawerActions} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator, useIsDrawerOpen} from '@react-navigation/drawer';
import Detail from './screens/Detail';
import Icon from 'react-native-vector-icons/Ionicons';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

function DrawerRoutes() {
  return (
    <Drawer.Navigator initialRouteName="Cuma Mesajları">
      <Drawer.Screen name="Cuma Mesajları" component={HomeScreen} />
      <Drawer.Screen name="Hayırlı Günler Mesajları" component={Detail} />
      <Drawer.Screen name="Berat Kandili Mesajları" component={Detail} />
      <Drawer.Screen name="Miraç Kandili Mesajları" component={Detail} />
      <Drawer.Screen name="Mevlid Kandili Mesajları" component={Detail} />
      <Drawer.Screen name="Regaip Kandili Mesajları" component={Detail} />
    </Drawer.Navigator>
  );
}
function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#006C35',
          },
          headerTintColor: '#fff',
        }}>
        <Stack.Screen
          name="Anasayfa"
          component={DrawerRoutes}
          options={({navigation}) => ({
            headerLeft: () => (
              <Icon
                name="menu-outline"
                size={34}
                color={'#FFF'}
                style={{marginLeft: 10}}
                onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
              />
            ),
            headerRight: () => (
              <Icon
                name="menu-outline"
                size={34}
                color={'#FFF'}
                style={{marginLeft: 10}}
                onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
              />
            ),
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;
