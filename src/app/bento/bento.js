angular.module('oneSearch.bento', [])

    .config(['$routeProvider', function($routeProvider) {
        /**
         * Register Bento Box display route with ngRoute's $routeProvider
         */
        $routeProvider
            .when('/bento/:s', {
                templateUrl: 'bento/bento.tpl.html',
                controller: 'BentoCtrl'
            })
    }])

/**
 * Bento Service Provider
 *
 * This service uses the mediaTypes service to organize the engine results by media type
 * and preloaded an engine's template and controller (if defined) if there are results for that engine.
 */
    .service('Bento', ['$routeParams', '$filter', 'oneSearch', 'mediaTypes', function($routeParams, $filter, oneSearch, mediaTypes){
        //variable representing 'this' for closure context
        //this ensures function closure reference variables in the right context
        var self = this;

        /**
         * Object to hold box data
         * @Object = {
         *      // Box names are generated by media types defined by registered engines
         *      NAME: {
         *          // An Array of engine names (String) used to get engine templates/controllers and track when the box is done loading.
         *          // Once an engine is finished loading, the engine's name is removed from this array. The removed value is used to reference the loaded engine's preloaded
         *          // template/controller. Once this Array is empty the "box" is considered loaded.
         *          engines: Array,
         *
         *          // The object's keys are the engine names and the values are the results returned using
         *          // the JSON path from an engine's resultsPath param
         *          results: {
         *              ENGINE_NAME1: {},
         *              ENGINE_NAME2: {},
         *              etc...
         *          }
         *      }
         *  }
         */
        this.boxes = {};

        /**
         * Object to hold pre-loaded engine templates and controllers.
         * Templates and controllers are only pre-loaded if the engine yields results.
         * @Object = {
         *      // Engine name, defined by engine's config registering with the oneSearchProvider
         *      NAME: {
         *          // the "tpl" key returns a Promise to retrieve the engine's template
         *          // The Promise is generated from Angular's $http Service (https://code.angularjs.org/1.3.0/docs/api/ng/service/$http),
         *          // which uses the promise methods from Angular's $q Service (https://code.angularjs.org/1.3.0/docs/api/ng/service/$q)
         *          tpl: Promise,
         *
         *          // The "controller" key will return an instance of the engine's controller or "null" if no controller was defined
         *          controller: Controller Instance|null
         *      }
         * }
         */
        this.engines = {};

        // Helper function that removes an engine's name from a box's "engines" Array
        // Once the "engines" Array is empty, the box is considered "loaded"
        function loadProgress(type, engine){
            var i = self.boxes[type].engines.indexOf(engine);
            if(i != -1) {
                self.boxes[type].engines.splice(i, 1);
            }
        }

        // Remove an engine from all boxes
        function removeFromBoxes(engine){
            angular.forEach(self.boxes, function(box, type){
                loadProgress(type, engine);
            })
        }

        // Gets all boxes
        this.getBoxes = function(){
            // Search all engines registered with the oneSearch Provider, giving the
            // $routeParams object as the parameter (https://code.angularjs.org/1.3.0/docs/api/ngRoute/service/$routeParams)
            var engines = oneSearch.searchAll($routeParams);

            // Deep copy media types defined by registered engines to the this.boxes object.
            angular.copy(mediaTypes.types, self.boxes);

            // Pre-define the "results" object for each media type - I only do this here so I don't have to check if it's defined later
            angular.forEach(self.boxes, function(box, type){
                var limit = self.boxes[type]['engines'].length > 1 ? 1 : 3;

                self.boxes[type].results = {};
                self.boxes[type].resultLimit = limit;
            });

            //  Iterate over the Promises for each engine returned by the oneSearch.searchAll() function
            angular.forEach(engines, function(engine, name){
                engine.response
                    .success(function(data){ // If $http call was a success

                        // User the engine's results getter to get the results object
                        // The results getter is defined by the JSON path defined by the
                        // "resultsPath" param in an engine's config
                        var res = engine.getResults(data);

                        // Double check that the data is defined, in case the search API returned a '200' status with empty results.
                        if (isEmpty(res)){
                            //console.log(self.boxes);
                            removeFromBoxes(name);
                            //console.log(self.boxes);
                        }
                        else {
                            // Group the results by defined media types
                            var grouped = mediaTypes.groupBy(res, engine.mediaTypes);

                            // Iterate over the boxes.
                            Object.keys(self.boxes).forEach(function(type){
                                // If a box type matches a group in the grouped results
                                if (grouped.hasOwnProperty(type)){
                                    // Put results in the boxes "results" object, referenced by the engine's name
                                    // Ex: self.boxes['books'].results['catalog'] = group_result;
                                    //
                                    // Also, limit the number of results per group by 3
                                    // TODO: Re-investigate dynamic limiting based on number of engines per box. Solution must not break async loading of engine results
                                    self.boxes[type].results[name] = $filter('limitTo')(grouped[type], 3);
                                }
                                // update loading progress, setting engine as loaded for current box
                                loadProgress(type, name);
                            });

                            //preload the engine's template for easy access for directives
                            self.engines[name] = {}
                            self.engines[name].tpl = oneSearch.getEngineTemplate(engine);
                            self.engines[name].controller = oneSearch.getEngineController(engine);
                        }
                    })
                    .error(function(msg){
                        // If error code return from $http, iterate through boxes object
                        // and remove any instance engine from a box's "engines" array
                        removeFromBoxes(name);
                    });
            });

        }
    }])

