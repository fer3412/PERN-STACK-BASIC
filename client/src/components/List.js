import React, { Fragment } from "react";

const List = (props) => {

  /*const getRoute = async () => {
    try {
      const response = await fetch("http://localhost:5000/routeall");
      const jsonData = await response.json();

      setItem(jsonData);
      
      console.log("okz2 Count");
      
      
    } catch (err) {
      console.error(err.message);
    }
  };*/

  const deleteSlot = async (uuids,slot) => {

    try {
      const body = {
        uuid:uuids,
        slot_m:slot
      };

      await fetch("http://localhost:5000/route", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });

      props.getRutec();
      //setTodos(todos.filter(todo => todo.todo_id !== id));
    } catch (err) {
      console.error(err.message);
    }
  };

  const NewSlot = async (uuids,slot) => {

    try {
      const body = {
        uuid:uuids,
        slot_m:slot
      };

      await fetch("http://localhost:5000/route", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });

      //getRoute();
      props.getRutec();
      //setTodos(todos.filter(todo => todo.todo_id !== id));
    } catch (err) {
      console.error(err.message);
    }
  };

  function getTime(n){
    let minute = (30 * n)/60;
    let [num, decimal] = String(minute).split('.');
    let tap = " am "

    let hour = (Number(num)) + 8;

    if(hour > 12){hour = hour - 12; tap = " pm "; }
    
    if(decimal === undefined){
      decimal = "00";
    }else{
      decimal = "30"
    }   
    return hour + ":" + decimal + tap ;
  };

  function onClickL(ssuid1,slotn){

    if(ssuid1 === ""){
      NewSlot(props.items.uuid,slotn);
    }else if(ssuid1 === props.items.uuid){
      deleteSlot(props.items.uuid,slotn);
    }
    
  };

  /*useEffect(() => {
    getRoute();
      
  }, []);*/

  



 const rows = [];
 for (let i2 = 0; i2 < 25; i2++) {
     
    let cont = {flag:"",uuid:""};
    props.items22.map((subnumber,subItem2) => 
      subnumber.slot_m === (i2 + 1).toString()? 
        subnumber.uuid === props.items.uuid? 
          (cont = {flag:"alert-success",uuid:subnumber.uuid})
          :
          (cont = {flag:"alert-danger",uuid:subnumber.uuid})
      :''
      )
    rows.push({cont});
 }


  return (
    <Fragment>
      { rows.map((number,Item2) => 
        
        <div key={Item2}>
           <div className={"border shadow p-3 mb-3 rounded " + number.cont.flag} onClick={() => onClickL(number.cont.uuid,(Item2 + 1))}>
                  <div className="row">
                    <div className="col">
                      {getTime(Item2)} -- { number.cont.uuid}

                    </div>
                  </div>
                </div>
        </div> 

      )}
        
    </Fragment>
  );
};

export default List;