import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Animated,
  ScrollView,
  Dimensions,
} from 'react-native';
import HOROSCOPE_DATA from '../data/horoscopes';
import DayToggle from '../components/DayToggle';
import Dropdown from '../components/Dropdown';
import {useDispatch} from 'react-redux';
import {isUserLoggedIn} from '../../redux/actions/action';

const HomeScreen = ({navigation}) => {
  const [selectedSign, setSelectedSign] = useState('aries');
  const [selectedDay, setSelectedDay] = useState('today');
  const dispatch = useDispatch();

  const horoscope = HOROSCOPE_DATA[selectedSign][selectedDay];

  const handleSignOutPress = () => {
    Alert.alert('Logged Out!', 'You have been logged out.');
    dispatch(isUserLoggedIn(false));
    setTimeout(() => {
      navigation.navigate('Login');
      navigation.reset({
        index: 0,
        routes: [{name: 'Login'}],
      });
    }, 200);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerRow}>
        <Text style={styles.headerText}>🔮 Astro Journal</Text>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={handleSignOutPress}
          style={styles.signOutButton}>
          <Text style={styles.signOutText}>Sign Out</Text>
        </TouchableOpacity>
      </View>

      {/* Scrollable content */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.section}>
          <Text style={styles.subtitle}>
            Horoscope for{' '}
            <Text style={styles.highlight}>{selectedSign.toUpperCase()}</Text>
          </Text>
        </View>

        <View style={styles.section}>
          <DayToggle selected={selectedDay} onSelect={setSelectedDay} />
        </View>

        <View style={styles.section}>
          <View style={styles.card}>
            <Text style={styles.horoscopeText}>{horoscope}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Dropdown selected={selectedSign} onSelect={setSelectedSign} />
        </View>
      </ScrollView>

      <View style={styles.bottomButtonWrapper}>
        <TouchableOpacity
          style={styles.journalButton}
          activeOpacity={0.8}
          onPress={() => navigation.navigate('Journal')}>
          <Text style={styles.journalButtonText}>✍️ Write Journal</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 16,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 100, // space for bottom button
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 12,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4B0082',
  },
  signOutButton: {
    borderWidth: 1,
    borderColor: '#dc3545',
    backgroundColor: '#ffccd5',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  signOutText: {
    color: '#dc3545',
    fontWeight: '600',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#444',
  },
  highlight: {
    fontWeight: 'bold',
    color: '#7B68EE',
  },
  card: {
    backgroundColor: '#f4f4f4',
    padding: 16,
    height: 80,
    borderRadius: 16,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: {width: 0, height: 2},
    elevation: 4,
    marginTop: 30,
  },
  horoscopeText: {
    fontSize: 16,
    color: '#333',
    lineHeight: 22,
    textAlign: 'center',
  },
  section: {
    marginVertical: 12,
  },
  bottomButtonWrapper: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  journalButton: {
    backgroundColor: '#6A5ACD',
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: 'center',
    elevation: 3,
  },
  journalButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
