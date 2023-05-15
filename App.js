import 'react-native-get-random-values';
// Built-in
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Platform, ToastAndroid } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useState, useRef, useEffect } from 'react';
import { captureRef } from 'react-native-view-shot';
import * as MediaLibrary from 'expo-media-library'
import * as ImagePicker from 'expo-image-picker';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import domtoimage from 'dom-to-image';
import { v4 as uuidv4 } from 'uuid'


// Custom Components
import Button from './components/Button';
import ImageViewer from './components/ImageViewer';
import IconButton from './components/IconButton';
import CircleButton from './components/CircleButton';
import EmojiPicker from './components/EmojiPicker';
import EmojiList from './components/EmojiList';
import EmojiSticker from './components/EmojiSticker';

const PlaceholderImage = require('./assets/images/background-image.png');


WebBrowser.maybeCompleteAuthSession();

export default function App() {
  const [token, setToken] = useState("");
  const [userInfo, setUserInfo] = useState(null);
  

  const [selectedImage, setSelectedImage] = useState(null);
  const [showAppOptions, setShowAppOptions] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [pickedEmoji, setPickedEmoji] = useState(null);
  const [status, requestPermission] = MediaLibrary.usePermissions();
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: '854809495249-19bltoasl332als48f8dusksq8lnvgsf.apps.googleusercontent.com',
    webClientId: '854809495249-5ot1f698ginq2k2g9lsc2b2o6hnnpjas.apps.googleusercontent.com',
    expoClientId: '854809495249-19bltoasl332als48f8dusksq8lnvgsf.apps.googleusercontent.com',
  });

  useEffect(() => {
    if (response?.type === 'success') {
      setToken(response.authentication.accessToken);
      getUserInfo();
    }
  }, [response, token]);

  const makePayment  =  async () => {
  alert('Processing...');
      try {
        let id = uuidv4();
        // alert('Processing...');
      const response = await fetch(
        "https://dev--paymentsfac.netlify.app/.netlify/functions/express/chargecard",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            "TransactionIdentifier": `${id}`,
            "TotalAmount": getRandomMoney(1, 100),
            "CurrencyCode": "840",
            "ThreeDSecure": false,
            "Source": {
                "CardPan": "4012000000020006",
                "CardCvv": "123",
                "CardExpiration": "2512",
                "CardholderName": "John Doe"
            },
            "OrderIdentifier": `${id}`,
            "BillingAddress": {
                "FirstName": "John",
                "LastName": "Smith",
                "Line1": "1200 Whitewall Blvd.",
                "Line2": "Unit 15",
                "City": "Boston",
                "State": "NY",
                "PostalCode": "200341",
                "CountryCode": "840",
                "EmailAddress": "john.smith@gmail.com",
                "PhoneNumber": "211-345-6790"
            },
            "AddressMatch": false,
            "ExtendedData": {
                "ThreeDSecure": {
                    "ChallengeWindowSize": 4,
                    "ChallengeIndicator": "01"
                },
                "MerchantResponseUrl":  "https://webhook.site/f569946c-cab5-44d6-9e10-23e14057e725"
            }
        })
        }
      );

      const data = await response.json();
      data.Approved ? alert('Payment Approved!') : alert('Payment Declined!');
    } catch (error) {
      console.log(error);
    }
  
  }

  const getUserInfo = async () => {
    try {
      const response = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      const user = await response.json();
      setUserInfo(user);
    } catch (error) {

    }
  };

  const showToast = () => {
    ToastAndroid.show('Request sent successfully!', ToastAndroid.SHORT);
  }

  if (status === null) {
    requestPermission();
  }

  const imageRef = useRef();

  const onEmojiSelected = (emoji) => {
    // console.log(emoji);


  };

  const getRandomMoney = (min, max) => {
    return Number((Math.random() * (max - min) + min).toFixed(2));
  }

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1
    });
    // result.
    if (!result.canceled) {
      // console.log(result);
      setSelectedImage(result.assets[0].uri);
      setShowAppOptions(true);
    }
    else {
      alert('You did not select any image.');
    }
  };

  const onReset = () => {
    setPickedEmoji(null);
    setShowAppOptions(false);
  }

  const onAddSticker = () => {
    // To be implemented
    setShowEmojiPicker(true);
  }

  const onModalClose = () => {
    setShowEmojiPicker(false);
  };

  const onSaveImageAsync = async () => {
    // To be implemented
    console.log('onSaveImageAsync');
    if (Platform.OS !== 'web') {
      try {
        const localUri = await captureRef(imageRef, {
          height: 440,
          quality: 1
        });

        await MediaLibrary.saveToLibraryAsync(localUri);
        if (localUri) {
          alert('Saved!');
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const dataUrl = await domtoimage.toJpeg(imageRef.current, {
          quality: 0.95,
          width: 320,
          height: 440
        });

        let link = document.createElement('a');
        link.download = 'sticker-smash.jpeg';
        link.href = dataUrl;
        link.click();
        // link.remove();
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.imageContainer}>
        <View ref={imageRef} collapsable={false}>
          <ImageViewer placeholderImageSource={PlaceholderImage}
            selectedImage={selectedImage} />
          {
            pickedEmoji !== null ? <EmojiSticker imageSize={40} stickerSource={pickedEmoji} /> : null
          }
        </View>
      </View>
      {
        showAppOptions ?
          (
            <View style={styles.optionsContainer}>
              <View style={styles.optionsRow}>
                <IconButton icon="refresh" label="Reset" onPress={onReset} />
                <CircleButton onPress={onAddSticker} />
                <IconButton icon="save-alt" label="Save" onPress={onSaveImageAsync} />
              </View>
            </View>
          )
          :
          (<View style={styles.footerContainer}>
            <Button theme="primary" label="Choose a photo" onPress={pickImageAsync} />
            <Button label="Use this photo" onPress={() => setShowAppOptions(true)} />
            {/* <Button label="Show Toast" onPress={showToast} /> */}
            <Button
              label="Sign in with Google"
              disabled={!request}
              onPress={promptAsync} />
            <Button
              label="Pay Now"
              onPress={makePayment} />
          </View>)
      }
      <EmojiPicker isVisible={showEmojiPicker} onClose={onModalClose}>
        <EmojiList onSelect={setPickedEmoji} onCloseModal={onModalClose} />
      </EmojiPicker>

      <StatusBar style="light" />
    </GestureHandlerRootView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    flex: 1,
    paddingTop: 58
  },
  image: {
    width: 320,
    height: 440,
    borderRadius: 18
  },
  footerContainer: {
    flex: 1 / 2,
    alignItems: 'center',
  },
  optionsContainer: {
    position: 'absolute',
    bottom: 80
  },
  optionsRow: {
    alignItems: 'center',
    flexDirection: 'row'
  }
});
