import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  Dimensions,
  Image,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import Animated, {FadeInDown, FadeInUp} from 'react-native-reanimated';
import {useDispatch, useSelector} from 'react-redux';
import {isUserLoggedIn} from '../../redux/actions/action';

export const deviceWidth = Dimensions.get('window').width;

const Login = props => {
  const {navigation} = props || {};
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const existUser = useSelector(state => state.user.users);
  const [existingUsers, setExistingUsers] = useState(existUser);
  const dispatch = useDispatch();
  useEffect(() => {
    setExistingUsers(existUser);
    console.log(existUser, 'existingUsers');
  }, [existUser]);

  const validateEmail = email => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePassword = password => {
    return password.length >= 6;
  };

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('Validation Error', 'Email and Password are required.');
      return;
    }
    if (!validateEmail(email)) {
      Alert.alert('Validation Error', 'Please enter a valid email address.');
      return;
    }
    if (!validatePassword(password)) {
      Alert.alert(
        'Validation Error',
        'Password must be at least 6 characters long.',
      );
      return;
    }

    const userExists = existingUsers?.some(
      user => user.email === email && user.password === password,
    );
    dispatch(isUserLoggedIn(userExists));
    if (userExists) {
      Alert.alert('Login Successful', `Logged in with ${email}`);
      setTimeout(() => {
        navigation.navigate('Home'); // Navigate to Home screen
        // Clear the navigation stack
        navigation.reset({
          index: 0,
          routes: [{name: 'Home'}],
        });
      }, 200);
    } else {
      Alert.alert(
        'Access Denied!',
        'Either the account is not registered or the password or email entered is incorrect',
      );
    }
  };

  const handleSignUp = () => {
    Keyboard.dismiss();
    setTimeout(() => {
      navigation.navigate('Signup');
      setEmail('');
      setPassword('');
    }, 200);
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/background.png')}
        style={styles.bgImg}
      />
      <View style={styles.lightCont}>
        <Animated.Image
          entering={FadeInUp.delay(200).duration(1000).springify().damping(3)}
          style={styles.lightImg}
          source={require('../../assets/images/light.png')}
        />
        <Animated.Image
          entering={FadeInUp.delay(400).duration(1000).springify().damping(3)}
          style={[styles.lightImg, styles.lightImg1]}
          source={require('../../assets/images/light.png')}
        />
      </View>
      {/* Title */}
      <View style={styles.center}>
        <Animated.Text
          entering={FadeInUp.delay(800).duration(1000).springify().damping(3)}
          style={styles.loginText}>
          Login
        </Animated.Text>
      </View>
      <View style={styles.fullHeightWidth}>
        {/* Form */}
        <View style={styles.formContainer}>
          <Animated.View
            entering={FadeInDown.duration(1000).springify()}
            style={styles.inputContainer}>
            <TextInput
              placeholderTextColor={'gray'}
              style={styles.inputText}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </Animated.View>
          <Animated.View
            entering={FadeInDown.delay(200).duration(1000).springify()}
            style={[styles.inputContainer, styles.mb3]}>
            <TextInput
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              placeholderTextColor={'gray'}
              secureTextEntry
              style={styles.inputText}
            />
          </Animated.View>
          <Animated.View
            entering={FadeInDown.delay(400).duration(1000).springify()}
            style={styles.fullWidth}>
            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
              <Text style={styles.loginButtonText}>Log In</Text>
            </TouchableOpacity>
          </Animated.View>
          <Animated.View
            entering={FadeInDown.delay(600).duration(1000).springify()}
            style={styles.row}>
            <Text style={{color: 'grey', lineHeight: 20}}>
              Don't have an account?
            </Text>
            <TouchableOpacity onPress={handleSignUp}>
              <Text style={styles.signUpText}> Sign Up</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    position: 'absolute',
    height: '100%',
    width: '100%',
  },
  lightCont: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    position: 'absolute',
  },
  lightImg: {
    height: 225,
    width: 90,
  },
  lightImg1: {
    height: 160,
    width: 65,
  },
  bgImg: {
    height: '100%',
    width: '100%',
    position: 'absolute',
  },
  fullHeightWidth: {
    height: '100%',
    width: '100%',
    justifyContent: 'space-around',
    paddingTop: 140,
    paddingBottom: 0,
  },
  center: {
    alignItems: 'center',
    marginTop: 15,
  },
  loginText: {
    color: 'white',
    fontWeight: 'bold',
    letterSpacing: 1.5,
    fontSize: 38,
  },
  formContainer: {
    alignItems: 'center',
    marginHorizontal: 16,
    gap: 16,
  },
  inputContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    paddingHorizontal: 20,
    paddingVertical: 4,
    borderRadius: 20,
    width: '100%',
  },
  inputText: {
    color: 'black',
  },
  mb3: {
    marginBottom: 12,
  },
  fullWidth: {
    width: '100%',
  },
  loginButton: {
    backgroundColor: '#0EA5E9',
    padding: 12,
    borderRadius: 20,
    marginBottom: 12,
  },
  loginButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  signUpText: {
    color: '#0284C7',
  },
});

export default Login;
