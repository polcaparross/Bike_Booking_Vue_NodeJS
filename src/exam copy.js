import express from "express";
import path from "path";
import cors from "cors";

const app = express();
const port = 3001;
const __dirname = path.resolve();
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

const bookBikeModule = function () {
  let buildTimeOut = (bikeId) => {
    return {
      state: 0, //0: off  1: on
      startTimeOut: function () {
        if (this.state == 0) {
          this.state = 1;
          setTimeout(() => {}, 5000);
        }
      },
    };
  };

  let promises = Array(5)
    .fill(null)
    .map(() => Array(5).fill(null));
  let rejectedProm = Array(5)
    .fill(null)
    .map(() => Array(5).fill(null));

  let bikesTimeouts = [
    buildTimeOut(1),
    buildTimeOut(2),
    buildTimeOut(3),
    buildTimeOut(4),
    buildTimeOut(5),
  ];

  let bookBike = (bikeId, slotId) => {
    return new Promise((resolve, reject) => {
  
    
    })
  }
  return{
    bookBike : bookBike,

  }
    
}()

app.get("/book", function (req, res) {
  if(typeof bookBikeModule != 'undefined'){
    bookBikeModule.bookBike(req.query.bikeId, req.query.slotId)


    
  } else{

    // hardcoded response for when bookBike function is not implemented
  const randomBoolean = Math.random() < 0.5;
  setTimeout(() => {
    res.write(randomBoolean ? "booked" : "rejected");
    res.end();
  }, 1000);
  }
  
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
