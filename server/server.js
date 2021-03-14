const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const { v4: uuidv4 } = require('uuid');

app.use(cors());
app.use(express.json());

app.post("/route", async (req, res) => {
    try {
      const { uuid } = req.body;
      const { slot_m } = req.body;

      const routecheck = await pool.query("SELECT * FROM mototb WHERE slot_m = $1", [
        slot_m
      ]);

      const routeCount = await pool.query("SELECT count(*) FROM mototb");

      //console.log(routecheck.rowCount + "--" + routeCount.rows[0].count);

      if(routecheck.rowCount > 0){
        res.json({"Estado":0});
      }else{
        if(routeCount.rows[0].count < 8){
          //const uuid = uuidv4();
          const date_m = new Date().getTime();
          const newroute = await pool.query(
              "INSERT INTO mototb (date_m,slot_m,uuid) VALUES($1,$2,$3) RETURNING *",
              [date_m,slot_m,uuid]
          );
      
          res.json({"Estado":newroute.rowCount}); //cero es fallo y uno es ok
          //res.json(newSlot.rows[0]);
        }else{
          res.json({"Estado":0});
        }
      }
    //res.json({"Estado":0});
    } catch (err) {
      console.error(err.message);
    }
  });

  app.post("/routeget", async (req, res) => {
    try {
      const { uuid } = req.body;
      const { slot_m } = req.body;
      const route = await pool.query("SELECT * FROM mototb WHERE (uuid = $1 AND slot_m = $2)", [
        uuid,slot_m
      ]);
  
      res.json(route.rowCount);
    } catch (err) {
      console.error(err.message);
    }
  });

  app.get("/rutaget/:slot_m", async (req, res) => {
    try {
      const { slot_m } = req.params;

      const slot1 = await pool.query("SELECT * FROM mototb WHERE slot_m = $1", [
        slot_m
      ]);
  
      res.json(slot1.rowCount);
    } catch (err) {
      console.error(err.message);
    }
  });

  app.get("/routeall", async (req, res) => {
    try {
      //const { uuid } = req.body;
      const route = await pool.query("SELECT * FROM mototb");
      res.json(route.rows);
    } catch (err) {
      console.error(err.message);
    }
  });

  app.get("/getuuid", async (req, res) => {
    try {
      //const { uuid } = req.body;
      //const route = await pool.query("SELECT * FROM mototb");
      const uuid4 = uuidv4();
  
      res.json({"uuid":uuid4});
    } catch (err) {
      console.error(err.message);
    }
  });

  app.delete("/route", async (req, res) => {
    try {
      const { uuid } = req.body;
      const { slot_m } = req.body;

      const deleteroute = await pool.query("DELETE FROM mototb WHERE (uuid = $1 AND slot_m = $2)", [
        uuid,slot_m
      ]);
      console.log(uuid + slot_m);
  
      res.json({"Estado":deleteroute.rowCount});
      //res.json({"Estado":"1"});
    } catch (err) {
      console.error(err.message);
    }
  });

  app.listen(5000, () => {
    console.log("server has started on port 5000");
  });