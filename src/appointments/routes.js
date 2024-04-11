const { Router } = require("express");
const appointments = require("../clients/appointments");

const router = Router();

router.get("/appointments", function (req, res) {
    appointments.service.List(null, function (err, data) {
    console.log(data)
    if (err) {
      console.log("Internal error", error);
    } else {
      res.json(data.results);
    }
  });
});

module.exports = router;