import React, {useState} from 'react';
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
} from 'react-native';
import {useDispatch} from 'react-redux';
import {createUser} from '../../redux/actions/action';
import Animated, {FadeInDown, FadeInUp} from 'react-native-reanimated';

const deviceWidth = Dimensions.get('window').width;

const Signup = props => {
  const {navigation} = props || {};
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const validateEmail = email => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePassword = password => {
    return password.length >= 6;
  };

  const handleSignup = () => {
    if (!name) {
      Alert.alert('Validation Error', 'Name is required.');
      return;
    }

    if (!email) {
      Alert.alert('Validation Error', 'Email is required.');
      return;
    }

    if (!validateEmail(email)) {
      Alert.alert('Validation Error', 'Please enter a valid email address.');
      return;
    }

    if (!password) {
      Alert.alert('Validation Error', 'Password is required.');
      return;
    }

    if (!validatePassword(password)) {
      Alert.alert(
        'Validation Error',
        'Password must be at least 6 characters long.',
      );
      return;
    }

    dispatch(createUser({name, email, password}));
    Alert.alert('Signup Successful', `Welcome ${name}!`);
    navigation.navigate('Login');
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
      <View style={styles.center}>
        <Animated.Text
          entering={FadeInUp.delay(800).duration(1000).springify().damping(3)}
          style={styles.signupText}>
          Sign Up
        </Animated.Text>
      </View>
      <View style={styles.fullHeightWidth}>
        <View style={styles.formContainer}>
          <Animated.View
            entering={FadeInDown.delay(200).duration(1000).springify()}
            style={styles.inputContainer}>
            <TextInput
              placeholderTextColor={'gray'}
              style={styles.inputText}
              placeholder="Username"
              value={name}
              onChangeText={setName}
              autoCapitalize="words"
            />
          </Animated.View>
          <Animated.View
            entering={FadeInDown.delay(400).duration(1000).springify()}
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
            entering={FadeInDown.delay(600).duration(1000).springify()}
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
            entering={FadeInDown.delay(800).duration(1000).springify()}
            style={styles.fullWidth}>
            <TouchableOpacity
              style={styles.signupButton}
              onPress={handleSignup}>
              <Text style={styles.signupButtonText}>Sign Up</Text>
            </TouchableOpacity>
          </Animated.View>
          <Animated.View
            entering={FadeInDown.delay(1000).duration(1000).springify()}
            style={styles.row}>
            <Text>Already have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.loginText}> Log In</Text>
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
    paddingTop: 180,
    paddingBottom: 0,
  },
  center: {
    alignItems: 'center',
    marginTop: 15,
  },
  signupText: {
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
    // marginBottom: 12,
  },
  fullWidth: {
    width: '100%',
  },
  signupButton: {
    backgroundColor: '#0EA5E9',
    padding: 12,
    borderRadius: 20,
    marginBottom: 12,
  },
  signupButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  loginText: {
    color: '#0284C7',
  },
});

export default Signup;
