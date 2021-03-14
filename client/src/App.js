import React, { useState, useEffect} from "react";
import './App.css';

import Input from "./components/Input";
import List from "./components/List";

function App() {

  const [ItemU, setItemU] = useState({
    data:false,
    uuid:[]
  });

  const [Item2, setItem2] = useState([]);

  const getUUID = async () => {
    try {
        const response = await fetch("http://localhost:5000/getuuid");
        const jsonData = await response.json();

        setItemU({
          data:true,
          uuid:jsonData
        });
    } catch (err) {
      console.error(err.message);
    }
  };

  const getRoute = async () => {
    try {
      const response = await fetch("http://localhost:5000/routeall");
      const jsonData = await response.json();

      setItem2(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  const changeuuid = (id) => {
    setItemU({
      data:true,
      uuid:{uuid:id}
    });
  };;

  useEffect(() => {
    getUUID();
    getRoute();
  }, []);
  console.log("ItemU.item1");
  console.log(ItemU.uuid);


  return (
    <div className="container mt-5">
      <Input uuid={ItemU.uuid} CountI={Item2.length} getuuid={getUUID} chageuuid={changeuuid}/>
      <List items={ItemU.uuid} items22={Item2} getRutec={getRoute} />
    </div>
  );
}

export default App;
