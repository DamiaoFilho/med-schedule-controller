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

router.post("/appointments/create", function (req, res) {
  appointments.service.Create(req.body, function (err, response) {
    if (err) {
      console.error("Error creating appointment:", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      console.log("Appointment created successfully:", response);
      res.status(201).json(response);
    }
  });
});


router.put("/appointments/:id", function (req, res) {
  const appointmentId = req.params.id;
  const updatedData = req.body;

  appointments.service.Update({ id: appointmentId, ...updatedData }, function (err, response) {
    if (err) {
      console.error("Error updating appointment:", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      console.log("Appointment updated successfully:", response);
      res.status(200).json(response);
    }
  });
});

router.delete("/appointments/:id", function (req, res) {
  const appointmentId = req.params.id;

  appointments.service.Destroy({ id: appointmentId }, function (err, response) {
    if (err) {
      console.error("Error deleting appointment:", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      console.log("Appointment deleted successfully");
      res.status(204).end(); 
    }
  });
});

module.exports = router;