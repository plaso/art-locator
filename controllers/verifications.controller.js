const Verification = require("../models/Verification.model");


module.exports.create = (req, res, next) => {
  const { validation } = req.body;
  const artwork = req.params.id

  console.log(req.body)
  console.log(typeof validation)

  Verification.findOne({ user: req.user._id, artwork })
    .then(verification => {
      if (verification) {
        console.log('if true');
        // Actualizo
        return Verification
          .findByIdAndUpdate(verification._id, { validation })
      } else {
        // Creo
        const verificationData = {
          user: req.user._id,
          artwork,
          validation
        }

        return Verification
          .create(verificationData)
      }
    })
    .then(() => {
      res.redirect(`/artworks/${artwork}`)
    })
    .catch(next);
}