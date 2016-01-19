/**
 * Created by wouter on 12/29/2015.
 */


UserRepoPasport = (function () {

    createuser = function(data,next){


        User.create(data, function (err) {
            if (err) {
              //  console.log(err);
                return next(err); }
            next(data);
        });

    };
    return {
        createuser: createuser
    };
})();

module.exports = UserRepoPasport;