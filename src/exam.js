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
    promises[bikeId - 1][slotId - 1] = new Promise((resolve, reject) => {
      rejectedProm[bikeId - 1][slotId - 1] = reject;
      if (bikesTimeouts[bikeId - 1].state == 1 && bikeId == slotId) {
        for (let i = 0; i < 5; i++) {
          if (promises[bikeId - 1][i] != null && i != slotId - 1) {
            rejectedProm[bikeId - 1][i]("rejected");
          }
        }
      } else {
        bikesTimeouts[bikeId - 1].startTimeOut();
        for (let i = 0; i < 5; i++) {
          if (promises[bikeId - 1][i] != null) {
            resolve("booked");
          }
        }
      }
    });
  };

  return {
    bookBike: bookBike,
    promises: promises,
    rejectedProm: rejectedProm,
  };
})();

app.get("/book", function (req, res) {
  /* bookBikeModule.bookBike(Number(req.query.bikeId), Number(req.query.slotId));
      let x = bookBikeModule.promises[Number(req.query.bikeId - 1)][Number(req.query.slotId - 1)]
      console.log(x);      
      x.then((value) => {
        res.write(value);
        res.end();
      }).catch((err) => {
        res.write(err);
        res.end();
      }).finally(() => {
        res.end();
      });   */

  // hardcoded response for when bookBike function is not implemented
  const randomBoolean = Math.random() < 0.5;
  setTimeout(() => {
    res.write(randomBoolean ? "booked" : "rejected");
    res.end();
  }, 1000);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
