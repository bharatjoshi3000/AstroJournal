/* eslint-disable react-native/no-inline-styles */
import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Keyboard,
  Image,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  addTodo,
  completeTodo,
  deleteTodo,
  editTodo,
  searchTodo,
} from '../../redux/actions/todoActions';
import Icon from 'react-native-vector-icons/FontAwesome';

const Home = () => {
  const [newTodo, setNewTodo] = useState('');
  const [editing, setEditing] = useState(null);
  const [search, setSearch] = useState('');
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const {todos, searchQuery} = useSelector(state => state.todo);

  const handleAddTodo = () => {
    if (newTodo.trim()) {
      Keyboard.dismiss();
      dispatch(addTodo(newTodo));
      setNewTodo('');
    }
  };

  const handleEditTodo = (id, text) => {
    setEditing(id);
    setNewTodo(text);
    setTimeout(() => inputRef.current.focus(), 100); // Focus the input after a brief delay
  };

  const handleSaveEdit = () => {
    Keyboard.dismiss();
    dispatch(editTodo(editing, newTodo));
    setEditing(null);
    setNewTodo('');
  };

  const handleSearch = text => {
    setSearch(text);
    dispatch(searchTodo(text));
  };

  const filteredTodos = todos.filter(todo =>
    todo.text.toLowerCase().includes(searchQuery.toLowerCase()),
  );
  const renderItem = ({item}) => {
    return (
      <View style={styles.todoContainer}>
        <View style={styles.todoTextView}>
          <Text
            style={item.completed ? styles.completedText : styles.todoText}
            numberOfLines={1}>
            {item.text}
          </Text>
        </View>
        <View style={styles.editCheckIcon}>
          {!item.completed && (
            <>
              <TouchableOpacity
                onPress={() => handleEditTodo(item.id, item.text)}
                activeOpacity={0.7}
                style={styles.pencilIcon}>
                <Icon name="pencil" color="blue" size={15} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => dispatch(completeTodo(item.id))}
                activeOpacity={0.7}>
                <Icon name="check" color="green" size={15} />
              </TouchableOpacity>
            </>
          )}
        </View>
        <TouchableOpacity
          onPress={() => dispatch(deleteTodo(item.id))}
          activeOpacity={0.7}>
          <Icon name="trash" color="red" size={15} />
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.search}
        placeholderTextColor={'gray'}
        placeholder="Search your todo..."
        value={search}
        onChangeText={handleSearch}
      />
      {filteredTodos.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Image
            source={{
              uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmAmW45mEkcuRxmykuBb9muvpoVzXmZ8naQA&s',
            }}
            style={styles.emptyImage}
          />
        </View>
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={filteredTodos}
          keyExtractor={item => item.id}
          renderItem={renderItem}
        />
      )}
      <TextInput
        style={styles.input}
        ref={inputRef}
        placeholder="Add new todo..."
        placeholderTextColor={'gray'}
        value={newTodo}
        onChangeText={setNewTodo}
        autoFocus={!!editing}
      />
      <TouchableOpacity
        onPress={editing ? handleSaveEdit : handleAddTodo}
        activeOpacity={0.7}
        style={styles.addButton}>
        <Text style={{color: 'white', fontSize: 20}}>
          {editing ? 'Save Edit' : 'Add Todo'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  todoTextView: {
    width: '70%',
  },
  search: {
    height: 45,
    borderColor: '#F5F7F8',
    borderWidth: 1,
    borderRadius: 14,
    backgroundColor: 'white',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  pencilIcon: {
    marginRight: 28,
  },
  todoContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 14,
    borderColor: '#F9F5FE',
    backgroundColor: '#F5F7F8',
    padding: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  todoText: {
    fontSize: 12,
  },
  editCheckIcon: {
    width: 90,
    flexDirection: 'row',
    paddingLeft: 8,
    alignItems: 'center',
  },
  completedText: {
    fontSize: 12,
    textDecorationLine: 'line-through',
    color: 'gray',
  },
  input: {
    height: 50,
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderColor: '#1e90ff',
    borderRadius: 14,
    backgroundColor: 'white',
  },
  addButton: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    borderRadius: 14,
    backgroundColor: 'black',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyImage: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
  },
});

export default Home;
