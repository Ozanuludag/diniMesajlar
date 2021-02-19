import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  Dimensions,
  TouchableOpacity,
  PermissionsAndroid,
} from 'react-native';
import cumaData from '../../assets/data/cumaMsgData';
import Share from 'react-native-share';
import ImgToBase64 from 'react-native-image-base64';
import PushNotification from 'react-native-push-notification';

//import base64 from 'react-native-base64';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const HomeScreen = () => {
 
    // Must be outside of any component LifeCycle (such as `componentDidMount`).
    PushNotification.configure({
      // (optional) Called when Token is generated (iOS and Android)
      onRegister: function (token) {
        console.log('TOKEN:', token);
      },

      // (required) Called when a remote is received or opened, or local notification is opened
      onNotification: function (notification) {
        console.log('NOTIFICATION:', notification);

        // process the notification
      },

      // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
      onAction: function (notification) {
        console.log('ACTION:', notification.action);
        console.log('NOTIFICATION:', notification);

        // process the action
      },

      // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
      onRegistrationError: function (err) {
        console.error(err.message, err);
      },

      // Should the initial notification be popped automatically
      // default: true
      popInitialNotification: true,

      /**
       * (optional) default: true
       * - Specified if permissions (ios) and token (android and ios) will requested or not,
       * - if not, you must call PushNotificationsHandler.requestPermissions() later
       * - if you are not using remote notification or do not have Firebase installed, use this:
       *     requestPermissions: Platform.OS === 'ios'
       */
      requestPermissions: Platform.OS === 'ios'
    });

   /* PushNotification.createChannel(
      {
        channelId: "channel-id", // (required)
        channelName: "My channel", // (required)
        channelDescription: "A channel to categorise your notifications", // (optional) default: undefined.
        playSound: false, // (optional) default: true
        soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
        importance: 4, // (optional) default: 4. Int value of the Android notification importance
        vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
      },
      (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
    );*/

    const test = () => {
      PushNotification.localNotification({
        channelId: "channel-id",
        message: "My Notification Message", // (required)
      })
    }
    test();

  const myCustomShare = async (image) => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        const imgURI = Image.resolveAssetSource(image).uri;
        let p1 = await ImgToBase64.getBase64String(imgURI);

        const shareOptions = {
          url: `data:image/png;base64,${p1}`,
        };

        const ShareImage = await Share.open(shareOptions);
      } else {
        console.log('Camera permission denied');
      }
    } catch (error) {
      console.log('Error => ', error);
    }
  };
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#a58e65',
      }}>
      {/*loading ? <ActivityIndicator size="large" color="#00ff00" /> : null*/}

      <FlatList
        data={cumaData}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({item}) => {
          return (
            <View
              style={{
                marginVertical: 5,
                padding: 10,
                borderRadius: 10,
                borderColor: '#ded4a0',
                backgroundColor: '#ded4a0',
                elevation: 3,
              }}>
              <Image style={styles.image} source={item.image} />
              <TouchableOpacity
                onPress={() => myCustomShare(item.image)}
                style={styles.shareBtn}>
                <Text style={{fontSize: 20, color: '#FFF'}}>Paylaş</Text>
              </TouchableOpacity>
            </View>
          );
        }}
      />

      <View
        style={{
          height: windowHeight * 0.1,
          borderWidth: 1,
          borderColor: 'red',
          width: windowWidth,
        }}>
        <Text style={{fontSize: 24}}>Add Area</Text>
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  image: {
    resizeMode: 'stretch',
    width: windowWidth * 0.8,
    height: 300,
    borderRadius: 5,
  },
  shareBtn: {
    width: windowWidth * 0.8,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#2a9d8f',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#006C35',
    marginTop: 5,
  },
});
