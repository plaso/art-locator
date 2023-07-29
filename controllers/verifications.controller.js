const Verification = require("../models/Verification.model");


module.exports.create = (req, res, next) => {
  const { validation } = req.body;
  const artwork = req.params.id

  console.log(req.body)
  console.log(typeof validation)

  Verification.findOne({ user: req.user._id, artwork })
    .then(verification => {
      if (verification) {
        // Actualizo
        if (verification.validation !== validation) {
          return Verification
            .findByIdAndUpdate(verification._id, { validation })
        }

        return Verification.findByIdAndDelete(verification._id);
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
      res.json({ ok: true });
    })
    .catch(next);
}