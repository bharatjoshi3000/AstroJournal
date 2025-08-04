import React, {useEffect, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  FlatList,
  Dimensions,
} from 'react-native';

const zodiacList = [
  'aries',
  'taurus',
  'gemini',
  'cancer',
  'leo',
  'virgo',
  'libra',
  'scorpio',
  'sagittarius',
  'capricorn',
  'aquarius',
  'pisces',
];

const screenWidth = Dimensions.get('window').width;
const pillMargin = 8;
const pillWidth = (screenWidth - 70) / 3 - pillMargin;

const Dropdown = ({selected, onSelect}) => {
  const renderItem = ({item}) => (
    <TouchableOpacity
      key={item}
      style={[styles.pill, selected === item && styles.selectedPill]}
      onPress={() => onSelect(item)}
      activeOpacity={0.8}>
      <Text
        style={[styles.pillText, selected === item && styles.selectedPillText]}>
        {item.charAt(0).toUpperCase() + item.slice(1)}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={zodiacList}
        renderItem={renderItem}
        keyExtractor={item => item}
        numColumns={3} // <-- 3 pills per row
        columnWrapperStyle={styles.row}
        scrollEnabled={false}
      />
    </View>
  );
};

export default Dropdown;

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  pill: {
    backgroundColor: '#dfe6e9',
    paddingVertical: 10,
    width: pillWidth,
    borderRadius: 20,
    marginHorizontal: 4,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 3,
    alignItems: 'center',
  },
  selectedPill: {
    backgroundColor: '#6c5ce7',
  },
  pillText: {
    color: '#2d3436',
    fontSize: 13,
    fontWeight: '500',
    textAlign: 'center',
  },
  selectedPillText: {
    color: '#fff',
  },
});
