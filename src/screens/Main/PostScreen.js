import React, {useState, useContext, useEffect} from 'react';
import {Alert, Image, Modal, Pressable, StyleSheet, TouchableOpacity, View } from 'react-native';
import ModalFilterPicker from 'react-native-modal-filter-picker';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

import MainScreenTemplate from '../../components/ScreenTemplate/MainScreenTemplate';
import Text from '../../components/Text';
import Button, {ButtonType, Separator} from '../../components/Button';
import { AuthContext, AppContext } from '../../context';
import {TextType} from '../../theme/typography';
import {unitH, unitW} from '../../theme/constant';
import {PrimaryColors, SecondaryColors} from '../../theme/colors'; 

export const PostScreen = ({navigation}) => {
    const authContext = useContext(AuthContext);
    const appContext = useContext(AppContext);

    const [types, setTypes] = useState([]);
    const [selectedType, setSelectedType] = useState();
    const [visible, setVisible] = useState(false);

    const [image, setImage] = useState();
    const [showModal, setShowModal] = useState(false);
    const [number, setNumber] = useState(0);

    useEffect(() => {
      (async () => {
        const res = await appContext.getTypeList();
        var types = [];
        for (let i = 0; i < res.length; i++) {
          types.push({
            key: i,
            label: res[i].FieldText,
            name: res[i].FieldText,
            Region: res[i].Region,
            ID: res[i].ID,
          });
        }
        setTypes(types);
      })()
    }, []);

    const options = {
      maxWidth: 2000,
      maxHeight: 2000,
      storageOptions: {
        skipBackup: true,
        path: 'images'
      }
    };

    const launchGalleryAction = async () => {
      setShowModal(false);

      const response = await launchImageLibrary(options);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const {assets} = response;
        const source = { uri: assets[0].uri };
        console.log(source);
        setImage(source);
      }
    };

    const launchCameraAcion = async () => {
      setShowModal(false);

      const response = await launchCamera(options);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const {assets} = response;
        const source = { uri: assets[0].uri };
        console.log(source);
        setImage(source);
      }
    } 

    const uploadImage = async () => {
      // if (image == undefined) {return}
      console.log("############### image", selectedType);

      const { uri } = image;
      const filename = uri.substring(uri.lastIndexOf('/') + 1);
      const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
      const res = await appContext.uploadPost({photo: uploadUri, type: selectedType, number: number.toString()});
      console.log("###############", res);
      Alert.alert(
        'Photo uploaded!',
        'Your photo has been uploaded to Firebase Cloud Storage!'
      );
      setImage(null);
    };

    /* number */
    const increaseNumber = () =>  {
      setNumber(number + 1);
    }

    const decreaseNumber = () => {
      if (number == 0) {return}
      setNumber(number - 1);
    }

    /* dropdown  */

    const onShow = () => {
      setVisible(true);
    }

    const onSelect = (type) => {
      setSelectedType(type);
      setVisible(false);
    }

    const onCancel = () => {
      setVisible(false);
    }

    return (
      <>
        <Modal 
          visible={showModal}
          transparent={true}
          style={styles.modal}>
          <View style={styles.modalContent}>
            <Text type={TextType.BODY_3}>Choose the Photo Source</Text>
            <Button
              title={"Take a photo from Camera"}
              onPress={launchCameraAcion}
              containerStyle={styles.button}
            />
            <Button
              title={"Select a photo from Gallery"}
              onPress={launchGalleryAction}
              containerStyle={styles.button}
            />
          </View>  
        </Modal>
        <MainScreenTemplate>
          <Separator style={styles.spacer}/>
          <View style={styles.body}>
            <Text type={TextType.HEADER_4} style={styles.subTitle}>Please post the photo and choose type</Text>
            <View style={styles.textInputContainer}>
              <Button
                onPress={onShow}
                title={"Choose Photo Type"}
                containerStyle={styles.typeButton}
              />
              {selectedType!=null ? <Text type={TextType.BODY_3} style={styles.typeText}>{"Type:  " + selectedType.name}</Text> : <></>}
              <ModalFilterPicker
                visible={visible}
                onSelect={(selection) => onSelect(selection)}
                onCancel={onCancel}
                options={types}
              />
            </View>
            <Separator style={styles.horizontalLine}/>
            <View style={styles.textInputContainer}>
              <Text type={TextType.HEADER_1} style={styles.number}>{number.toString()}</Text>
              <View style={styles.buttons}>
                <TouchableOpacity
                  style={styles.minusButton}
                  onPress={decreaseNumber}>
                  <Text type={TextType.HEADER_2}>-</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.plusButton}
                  onPress={increaseNumber}>
                    <Text type={TextType.HEADER_2}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
            <Button
              onPress={() => setShowModal(true)}
              title={"Select Photo"}
              containerStyle={styles.button}
            />
            <View style={styles.imageContainer}>
              {image&&<Image 
                resizeMode='contain'
                source={{ uri: image.uri }} 
                style={styles.imageBox} 
              />}
            </View>
            <Button
              onPress={uploadImage}
              title={"Upload Photo"}
              containerStyle={styles.button}
            />
          </View>
          <Separator style={styles.spacer}/>
        </MainScreenTemplate>
      </>
    );
}

