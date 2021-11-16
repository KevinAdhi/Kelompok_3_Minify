module.exports = function Checkout(checkout) {
  this.ongkir = checkout.ongkir || 0;
  this.pilih = checkout.pilih || null;
  this.pajak = 5000;
  this.potongan = 3000;

  this.kurir = function (id) {
    if (id == "kurir1") {
      this.ongkir = 5000;
      this.pilih = "TIKI";
    }
    if (id == "kurir2") {
      this.ongkir = 10000;
      this.pilih = "JNE";
    }
  };
};
