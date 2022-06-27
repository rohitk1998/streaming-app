const { Tracks } = require("../modals/index");

const trackDao = {
  create: create,
  all: findAll,
  one: findOne,
};

function create(track) {
  var newTrack = new Tracks(track);
  return newTrack.save({
      returning: true,
      plain: true,
  });
}

function findAll() {
  return Tracks.findAll();
}

async function findOne(id) {
  console.log("id", id);
  return await Tracks.findOne({
    where: { track_id: id },
    returning: true,
    plain: true,
  });
}

module.exports = trackDao;
