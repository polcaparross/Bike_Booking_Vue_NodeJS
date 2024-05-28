import express from "express";
import path from "path";
import cors from "cors";

const app = express();
const port = 3001;
const __dirname = path.resolve();
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

const bookBikeModule = (function () {
  let buildTimeOut = (bikeId) => {
    return {
      state: 0, //0: off  1: on
      finished: 0,
      startTimeOut: function () {
        this.state = 1;
        setTimeout(() => {
          console.log('FINISH')
          lastPromise[bikeId - 1 ].resolveF()
          this.state = 0
        }, 5000);
      },
    };
  };

  let bikesTimeouts = [
    buildTimeOut(1),
    buildTimeOut(2),
    buildTimeOut(3),
    buildTimeOut(4),
    buildTimeOut(5),
  ];

  let lastPromise = [null, null, null, null, null]

  let bookBike = (bikeId, slotId) => {
    return new Promise((resolve, reject) => {
      console.log(lastPromise)
      if(bikesTimeouts[bikeId -1].state == 0){
        bikesTimeouts[bikeId -1].startTimeOut()
      }else{
        lastPromise[bikeId-1].rejectF()
      }
      lastPromise[bikeId-1] ={rejectF: reject, resolveF: resolve}
    })
  }
  return{
    bookBike : bookBike,
  } 
})()

app.get("/book", function (req, res) {
    console.log(req.query.bikeId);
    console.log(req.query.slotId);
    bookBikeModule.bookBike(req.query.bikeId, req.query.slotId)
    .then((result) => {
      res.write('booked');
      res.end();
    }).catch(error => {
      res.write('rejected'); 
      res.end();
    })
 
 /*  // hardcoded response for when bookBike function is not implemented
  const randomBoolean = Math.random() < 0.5;
  setTimeout(() => {
    res.write(randomBoolean ? "booked" : "rejected");
    res.end();
  }, 1000);
  } */
  
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
