/**
 * Created by wouter on 1/18/2016
 */
Profielmenu = (function () {
    getname = function (req, next) {
      //  console.log("go");
        ////////////////////////////////////////
        var x = req.user;
        var Verstuurmij;
        var naam;
        if(x===undefined){
           // console.log("Bestaat niet");
            Verstuurmij = "N";
        }else{
            Verstuurmij = {};
            if(x.firstName ==""){
                var sd = x.email.split("@");
                naam = sd[0];
            }else{
                naam = x.firstName + " " + x.lastName;
            }
          //  console.log("go");
            Verstuurmij.naam = naam;
            Verstuurmij.foto = x.picture;
            //console.log("go");
            if(x.local.ADMIN==0){
                Verstuurmij.Admin = false;
            }else{
                Verstuurmij.Admin = true;
            }
        }
//console.log(Verstuurmij);
        next(Verstuurmij);
        /////////////////////////////////////////
    };

    return{
        getname:getname
    }
})();
module.exports = Profielmenu;
