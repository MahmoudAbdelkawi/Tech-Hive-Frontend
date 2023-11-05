import React from 'react';
import {View, Text, SafeAreaView , StyleSheet } from 'react-native';
import userStore from '../../store/userStore';


const ProfileScreen = () => {
  const {user} = userStore(state => state);
  
  return (
    <View style={styles.container}>
      <Text style={styles.text}>ID: {user.id}</Text>
      <Text style={styles.text}>Name: {user.name}</Text>
      <Text style={styles.text}>Email: {user.email}</Text>
      <Text style={styles.text}>Created At: {user.createdAt}</Text>
      <Text style={styles.text}>Number of Products: {user.products.length}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
  },
});

export default ProfileScreen;
