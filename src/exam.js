import express from "express";
import path from "path";
import cors from "cors";

const app = express();
const port = 3001;
const __dirname = path.resolve();
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

const bookBikeModule = (function () {

  let resolveF = [null,null,null,null,null]
  let rejectF = [null,null,null,null,null]

  let buildTimeOut = (bikeId)=>{
    return {
      state: 0, //0: off  1: on
      startTimeOut: function(){
        this.state = 1
        setTimeout(() =>{
          resolveF[bikeId - 1]('booked')
          this.state = 0
        }, 5000)
      }
    }
  }

  //optional
  let bikesTimeouts = [buildTimeOut(1), buildTimeOut(2), buildTimeOut(3), buildTimeOut(4), buildTimeOut(5)]

  function bookBike(bikeId, slotId){
    return new Promise((resolve,reject) =>{
      if(bikesTimeouts[bikeId - 1].state == 0){
          bikesTimeouts[bikeId - 1].startTimeOut()
          resolveF[bikeId - 1] = resolve
          rejectF[bikeId - 1] = reject
      }else if (bikesTimeouts[bikeId - 1].state == 1){
          rejectF[bikeId - 1]('rejected')
          resolveF[bikeId - 1] = resolve
          rejectF[bikeId - 1] = reject
      }
    })
  }  

  return{
    bookBike: bookBike
  }
})()

app.get("/book", function (req, res) {
  bookBikeModule.bookBike(req.query.bikeId, req.query.slotId)
  .then((val) =>{
    res.write(val)
  })
  .catch((err) =>{
    res.write(err)
  })
  .finally(()=> res.end())
 // hardcoded response for when bookBike function is not implemented
  /* const randomBoolean = Math.random() < 0.5;
  setTimeout(() => {
    res.write(randomBoolean ? "booked" : "rejected");
    res.end();
  }, 1000); */
  
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
