import React, {useEffect, useState} from 'react';
import {View, Text, TextInput, Button, StyleSheet, Alert} from 'react-native';
import {useSelector} from 'react-redux';

const Login = props => {
  const {navigation} = props || {};
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const existUser = useSelector(state => state.userReducer.users);
  const [existingUsers, setExistingUsers] = useState(existUser);

  useEffect(() => {
    setExistingUsers(existUser);
    console.log(existUser, 'existingUsers');
  }, [existUser]);

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('Validation Error', 'Email and Password are required.');
      return;
    }
    const indexOfUser = existingUsers.indexOf(item => {
      return item.email === email;
    });
    // Perform login action here (e.g., API call)
    if (indexOfUser !== -1) {
      Alert.alert('Login Successful', `Logged in with ${email}`);
    } else {
      navigation.navigate('Signup');
    }
  };
  const handleSignUp = () => {
    navigation.navigate('Signup');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Login" onPress={handleLogin} />
      <Button title="Signup" onPress={handleSignUp} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
});

export default Login;
