/**
 * Created by Brecht on 8/12/2015.
 */

(function(){
    var ngCompare = function(){
        return {
            require: 'ngModel',
            link: function (scope, currentEl, attrs, ctrl) {
                var comparefield = document.getElementsByName(attrs.ngCompare)[0]; //getting first element
                compareEl = angular.element(comparefield);

                //current field key up
                currentEl.on('keyup', function () {
                    if (compareEl.val() !== "") {
                        var isMatch = currentEl.val() === compareEl.val();
                        ctrl.$setValidity('compare', isMatch);
                        scope.$digest();
                    }
                });

                //Element to compare field key up
                compareEl.on('keyup', function () {
                    if (currentEl.val() !== "") {
                        var isMatch = currentEl.val() === compareEl.val();
                        ctrl.$setValidity('compare', isMatch);
                        scope.$digest();
                    }
                });
            }
        };
    };

    angular.module('profile').directive('ngCompare',[ngCompare]);

})();

