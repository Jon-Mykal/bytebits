import { StyleSheet, Text, View, TextInput } from 'react-native'
import React from 'react'
import Button from '../components/Button'

const PaymentScreen = () => {
  const [cardHolderName, setCardHolderName] = React.useState('')
  const [cardNumber, setCardNumber] = React.useState('')
  const [expiryMonth, setExpiryMonth] = React.useState('')
  const [expiryYear, setExpiryYear] = React.useState('')
  const [cvv, setCvv] = React.useState('')
  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Text>PaymentScreen</Text>
        <TextInput 
        onChangeText={setCardHolderName}
        placeholder='Card Holder Name' 
        style={styles.input} />
        <TextInput
          placeholder='Card Number'
          style={styles.input}
          keyboardType='numeric'
          onChangeText={setCardNumber}
          maxLength={16} />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <TextInput
            placeholder='MM'
            style={[styles.input, { width: '48%' }]}
            keyboardType='numeric'
            onChangeText={setExpiryMonth}
            maxLength={2} />
          <TextInput
            placeholder='YY'
            style={[styles.input, { width: '48%' }]}
            keyboardType='numeric'
            onChangeText={setExpiryYear}
            maxLength={2} />
        </View>
        <TextInput
          placeholder='CVV'
          style={styles.input}
          keyboardType='numeric'
          secureTextEntry={true}
          onChangeText={setCvv}
          maxLength={3} />
          <Button label='Pay' style={styles.button} onPress={()=>{
            const source = {
              cardHolderName,
              cardNumber,
              expiryMonth,
              expiryYear,
              cvv
            };
            alert(Object.values(source).map(item=> `${item} \n`).join(''))
          }}/>
      </View>
      
    </View>
  )
}

export default PaymentScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    // alignItems: 'flex-start',
    // justifyContent: 'center',
  },
  formContainer: {
    marginTop: 50,
    marginHorizontal: 20
  },
  input: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginVertical: 5,
    width: '100%',
    borderColor: '#ccc',
    borderWidth: 0.5,
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#106ebe',
    width: '100%',
    marginHorizontal: 0,
    marginTop: 20,
    borderRadius: 10
  }
})