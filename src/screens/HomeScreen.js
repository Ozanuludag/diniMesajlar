import 'react-native-gesture-handler';
import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  Dimensions,
  TouchableOpacity,
  Button,
  PermissionsAndroid,
  ActivityIndicator,
} from 'react-native';
import cumaData from '../../assets/data/cumaMsgData';
import Share from 'react-native-share';
import ImgToBase64 from 'react-native-image-base64';

//import base64 from 'react-native-base64';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const HomeScreen = () => {
  const [loading, setLoading] = useState(false);

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
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      {loading ? <ActivityIndicator size="large" color="#00ff00" /> : null}
     
      <FlatList
        data={cumaData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({item}) => {
          return (
            <View
              style={{
                marginVertical: 5,
                padding: 10,
                borderRadius: 10,
                backgroundColor: 'white',
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
    borderRadius: 10,
  },
  shareBtn: {
    width: windowWidth * 0.8,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#2a9d8f',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#006C35',
    marginTop: 5,
  },
});
