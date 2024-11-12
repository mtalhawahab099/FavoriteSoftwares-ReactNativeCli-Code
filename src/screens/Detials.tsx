import { StyleSheet, Text, View, Button } from 'react-native'
import React from 'react'

//Navigation
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../App'

type DetailsProps = NativeStackScreenProps<RootStackParamList, 'Details'>


const Detials = ({navigation}: DetailsProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.smallText}>Detials</Text>
      <Button 
      title="Go to Home" 
      onPress={() => navigation.navigate('Home')}
      />
    </View>
  )
}

export default Detials

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      },
      smallText: {
        fontSize:20
      },
})