/**
 * BentoCtrl Controller - Bento Box route's Contorller
 *
 */
    .controller('BentoCtrl', ['$scope', 'Bento', function($scope, Bento){
        // When the route has changed/updated generate box results
        $scope.$on('$routeChangeSuccess', function(){
            Bento.getBoxes();
        })
    }])

/**
 * bentoBox Directive
 *
 * Each box is called using this directive, and is defined by a name. These names are first defined in an
 * engine's config while registering with the oneSearch Provider.
 *
 * Engine results, appropriate for each box, will be asynchronously appended to the HTML element with the following attribute:
 *      bento-box="BOX_NAME"
 *
 * HTML Example:
 *  <!-- Box names must match those defined by an engine's config -->
 *  <div bento-box="BOX_NAME">
 *      <h2>Box Title</h2>
 *  </div>
 */

    .directive('bentoBox', ['$rootScope', '$controller', '$compile', '$animate', 'Bento', function($rootScope, $controller, $compile, $animate, Bento){
        return {
            restrict: 'A', //The directive always requires and attribute, so disallow class use to avoid conflict
            link: function(scope, elm, attrs){
                //Get the box name from the elements bentoBox attribute
                var box = attrs.bentoBox;

                //Preload the spinner element
                var spinner = angular.element('<div id="loading-bar-spinner"><div class="spinner-icon"></div></div>');

                //Preload the location of the boxe's title element (needs to be more dynamic in the future)
                var titleElm = elm.find('h2');

                //Enter the spinner animation, appending it to the title element
                $animate.enter(spinner, titleElm, angular.element(titleElm[0].lastChild));

                //Watch the boxes "engines" Array
                var boxWatcher = scope.$watch(
                    function(){
                        return Bento.boxes[box]['engines'];
                    },
                    function(newVal, oldVal) {
                        // Has the "engines" Array changed?
                        if (newVal !== oldVal){
                            //variable for engine removed from array
                            var engine = '';

                            //intersect current and previous "engines" arrays to get the
                            //engine that is done loading (i.e., the engine name removed from the array)
                            //TODO: find more graceful way to know what engine is loaded?
                            for (var i = 0, len = oldVal.length; i < len; i++){
                                var eng = oldVal[i];
                                if (!(newVal.indexOf(eng) > -1)){
                                    engine = eng;
                                    break;
                                }
                            }

                            // Create a new isolated scope for the engine's results
                            // See $rootScope docs: https://code.angularjs.org/1.3.0/docs/api/ng/type/$rootScope.Scope#$new
                            // It's important to note this is an "isolated" scope (see: https://code.angularjs.org/1.3.0/docs/guide/directive#isolating-the-scope-of-a-directive)
                            var engineScope = $rootScope.$new(true);

                            // Place engine results for the current box under an "items" object in the new local scope
                            engineScope.items = Bento.boxes[box]['results'][engine];

                            if (engineScope.items && engineScope.items.length > 0){
                                // Set isCollapsed boolean to true
                                // For engines that have collapsible results (see /common/engines/ejournals/ejournals.tpl.html for example)
                                engineScope.isCollapsed = true;

                                // When the engine's promise is ready, then load the engine's contorller/template data applying
                                // the new isolated scope.
                                Bento.engines[engine].tpl.then(function(data){
                                    // manually inject controller if one is defined by the engine's config
                                    if (Bento.engines[engine].controller){
                                        var controller = $controller(Bento.engines[engine].controller, {$scope: engineScope});

                                        elm.data('$ngControllerController', controller);
                                        elm.children().data('$ngControllerController', controller);
                                    }
                                    // Wrap the template in an element that specifies ng-repeat over the "items" object (i.e., the results),
                                    // gives the generic classes for items in a bento box.
                                    var template = angular.element('<div class="animate-repeat bento-box-item" ng-repeat="item in items">'+data+'</div>');

                                    // Compile wrapped template with the isolated scope's context
                                    var html = $compile(template)(engineScope);

                                    // Append compiled HTML to box element
                                    elm.append(html);
                                });
                            }
                            //if (box == "recommend") console.log(newVal.length);
                            // If new array is empty, the box is considered "loaded"
                            if (newVal.length == 0){
                                done(box);
                            }
                        }
                    },
                    true
                );

                // Loaded and cleanup function
                function done(b){
                    console.log({b: b, box: box});
                    // If there are no results, print generated message
                    if (isEmpty(Bento.boxes[b]['results'])){

                        if (attrs.hideIfEmpty){
                            elm.addClass('hidden');
                        }
                        else{
                            elm.append("<strong>No Results</strong>");
                            elm.addClass('text-muted');
                        }
                    }

                    // Tell spinner to exit animation
                    $animate.leave(spinner);

                    // Destroy this box's watcher (no need to waste the cycles)
                    boxWatcher();
                }
            }
        }
    }])