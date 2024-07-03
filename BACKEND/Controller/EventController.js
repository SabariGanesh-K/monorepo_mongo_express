const router = require("express").Router();
const middleware = require("../Middleware/middleware");
const Event = require("../Models/EventModel");
const User = require("../Models/UserModel");
//get data /:eventid
router.get("/event/:eventid", async (req, res) => {
  try {
    const id = req.params.eventid;
    console.log("gettign event", id);
    const event = await Event.findOne({ eventid: id });
    if (event) {
      console.log("Sendinf", event);
      res.status(201).send(event);
    } else {
      res.status(401).send("Event not available");
    }
  } catch (err) {
    // const message = "EVENT ERROR";
    res.status(401).send("Server error");
  }
});
// /add
router.post(
  "/event/add",
  middleware.isLoggedIn,
  middleware.eventAddCheck,
  middleware.urlAliasCheck,
  async (req, res) => {
    try {
      const event = new Event(req.body);
      console.log("entered with", event);
      await event.save();
      const updateUser = {
        $push: {
          events_ids_h: req.body.eventid,
        },
      };

      const postUser = await User.findOneAndUpdate(
        { email: req.body.owneremail },
        updateUser,
        { new: true }
      ).exec();
      res.status(201).send(
        JSON.stringify({
          code: 201,
          msg: "Event added",
        })
      );
    } catch (err) {
      console.log(err);
      res.status(500).send(
        JSON.stringify({
          code: 500,
          msg: "Internal Server Error",
        })
      );
    }
  }
);
router.post("/event/cancel", middleware.isLoggedIn, async (req, res) => {
  try {
    //email,eventid,
    var update = {
      $set: {
        cancelled: true,
      },
    };
    console.log(req.body.eventid, req.body.email);
    const post = await Event.findOneAndUpdate(
      { eventid: req.body.eventid },
      update
    ).exec();
    res.status(201).send("ok");
  } catch (err) {
    console.log(err);
    res.status(401).send({
      code: 401,
      msg: "SERVER ERROR",
    });
  }
});
// /update launch datetime
router.post(
  "/event/update",
  middleware.isLoggedIn,
  middleware.checkEventUpdateData,
  async (req, res) => {
    try {
      console.log(req.body);
      var update = {
        $set: req.body.updateData,
      };
      const post = await Event.findOneAndUpdate(
        { eventid: req.body.eventid },
        update
      ).exec();

      res.status(201).send(post);
    } catch (err) {
      console.log(err);
      res.status(401).send({
        code: 401,
        msg: "SERVER ERROR",
      });
    }
  }
);
router.post("/event/addhost", middleware.isLoggedIn, async (req, res) => {
  try {
    console.log(req.body);

    // const data=
    const update = {
      $push: {
        host: req.body.addmail,
      },
    };

    const post = await Event.findOneAndUpdate(
      { eventid: req.body.eventid },
      update,
      { new: true } // This option returns the modified document
    ).exec();
    const updateUser = {
      $pull: {
        events_ids_h: req.body.eventid,
      },
    };

    const postUser = await User.findOneAndUpdate(
      { email: req.body.email },
      updateUser,
      { new: true }
    ).exec();

    res.status(201).send("done");
  } catch (err) {
    console.log(err);
    res.status(401).send({
      code: 401,
      msg: "SERVER ERROR",
    });
  }
});
router.post("/event/join", async (req, res) => {
  try {
    console.log(req.body);
    //eventid,adddata,email
    // const data=
    const update = {
      $push: {
        guests: req.body.adddata,
      },
    };

    const post = await Event.findOneAndUpdate(
      { eventid: req.body.eventid },
      update,
      { new: true } // This option returns the modified document
    ).exec();
    const updateUser = {
      $push: {
        events_ids_p: req.body.eventid,
      },
    };

    const postUser = await User.findOneAndUpdate(
      { email: req.body.adddata.email },
      updateUser,
      { new: true }
    ).exec();

    res.status(201).send("done");
  } catch (err) {
    console.log(err);
    res.status(401).send({
      code: 401,
      msg: "SERVER ERROR",
    });
  }
});

router.post("/event/approve", middleware.isLoggedIn, async (req, res) => {
  try {
    console.log(req.body);
    const event = await Event.findOne({ email: req.body.eventmail });
    const guestIndex = event.guests.findIndex(
      (guest) => guest.email === req.body.guestemail
    );
    event.guests[guestIndex].status = "accepted";

    await event.save();

    res.status(201).send("done");
  } catch (err) {
    console.log(err);
    res.status(401).send({
      code: 401,
      msg: "SERVER ERROR",
    });
  }
});
router.post("/event/decline", middleware.isLoggedIn, async (req, res) => {
  try {
    console.log(req.body);
    const event = await Event.findOne({ email: req.body.eventmail });
    const guestIndex = event.guests.findIndex(
      (guest) => guest.email === req.body.guestmail
    );
    event.guests[guestIndex].status = "declined";

    await event.save();

    res.status(201).send("done");
  } catch (err) {
    console.log(err);
    res.status(401).send({
      code: 401,
      msg: "SERVER ERROR",
    });
  }
});
router.post("/event/cancelrsvp", middleware.isLoggedIn, async (req, res) => {
  try {
    console.log("pulling ", req.body.eventid, req.body.email);

    const event = await Event.findOne({ eventid: req.body.eventid });
    console.log(event)
    const guestIndex = event.guests.findIndex(
      (guest) => guest.email === req.body.email
    );
    event.guests[guestIndex].status = "cancelled";
    await event.save();
    // awaitUser.updateOne(
    //   { email: req.body.email },
    //   { $pull: { events_ids_p: req.body.eventid } }
    // );
    const update = {
      $pull: {
        events_ids_p: req.body.eventid
      },
    };

    const post = await User.findOneAndUpdate(
      { email: req.body.email},
      update,
      { new: true }
    ).exec();

  } catch (err) {
    console.log(err);
    res.status(401).send({
      code: 401,
      msg: "SERVER ERROR",
    });
  }
});
router.post(
  "/event/blockparticipant",
  middleware.isLoggedIn,
  async (req, res) => {
    try {
      console.log(req.body);
      const event = await Event.findOne({ email: req.body.eventmail });
      const guestIndex = event.guests.findIndex(
        (guest) => guest.email === req.body.guestmail
      );
      event.guests[guestIndex].status = "blocked";

      await event.save();

      res.status(201).send("done");
    } catch (err) {
      console.log(err);
      res.status(401).send({
        code: 401,
        msg: "SERVER ERROR",
      });
    }
  }
);



router.post("/event/removeHost", middleware.isLoggedIn, async (req, res) => {
  try {
    console.log(req.body);

    const update = {
      $pull: {
        host: req.body.removemail,
      },
    };

    const post = await Event.findOneAndUpdate(
      { eventid: req.body.eventid },
      update,
      { new: true }
    ).exec();

    const updateUser = {
      $pull: {
        events_ids_h: req.body.eventid,
      },
    };

    const postUser = await User.findOneAndUpdate(
      { email: req.body.email },
      updateUser,
      { new: true }
    ).exec();

    res.status(201).send(post);
  } catch (err) {
    console.log(err);
    res.status(401).send({
      code: 401,
      msg: "SERVER ERROR",
    });
  }
});

module.exports = router;
