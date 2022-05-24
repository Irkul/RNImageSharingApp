import React, {useState, useContext} from 'react';
import { Image, Modal, Pressable, StyleSheet, View } from 'react-native';
// import ModalFilterPicker from 'react-native-modal-filter-picker';
import SearchableDropdown from 'react-native-searchable-dropdown';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

import BlankScreenTemplate from '../../components/ScreenTemplate/BlankScreenTemplate';
import Text from '../../components/Text';
import Button, {ButtonType} from '../../components/Button';
import { AuthContext } from '../../context';
import {TextType} from '../../theme/typography';
import {unitH, unitW} from '../../theme/constant';
import {PrimaryColors} from '../../theme/colors'; 

const items = [
  {
    id: 1,
    name: 'JavaScript',
  },
  {
    id: 2,
    name: 'Java',
  },
  {
    id: 3,
    name: 'Ruby',
  },
  {
    id: 4,
    name: 'React Native',
  },
  {
    id: 5,
    name: 'PHP',
  },
  {
    id: 6,
    name: 'Python',
  },
  {
    id: 7,
    name: 'Go',
  },
  {
    id: 8,
    name: 'Swift',
  },
];

export const PostScreen = ({navigation}) => {
    const authContext = useContext(AuthContext);

    const [selectedItems, setSelectedItems] = useState([]);
    const [image, setImage] = useState();
    const [uploading, setUploading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    
    const options = {
      maxWidth: 2000,
      maxHeight: 2000,
      storageOptions: {
        skipBackup: true,
        path: 'images'
      }
    };

    const launchGalleryAction = async () => {
      const response = await launchImageLibrary(options);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = { uri: response.uri };
        console.log(source);
        setImage(source);
      }
    };

    const launchCameraAcion = async () => {
      // You can also use as a promise without 'callback':
      const result = await launchCamera(options);
      console.log("####", result);
      // if (result.didCancel) {
      //   console.log('User cancelled image picker');
      // } else if (response.error) {
      //   console.log('ImagePicker Error: ', response.error);
      // } else if (response.customButton) {
      //   console.log('User tapped custom button: ', response.customButton);
      // } else {
      //   const source = { uri: response.uri };
      //   console.log(source);
      //   setImage(source);
      // }
    } 

    const uploadImage = async () => {
      if (image == undefined) {return}
      console.log("############### image", image);

      const { uri } = image;
      const filename = uri.substring(uri.lastIndexOf('/') + 1);
      const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
      const res = await authContext.uploadImage(uploadUri);
      console.log("###############", res);
      Alert.alert(
        'Photo uploaded!',
        'Your photo has been uploaded to Firebase Cloud Storage!'
      );
      setImage(null);
    };

    return (
        <BlankScreenTemplate>
          <Text type={TextType.HEADER_4} style={styles.subTitle}>Please post the photo and choose type</Text>
          <View style={styles.textInputContainer}>
              <Text type={TextType.BODY_1} style={styles.textInputLabel}>
                  Type
              </Text>
              <SearchableDropdown
                  onItemSelect={(item) => {
                      const items = selectedItems;
                      items.push(item)
                      setSelectedItems(items);
                  }}
                  containerStyle={styles.dropDownContainer}
                  onRemoveItem={(item, index) => {
                      const items = selectedItems.filter((sitem) => sitem.id !== item.id);
                      setSelectedItems(items);
                  }}
                  itemStyle={styles.dropDownItemStyle}
                  itemTextStyle={styles.dropDownItemTextStyle}
                  itemsContainerStyle={{ maxHeight: 140 }}
                  items={items}
                  defaultIndex={2}
                  resetValue={false}
                  textInputProps={{
                      placeholder: "Choose photo type",
                      underlineColorAndroid: "transparent",
                      style: {
                          padding: 12,
                          width: '100%',
                          borderWidth: 1,
                          borderColor: '#ccc',
                          borderRadius: 5,
                      },
                      onTextChange: text => {}
                  }}
                  listProps={{
                      nestedScrollEnabled: true,
                  }}
              />


          </View>
          <Button
            onPress={() => setShowModal(true)}
            type={ButtonType.WHITE}
            title={"Select Photo"}
            containerStyle={styles.button}
          />
          <View style={styles.imageContainer}>
            {image&&<Image source={{ uri: image.uri }} style={styles.imageBox} />}

          </View>
          <Button
            onPress={uploadImage}
            type={ButtonType.WHITE}
            title={"Upload Photo"}
            containerStyle={styles.button}
          />
          {showModal&&<Modal>
            <View style={styles.modal}>
              <Text type={TextType.BODY_3}>Modal</Text>
              <Button 
                onPress={launchCameraAcion}
              />
            </View>  
          </Modal>}
        </BlankScreenTemplate>
    );
}

const styles  = StyleSheet.create({
    subTitle: {
        fontSize: unitH * 50,
        marginBottom: unitH * 50,
    },
    textInputContainer: {
        alignItems: 'flex-start',
        alignSelf: 'center',
        width: '66%',
    },
    textInputLabel: {
        marginBottom: unitH * 20,
    },
    dropDownContainer: {
      width: '100%',
      padding: 5, 
    },
    dropDownItemStyle: {
      padding: 10,
      marginTop: 2,
      backgroundColor: '#ddd',
      borderColor: '#bbb',
      borderWidth: 1,
      borderRadius: 5,
    },
    dropDownItemTextStyle: {
      color: '#222'  
    },
    button: {
      alignSelf: 'center',
      width: '66%',
      borderWidth: 0.7,
      borderRadius: 0,
      marginTop: unitH * 80,
    },
    imageContainer: {
      marginTop: 30,
      marginBottom: 50,
      alignItems: 'center'
    },
    progressBarContainer: {
      marginTop: 20
    },
    imageBox: {
      width: 300,
      height: 300
    },
    imageContainer: {
        alignSelf: 'center',
        width: unitH * 500,
        height: unitH * 500,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: PrimaryColors.Gray,
    },
    modal: {
      position: 'absolute',
      justifyContent: 'center',
      alignSelf: 'center',
      width: unitW * 300,
      height: unitH * 400
    },
});
