import React, { Fragment, useState } from "react";

const Input = (props) => {
  const [Suuid, setSuuid] = useState("");

  // const onClickOne = async e => {
    
  // };
  const onSubmitForm = async e => {
    e.preventDefault();
    try {
      props.chageuuid(Suuid);
      //window.location = "/";
    } catch (err) {
      console.error(err.message);
    }
  };


  console.log("props.uuid2");
  console.log(props.uuid.uuid);



  return (
    <Fragment>
        <div className="border shadow p-3 mb-5 rounded" >
          <div className="row">
            <div className="col text-center">
              Usuario ID: {props.uuid.uuid} {" Lista: " + props.CountI}

              <form className="d-flex mt-4" onSubmit={onSubmitForm}>
                <input
                  type="text"
                  className="form-control"
                  value={Suuid}
                  onChange={e => setSuuid(e.target.value)}
                />
                <button className="btn btn-success">Change</button>
              </form>
            </div>
          </div>        
        </div>
    </Fragment>
  );
};

export default Input;