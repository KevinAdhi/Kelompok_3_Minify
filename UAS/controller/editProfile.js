const userModel = require("../models/user");

module.exports = {
  //fungsi edit profile
  async editProfile(req, res) {
    var imagepath;
    if (req.body.fotoProfil == "") {
      imagepath = req.body.imgPathLama || "/public/image/user.svg";
    } else {
      imagepath = "/public/image/" + req.body.fotoProfil;
    }
    //object yang menyimpan isi session user untuk diedit, ambil data dari user
    console.log(req.body);
    var userEdit = {
      image: imagepath,
      username: req.body.username,
      email: req.body.email,
      address: req.body.address,
      password: req.body.password,
      gender: req.body.gender,
      phone: req.body.phone,
      //dari frontend, date diubah lagi formatnya untuk disimpan ke backend
      birthDate: new Date(req.body.birthDate).toISOString(),
    };
    await userModel.findOneAndUpdate({ email: req.body.email }, userEdit);
    req.session.user = { ...userEdit, type: req.session.user.type };
    req.session.user.birthDate = req.body.birthDate;
    console.log("Profile berhasil diedit");
    res.redirect("/profile");
  },
};
