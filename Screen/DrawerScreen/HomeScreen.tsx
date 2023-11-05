import React, { useEffect, useState } from 'react';
// import {View, Text, SafeAreaView, StyleSheet} from 'react-native';
import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet, Button, Modal } from 'react-native';
import { ProductType } from '../../types';
import { addProductApi, deleteProductApi, getProductsApi, updateProductApi } from '../../Api/Products';
// import { TextInput } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';

const HomeScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [todos, setTodos] = useState<ProductType[] | any>([] as ProductType[]);
  const [newTodo, setNewTodo] = useState('');
  const [pageNumber , setPageNumber] = useState(1);
  const [modalVisible, setModalVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [updatedValue , setUpdatedValue] = useState<number>(-1);
  const handleInputChange = (text : string) => {
    setInputValue(text);
  };

  useEffect(() => {
    const getProducts = async () => { 
      try{
        const {data} = await getProductsApi(pageNumber);
        setTodos(data.data.products);
      }
      catch(error){
        console.log(error);
      }
    }
    getProducts();
  } , [pageNumber]);

  const onChangeSearch = (query : string) => setSearchQuery(query);

  const deleteTodo = async(id : number) => {
    try{
      const updatedTodos = todos.filter((todo : ProductType) => todo.id !== id);
      setTodos(updatedTodos);
      await deleteProductApi(id);
    }
    catch(error){ 
      console.log(error);
    }
  };

  const addTodo = async() => {
    if (newTodo !== '') {
      try{

        const {data} = await addProductApi({title: newTodo});
        setTodos([...todos, data.data.product]);
      }
      catch(error){ 
        console.log(error);
      }
    }
  };

  const updateItem = async() => {
    try{
      const {data} = await updateProductApi(updatedValue , {title: inputValue});
      const updatedTodos = todos.map((todo : ProductType) => {
        if(todo.id === updatedValue){
          todo.title = inputValue;
        }
        return todo;
      });
      setTodos(updatedTodos);
    }
    catch(error){
      console.log(error);
    }
  }
  
    return (
      <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Add a product..."
        value={newTodo}
        onChangeText={setNewTodo}
      />
      <TouchableOpacity style={styles.addButton} onPress={addTodo}>
        <Text style={styles.addButtonText}>Add</Text>
      </TouchableOpacity>
      <TextInput
        style={styles.searchInput}
        placeholder="Search..."
        value={searchQuery}
        onChangeText={onChangeSearch}
      />
      <FlatList
        data={todos?.filter((todo : ProductType) => todo.title.toLowerCase().includes(searchQuery.toLowerCase()))}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.todoItem}>
            <Text style={styles.todoText}>{item.title}</Text>
            <TouchableOpacity style={styles.buttonContainer}>
              <Icon onPress={() => {
                  setModalVisible(true)
                  setUpdatedValue(item.id);
                }} style={styles.button} name="edit" size={20} color="green" />
              <Icon onPress={() => deleteTodo(item.id)} name="trash" size={20} color="red" />
            </TouchableOpacity>

          </View>
        )}
      />
      <View style={styles.buttonContainer}>
        <View style={styles.button}>
          <Button title="<" disabled={pageNumber==1} onPress={() => pageNumber > 1 ? setPageNumber(pageNumber - 1) : ""} />
        </View>
        <View style={styles.button}>
          <Button title=">" disabled={todos.length < 10} onPress={() =>  setPageNumber(pageNumber + 1)} />
        </View>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.modalView}>
          <View style={styles.modalContent}>
            <TextInput
              style={styles.input}
              onChangeText={handleInputChange}
              value={inputValue}
              placeholder="Enter text"
            />
            <View style={styles.buttonContainer}>
              <View style={styles.button}>
                <Button
                  title="Close"
                  onPress={() => {
                    setModalVisible(!modalVisible);
                  }}
                  color={'red'}
                />
              </View>
              <View>
                <Button
                  title="Update"
                  onPress={async() => {
                    setModalVisible(!modalVisible);
                    // setInputValue('');
                    // console.log(inputValue);
                    await updateItem()
                    
                  }}
                  color={'green'}
                  />
                </View>
            </View>
          </View>
        </View>
      </Modal>
      
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  addButton: {
    backgroundColor: '#28a745',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  todoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
    paddingVertical: 10,
  },
  todoText: {
    fontSize: 16,
  },
  deleteButton: {
    color: 'red',
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  button: {
    marginHorizontal: 10,
  },
  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  // input: {
  //   height: 40,
  //   borderColor: 'gray',
  //   borderWidth: 1,
  //   width: '100%',
  //   marginBottom: 10,
  //   paddingHorizontal: 10,
  // },
});


export default HomeScreen;
