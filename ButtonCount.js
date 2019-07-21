import React, { useState, useEffect } from 'react';
import {
	Text,
	View,
	TouchableOpacity  
} from 'react-native';

export default function ButtonCount(props) {
  const { count } = props;
  const [countDigit, changeCountDigit] = useState(count);

  useEffect(() => {
    alert(`Count now ${countDigit}`);
  }, [countDigit]);

//   componentDidUpdate(prevProps, prevState) {
//     if (prevState.count !== this.state.count) {
//       document.title = `Вы нажали ${this.state.count} раз`;
//     }
//   }

// useEffect(() => {
//     document.title = `Вы нажали ${count} раз`;
//   }, [count]); // Перезапускать эффект только если count поменялся

	return (
		<View>
            <TouchableOpacity style={{marginHorizontal: 10, backgroundColor: 'yellow'}} onPress={() => changeCountDigit(countDigit + 1)}>
                <Text>Change count</Text>
            </TouchableOpacity>
            <Text>{countDigit}</Text>
		</View>
	);
}