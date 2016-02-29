var angularPractice = angular.module('angularPractice', []);

angularPractice.controller('InvoiceCnt', function($scope) {
    $scope.qty = 1;
    $scope.cost = 203435.23;
});

angularPractice.directive('draggable', function($document) {
    var startX = 0,
        startY = 0,
        x = 0,
        y = 0;
    return function(scope, element, attr) {
        element.css({
            position: 'relative',
            border: '1px solid red',
            backgroundColor: 'lightgray',
            cursor: 'pointer'
        });
        element.bind('mousedown', function(event) {
            startX = event.screenX - x;
            startY = event.screenY - y;
            $document.bind('mousemove', mousemove);
            $document.bind('mouseup', mouseup);
        });

        function mousemove(event) {
            y = event.screenY - startY;
            x = event.screenX - startX;
            element.css({
                top: y + 'px',
                left: x + 'px'
            });
            console.log(event.screenX, event.screenY, x, y, startX, startY);
        }

        function mouseup(event) {
            $document.unbind('mousemove', mousemove);
            $document.unbind('mouseup', mouseup);
        }
    }
});
// 作用域练习
angularPractice.controller('GreetCtrl', function($scope) {
    $scope.action = function() {
        $scope.name = 'OK';
    }
    $scope.name = 'World';
});
angularPractice.controller('ListCtrl', function($scope) {
    $scope.names = ['Nile', 'Mike', 'Sam'];
});
angularPractice.controller('CtrlDirective', function($scope) {
    $scope.format = 'M/d/yy h:mm:ss a';
});
angularPractice.directive('myCurrentTime', function($timeout, dateFilter) {
    return function(scope, element, attrs) {
        var format,
            timeoutId;

        function updateTime() {
            element.text(dateFilter(new Date(), format));
        }

        scope.$watch(attrs.myCurrentTime, function(value) {
            format = value;
            updateTime();
        });
        function updateLater() {
            timeoutId = $timeout(function() {
                updateTime();
                updateLater();
            }, 1000);
        }
        element.bind('$destroy', function() {
            $timeout.cancel(timeoutId);
        });

        updateLater();
    }
});
