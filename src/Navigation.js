import React from 'react';
import HomeScreen from './screens/HomeScreen';
import {NavigationContainer, DrawerActions} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Detail from './screens/Detail';
import Icon from 'react-native-vector-icons/Ionicons';
import {View, Text} from 'react-native';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

function DrawerRoutes() {
  return (
    <Drawer.Navigator
      initialRouteName="Cuma Mesajları"
      drawerStyle={{
        backgroundColor: '#ded4a0',
      }}>
      <Drawer.Screen name="Resimli Cuma Mesajları" component={HomeScreen} />
      <Drawer.Screen name="Hayırlı Günler Mesajları" component={Detail} />
      <Drawer.Screen name="Berat Kandili Mesajları" component={Detail} />
      <Drawer.Screen name="Miraç Kandili Mesajları" component={Detail} />
      <Drawer.Screen name="Mevlid Kandili Mesajları" component={Detail} />
      <Drawer.Screen name="Regâip Kandili Mesajları" component={Detail} />
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
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={{marginRight: 5, fontSize: 16, color: '#FFF'}}>
                  Değerlendir!
                </Text>
                <Icon
                  name="star"
                  size={34}
                  color={'yellow'}
                  style={{marginRight: 10}}
                  onPress={() =>
                    navigation.dispatch(DrawerActions.openDrawer())
                  }
                />
              </View>
            ),
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;
