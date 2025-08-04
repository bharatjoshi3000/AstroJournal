import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

const DayToggle = ({selected, onSelect}) => {
  const days = ['yesterday', 'today', 'tomorrow'];
  return (
    <View style={styles.container}>
      {days.map(day => (
        <TouchableOpacity
          key={day}
          style={[styles.button, selected === day && styles.selected]}
          onPress={() => onSelect(day)}>
          <Text style={styles.text}>{day.toUpperCase()}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default DayToggle;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: '#bbb',
  },
  selected: {
    backgroundColor: '#00b894',
  },
  text: {
    color: '#fff',
  },
});
