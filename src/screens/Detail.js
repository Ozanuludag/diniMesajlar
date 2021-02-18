import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import mesajlarData from '../../assets/data/mesajlarData';
import Share from 'react-native-share';

const Detail = ({route}) => {
  const [dataContent, setDataContent] = useState([]);

  if (dataContent.length < 1) {
    setDataContent(mesajlarData[0][route.name]);
  }

  const shareMessage = async (mesaj) => {
    const shareOptions = {
      message: `${mesaj}`,
    };
    const ShareImage = await Share.open(shareOptions);
  };

  const createTwoButtonAlert = (mesaj) =>
    Alert.alert(
      'Mesaj Paylaşılsın Mı?',
      `${mesaj}`,
      [
        {
          text: 'Hayır',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'Evet', onPress: () => shareMessage(mesaj)},
      ],
      {cancelable: false},
    );

  return (
    <View style={{flex: 1, backgroundColor: '#a58e65'}}>
      <FlatList
        data={dataContent}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              onPress={() => createTwoButtonAlert(item.mesaj)}
              style={{
                flexDirection: 'row',
                borderWidth: 1,
                borderColor: '#ded4a0',
                borderRadius: 10,
                marginTop: 5,
                marginHorizontal: 2,
                backgroundColor: '#ded4a0',
                padding:5
              }}>
              <Text style={{fontSize: 18, marginHorizontal: 5}}>
                {item.id}-) {item.mesaj}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default Detail;

const styles = StyleSheet.create({});
