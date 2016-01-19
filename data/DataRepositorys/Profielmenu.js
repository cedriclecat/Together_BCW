/**
 * Created by wouter on 1/18/2016
 *
 *  User.findOne({_id:zoek},function(err,even) {
            if (err) { return next(err);}else{
                var dtm = new Date(even.MemberSince);
                console.log(even);
                var friends = even.contacts;
                var pendings = even.pendingcontacts;


                data.UserData = even;
                var maand = dtm.getMonth()+1;
                data.MemberSince = dtm.getDay() + "/" + maand+"/"+dtm.getFullYear();
                if(even.firstName ==""){
                    var x = even.email.split("@");
 naam = x[0];
 }else{
                    naam = even.firstName + " " + even.lastName;
                }
 data.naam=naam;
 * .
 */

/**
 * Created by wouter on 12/29/2015.
 */
Profielmenu = (function () {
    getname = function (req, next) {
        console.log("go");
        ////////////////////////////////////////
        var x = req.user;
        var Verstuurmij;
        var naam;
        if(x===undefined){
            console.log("Bestaat niet");
            Verstuurmij = "N";
        }else{
            Verstuurmij = {};
            if(x.firstName ==""){
                var sd = x.email.split("@");
                naam = sd[0];
            }else{
                naam = x.firstName + " " + x.lastName;
            }
            console.log("go");
            Verstuurmij.naam = naam;
            Verstuurmij.foto = x.picture;
            console.log("go");
            if(x.local.ADMIN==0){
                Verstuurmij.Admin = false;
            }else{
                Verstuurmij.Admin = true;
            }
        }
console.log(Verstuurmij);
        next(Verstuurmij);
        /////////////////////////////////////////
    };

    return{
        getname:getname
    }
})();
module.exports = Profielmenu;
