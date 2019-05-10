const Hoax = require('../models/Hoax');

class HoaxController {

  static postCreateHoax(req, res) {
    console.log(req.file);
    
    const url = req.file ? req.file.cloudStoragePublicUrl : '';
    const userId = req.authenticated.id;

    const newHoax = new Hoax({
      url,
      userId,
    });

    newHoax.save()
      .then((hoax) => {
        res.status(201).json({
          message: 'CREATED',
          hoax,
        });
      }) 
      .catch((error) => {
        res.status(500).json(error);
      });
  };

  static getHoaxes(req, res) {
    let queries = req.query ? {} : { _id: req.authenticated.id } ;

    for(let key in req.query){
        queries[key] = {$regex: new RegExp(req.query[key]), $options: 'ig'};
    };

    Hoax.find(queries)
      .then((hoaxes) => {
        res.status(200).json({
          message: 'FETCHED',
          hoaxes,
        });
      })
      .catch((error) => {
        res.status(500).json(error)
      });
  };

  static getHoaxById(req, res) {
    const { id } = req.params;

    Hoax.findById(id)
      .then((hoax) => {
        res.status(200).json({
          message: 'FETCHED',
          hoax,
        });        
      })
      .catch((error) => {
        res.status(500).json(error);
      });
  };

  static deleteHoaxById(req, res) {
    const { id } = req.params;

    Hoax.findByIdAndRemove(id)
      .then(() => {
        res.status(200).json({ message: 'DELETED '});
      });
  };

};

module.exports = HoaxController;