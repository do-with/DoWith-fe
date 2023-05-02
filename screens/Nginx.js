import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import axios from 'axios';

function Nginx() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get(`http://172.28.16.1:8080/api`)
      .then(response => { 
        setData(response.data.Notices);
        console.log(response.length);
        console.log(response.data.length);
        console.log(response.data.Notices);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <View>
      {data.length > 0 && <View>{data[0].title}</View>}
    </View>
  );
}

export default Nginx;