const styles  = StyleSheet.create({
    subTitle: {
        fontSize: unitH * 50,
        marginBottom: unitH * 50,
    },
    body: {
      flex: 1,
      justifyContent: 'center',
      alignContent: 'center'  
    },
    textInputContainer: {
        alignItems: 'flex-start',
        alignSelf: 'center',
        width: '66%',
    },
    typeButton: {
      alignSelf: 'center',
      width: '100%',
      marginTop: unitH * 80,
    },
    typeText: {
      alignSelf: 'center',
      marginTop: unitH * 50,
      marginBottom: unitH * 50,   
    }, 
    horizontalLine: {
      width: '90%',
      alignSelf: 'center',
      height: unitH * 5,
      backgroundColor: PrimaryColors.White,
      marginBottom: unitH * 50,
      marginTop: unitH * 50,
    },   
    button: {
      alignSelf: 'center',
      width: '66%',
      marginTop: unitH * 80,
    },
    imageContainer: {
      alignSelf: 'center',
      width: unitH * 500,
      height: unitH * 500,
      marginTop: unitH * 50,
      borderWidth: 1,
      borderRadius: 5,
      borderColor: PrimaryColors.Gray,
    },
    imageBox: {
      width: unitH * 500,
      height: unitH * 500,
      justifyContent: 'center',
      alignSelf: 'center',
    },
    modal: {
      // marginTop: unitH * 300,
      position: 'absolute',
      width: '100%',
      height: '100%',
      justifyContent: 'center',
    },
    modalContent: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22,
      backgroundColor: PrimaryColors.Blue,
    },
    /* +/- */
    number: {
      alignSelf: 'center',
      color: PrimaryColors.Black,
      height: unitH * 220,
      width: unitH * 220,
      borderRadius: unitH * 50,
      backgroundColor: PrimaryColors.White,
      marginBottom: unitH * 50,
    },
    buttons: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center'
    },
    minusButton: {
      justifyContent: 'center',
      height: unitH * 220,
      width: unitH * 220,
      borderColor: PrimaryColors.White,
      borderTopLeftRadius: unitH * 50,
      borderBottomLeftRadius: unitH * 50,
      borderWidth: unitH * 10,
    },
    plusButton: {
      justifyContent: 'center',
      height: unitH * 220,
      width: unitH * 220,
      borderColor: PrimaryColors.White,
      borderBottomWidth: unitH * 10,
      borderTopWidth: unitH * 10,
      borderRightWidth: unitH * 10,
      borderTopRightRadius: unitH * 50,
      borderBottomRightRadius: unitH * 50,
    },
    /* spacer */
    spacer: {height: unitH * 70},
});
