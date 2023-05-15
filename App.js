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
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import PaymentScreen from './views/PaymentScreen';
import PhotoPickerScreen from './views/PhotoPickerScreen';

const PlaceholderImage = require('./assets/images/background-image.png');
import { useNavigation } from '@react-navigation/native';


const Stack = createNativeStackNavigator();
WebBrowser.maybeCompleteAuthSession();

const Main = () => {
  const navigation = useNavigation();
  const [emoji, setEmoji] = useState(null);
  const [emojiListVisible, setEmojiListVisible] = useState(false);
  const [emojiStickerVisible, setEmojiStickerVisible] = useState(false);
  const [image, setImage] = useState(null);
  const [imageUri, setImageUri] = useState(null);
  const [imagePickerVisible, setImagePickerVisible] = useState(false);
  const [isImageSaved, setIsImageSaved] = useState(false);
  const [isImageSavedToLibrary, setIsImageSavedToLibrary] = useState(false);
  const [isImageSavedToCameraRoll, setIsImageSavedToCameraRoll] = useState(false);
  const [isImageSavedToGallery, setIsImageSavedToGallery] = useState(false);
  const [isImageSavedToCamera, setIsImageSavedToCamera] = useState(false);
  const [isImageSavedToCameraRollCamera, setIsImageSavedToCameraRollCamera] = useState(false);
  return (
      <View>
        <Button label="Pay" onPress={() => navigation.navigate('Payment')}/>
        <Button label="PhotoPicker" onPress={() => navigation.navigate('PhotoPicker')}/>
      </View>
  )
 };
export default function App() {
  

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Main" component={Main} />
        <Stack.Screen name="Payment" component={PaymentScreen} />
        <Stack.Screen name="PhotoPicker" component={PhotoPickerScreen} />
      </Stack.Navigator>
    </NavigationContainer>
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
