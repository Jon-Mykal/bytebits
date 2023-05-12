import React from 'react';
import { View, Text, Button, TouchableOpacity, Pressable } from 'react-native';

const MainPage = () => (
  <View style={{ backgroundColor: 'red', width: '100%', height: '100%'}}>
    <View style={{ 
      paddingTop: 150, alignItems: 'center'}}>
        <Text style={{ fontSize: 25, color: "white"}}>Welcome to</Text>
        <Text style={{ fontSize: 40, color: "white", fontWeight: "bold"}}>
            GK <Text style={{ color: "black"}}>One</Text>
        </Text>
    </View>
  <View style={{ paddingTop: '30vh' }}>
    <Pressable style={{
      backgroundColor: "white",
      ...styles.buttonSolid
    }}>
  <Text style={{ color: 'red', fontWeight: "bold"}}>Create an account</Text>
</Pressable>
<View style={{ marginVertical: 8}}></View>
<Pressable style={({pressed}) => [
  {
    backgroundColor: pressed ? 'white' : 'red',
    transition: 'all ease .2s'
  }, 
  styles.buttonOutline
]}>
 { ({pressed}) => (
    <Text style={
    pressed ? { ...styles.text, color: "red"} : styles.text
  }>Log in</Text>)
 }
</Pressable>
  </View>
  </View>
  /*<View>
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Box color="red" />
    <Box color="green" />
    <Box color="blue" />

  </View>
  <View style={{ marginLeft: 20, marginRight: 20, top: '30vh' }}>
        <RoundedButton title="Press Me"/>
  </View>
  </View>
*/
);

export default MainPage;

const baseStyles = {
  button: {
      justifyContent: 'center',
      alignItems: 'center',
      marginHorizontal: 10,
      paddingVertical: 10,
      borderRadius: 5, 
      cursor: 'pointer'
  }
};
const styles = {
  text: {
    color: "white",
    fontWeight: "bold"
  },
  buttonSolid: {
    ...baseStyles.button,
    backgroundColor: 'white'
  },
  buttonOutline: {
    ...baseStyles.button,
    border: 1, borderColor: 'white',        borderStyle: 'solid'
  }
};
export const Box = (props) => (
  <View style={{ width: 100, height: 100, backgroundColor: props.color }} />
);

export const RoundedButton = ({ title, onPress }) => {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: '#007AFF',
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 12,
      }}
      onPress={onPress}
    >
      <Text style={{ color: '#FFFFFF', fontSize: 16, textAlign: 'center' }}>{title}</Text>
    </TouchableOpacity>
  );
};

