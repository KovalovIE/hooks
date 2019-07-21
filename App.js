import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
// import React, { useState } from 'react';
// import { Platform, StatusBar, StyleSheet, View } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';

// import AppNavigator from './navigation/AppNavigator';

// export default function App(props) {
//   const [isLoadingComplete, setLoadingComplete] = useState(false);

//   if (!isLoadingComplete && !props.skipLoadingScreen) {
//     return (
//       <AppLoading
//         startAsync={loadResourcesAsync}
//         onError={handleLoadingError}
//         onFinish={() => handleFinishLoading(setLoadingComplete)}
//       />
//     );
//   } else {
//     return (
//       <View style={styles.container}>
//         {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
//         <AppNavigator />
//       </View>
//     );
//   }
// }

// async function loadResourcesAsync() {
//   await Promise.all([
//     Asset.loadAsync([
//       require('./assets/images/robot-dev.png'),
//       require('./assets/images/robot-prod.png'),
//     ]),
//     Font.loadAsync({
//       // This is the font that we are using for our tab bar
//       ...Ionicons.font,
//       // We include SpaceMono because we use it in HomeScreen.js. Feel free to
//       // remove this if you are not using it in your app
//       'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
//     }),
//   ]);
// }

// function handleLoadingError(error: Error) {
//   // In this case, you might want to report the error to your error reporting
//   // service, for example Sentry
//   console.warn(error);
// }

// function handleFinishLoading(setLoadingComplete) {
//   setLoadingComplete(true);
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
// });

import React, { useState, useEffect } from 'react';
import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	TextInput,
  ScrollView,
} from 'react-native';

import Icon from 'react-native-vector-icons/Feather';

import TodoList from './TodoList';
import ButtonCount from './ButtonCount';

export default function App() {
	const [value, setValue] = useState('');
  const [todos, setTodos] = useState([]);

  // console.log('todos', todos);
  // console.log('value', value);
	addTodo = () => {
		if (value.length > 0) {
      // console.log('...todos', ...todos)
			setTodos([...todos, { text: value, key: Date.now(), checked: false }]);
      setValue('');
      
		}
	};

	checkTodo = id => {
		setTodos(
			todos.map(todo => {
				if (todo.key === id) todo.checked = !todo.checked;
				return todo;
			})
		);
	};

	deleteTodo = id => {
    console.log('id', id)
		setTodos(
			todos.filter(todo => {
				if (todo.key !== id) return true;
			})
		);
	};

	return (
		<View style={styles.container}>
			<Text style={styles.header}>Todo List</Text>
			<View style={styles.textInputContainer}>
				<TextInput
					style={styles.textInput}
					multiline={true}
					placeholder="What do you want to do today?"
					placeholderTextColor="#abbabb"
					value={value}
					onChangeText={value => setValue(value)}
				/>
				<TouchableOpacity onPress={() => addTodo()}>
					<Icon name="plus" size={30} color="blue" style={{ marginLeft: 15 }} />
				</TouchableOpacity>
			</View>
			<ScrollView style={{ width: '100%' }}>
				{todos.map(item => (
					<TodoList
						text={item.text}
						key={item.key}
						checked={item.checked}
						setChecked={() => checkTodo(item.key)}
						deleteTodo={() => deleteTodo(item.key)}
					/>
				))}
			</ScrollView>
      <ButtonCount count={2}/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'flex-start',
		alignItems: 'center',
		backgroundColor: '#F5FCFF'
	},
	header: {
		marginTop: '15%',
		fontSize: 20,
		color: 'red',
		paddingBottom: 10
	},
	textInputContainer: {
		flexDirection: 'row',
		alignItems: 'baseline',
		borderColor: 'black',
		borderBottomWidth: 1,
		paddingRight: 10,
		paddingBottom: 10
	},
	textInput: {
		flex: 1,
		height: 20,
		fontSize: 18,
		fontWeight: 'bold',
		color: 'black',
		paddingLeft: 10,
		minHeight: '3%'
	}
});
