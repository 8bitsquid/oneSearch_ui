angular.module('oneSearch.templates', ['bento/bento.tpl.html', 'common/directives/suggest/suggest.tpl.html', 'common/engines/acumen/acumen.tpl.html', 'common/engines/catalog/catalog.tpl.html', 'common/engines/databases/databases.tpl.html', 'common/engines/ejournals/ejournals.tpl.html', 'common/engines/google-cs/google-cs.tpl.html', 'common/engines/recommend/recommend.tpl.html', 'common/engines/scout/scout.tpl.html']);

angular.module("bento/bento.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("bento/bento.tpl.html",
    "<div class=\"bento-box-container\">\n" +
    "    <div class=\"bento-box-menu-container hidden-sm hidden-xs\">\n" +
    "        <nav class=\"bento-box-menu\" ui-scrollfix=\"+0\">\n" +
    "            <ul class=\"nav nav-justified\">\n" +
    "                <li ng-repeat=\"item in boxMenu\" class=\"{{item.box}}\">\n" +
    "                    <a href=\"\" du-smooth-scroll=\"{{item.box}}\" ng-click=\"selectBox(item.box)\">{{item.title}}</a>\n" +
    "                </li>\n" +
    "            </ul>\n" +
    "        </nav>\n" +
    "    </div>\n" +
    "    <div class=\"row\">\n" +
    "        <div class=\"col-md-4\">\n" +
    "            <div class=\"bento-box\" bento-box=\"articles\">\n" +
    "                <h2>Articles</h2>\n" +
    "\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div class=\"col-md-4\">\n" +
    "            <div class=\"bento-box\" bento-box=\"books\">\n" +
    "                <h2>Books</h2>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"col-sm-12 col-md-4\">\n" +
    "            <div class=\"bento-box\" bento-box=\"journals\">\n" +
    "                <h2>Journals</h2>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"row\">\n" +
    "        <div class=\"col-md-4\">\n" +
    "            <div class=\"bento-box\" bento-box=\"googleCS\">\n" +
    "                <h2 id=\"site-search\">Libraries' Website</h2>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"col-md-4\">\n" +
    "            <div class=\"bento-box\" bento-box=\"faq\">\n" +
    "                <h2>FAQ</h2>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "\n" +
    "\n" +
    "        <div class=\"col-md-4\">\n" +
    "            <div class=\"bento-box\" bento-box=\"libguides\">\n" +
    "                <h2>Research Guides</h2>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"row\">\n" +
    "        <div class=\"col-md-4\">\n" +
    "            <div class=\"bento-box\" bento-box=\"databases\">\n" +
    "                <h2>Databases</h2>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div class=\"col-md-4\">\n" +
    "            <div class=\"bento-box\" bento-box=\"acumen\">\n" +
    "                <h2 id=\"acumen\">Acumen</h2>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div class=\"col-md-4\">\n" +
    "            <div class=\"bento-box\" bento-box=\"other\">\n" +
    "                <h2>Other Items</h2>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    \n" +
    "    <div class=\"row\">\n" +
    "        <div class=\"col-md-12\">\n" +
    "            <div class=\"bento-box well\" bento-box=\"recommend\" hide-if-empty=\"true\" omit-from-menu=\"true\">\n" +
    "                <h2>Recommended Links</h2>\n" +
    "\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("common/directives/suggest/suggest.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/directives/suggest/suggest.tpl.html",
    "<div class=\"input-group input-group-lg\">\n" +
    "    <input type=\"text\" name=\"search\" class=\"form-control onesearch-text\" placeholder=\"{{prompt}}\" id=\"osTextField\"\n" +
    "           ng-model=\"model\" ng-change=\"onChange()\" ng-trim=\"false\" autocomplete=\"off\" />\n" +
    "    <div class=\"input-group-btn\">\n" +
    "        <button type=\"submit\" class=\"btn btn-onesearch btn-primary\"><span class=\"fa fa-search\"></span></button>\n" +
    "    </div>\n" +
    "</div>\n" +
    "<div class=\"suggest\" ng-show=\"showSuggestions && selected && (items.suggest.length > 0 || items.recommend.length > 0 || items.subjects[0].subjects.length > 0 || items.faq.length > 0)\">\n" +
    "    <div ng-show=\"items.suggest.length > 0\">\n" +
    "        <ul class=\"nav nav-pills nav-stacked\">\n" +
    "            <li role=\"presentation\"\n" +
    "                ng-repeat=\"item in filteredItems = (items.suggest | filter:compare(originalValue)) | limitTo:numShow track by $index\"\n" +
    "                ng-mousedown=\"handleSelection(item.search)\" ng-class=\"item.class\"\n" +
    "                ng-mouseenter=\"setCurrent($index, false)\">\n" +
    "                <a href=\"#/bento/{{item.search}}\" ng-click=\"gaTypeAhead(item.search)\">{{item.search}}</a>\n" +
    "            </li>\n" +
    "        </ul>\n" +
    "    </div>\n" +
    "    <div class=\"suggest-row\" ng-show=\"items.recommend.length > 0 || items.subjects[0].subjects.length > 0 || items.faq.length > 0\">\n" +
    "        <div class=\"row\">\n" +
    "            <div class=\"col-sm-4 suggest-col\" ng-show=\"items.recommend.length > 0\">\n" +
    "                <div class=\"\">\n" +
    "                    <h4>Recommended Links</h4>\n" +
    "                    <div ng-repeat=\"recommendation in items.recommend | limitTo:10\">\n" +
    "                        <a ng-href=\"{{recommendation.link}}\" ng-click=\"gaSuggestion(recommendation.description)\">\n" +
    "                            {{recommendation.description}}\n" +
    "                        </a>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div class=\"col-sm-4 suggest-col\" ng-show=\"items.subjects[0].subjects.length > 0\">\n" +
    "                <div class=\"\">\n" +
    "                    <h4>LibGuides Subjects <a href=\"http://guides.lib.ua.edu/\" class=\"small\" ng-mousedown=\"go('http://guides.lib.ua.edu/')\">more</a></h4>\n" +
    "                    <div ng-repeat=\"person in items.subjects | limitTo:10\">\n" +
    "                        <div ng-repeat=\"subject in person.subjects | limitTo:2\">\n" +
    "                            <a ng-if=\"subject.link.length > 7\" ng-href=\"{{subject.link}}\" ng-mousedown=\"go(subject.link)\" ng-click=\"gaSuggestion(subject.subject)\">\n" +
    "                                {{subject.subject}}\n" +
    "                            </a>\n" +
    "                            <a ng-if=\"subject.link.length <= 7\" href=\"#\"\n" +
    "                               ng-mousedown=\"go('mailto:' + person.email + '?subject=Question')\">\n" +
    "                                Ask {{person.name}}, {{person.title}} at {{person.department}}\n" +
    "                            </a>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div class=\"col-sm-4 suggest-col\" ng-show=\"items.faq.length > 0\">\n" +
    "                <div class=\"\">\n" +
    "                    <h4>FAQ <a href=\"http://ask.lib.ua.edu/\" class=\"small\" ng-mousedown=\"go('http://ask.lib.ua.edu/')\">more</a></h4>\n" +
    "                    <div ng-repeat=\"faq in items.faq | limitTo:5\">\n" +
    "                        <a ng-href=\"{{faq.link}}\" ng-mousedown=\"go(faq.link)\"  ng-click=\"gaSuggestion(faq.title)\" ng-bind-html=\"faq.title\">\n" +
    "                        </a>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("common/engines/acumen/acumen.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/engines/acumen/acumen.tpl.html",
    "<div class=\"media\">\n" +
    "    <a class=\"pull-left\" ng-href=\"http://acumen.lib.ua.edu/{{item.link}}\" title=\"{{item.title}}\" target=\"_acumen\">\n" +
    "        <img ng-src=\"{{item.thumb_path}}\">\n" +
    "    </a>\n" +
    "    <div class=\"media-body\">\n" +
    "        <h4 class=\"media-heading\">\n" +
    "            <a ng-href=\"http://acumen.lib.ua.edu/{{item.link}}\" target=\"_acumen\" title=\"{{item.title}}\" ng-click=\"gaPush()\">{{item.title | truncate: 40: '...': true}}</a>\n" +
    "        </h4>\n" +
    "        <div class=\"details-context\">\n" +
    "            <span ng-if=\"item.date\" ng-bind-html=\"item.date\"></span>\n" +
    "            <span ng-if=\"item.type\" ng-bind-html=\"item.type | ucfirst\"></span>\n" +
    "        </div>\n" +
    "        <p>{{item.description | truncate: 125: '...': true}}</p>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("common/engines/catalog/catalog.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/engines/catalog/catalog.tpl.html",
    "<div class=\"media\">\n" +
    "    <div class=\"media-body\">\n" +
    "        <h4 class=\"media-heading\">\n" +
    "            <a ng-href=\"{{item.href}}\"\n" +
    "               title=\"{{item.title}}\"\n" +
    "               ng-bind-html=\"item.title | truncate: 50: '...': true\" target=\"_catalog\" ng-click=\"gaPush()\"></a>\n" +
    "        </h4>\n" +
    "        <div class=\"details-context\">\n" +
    "            <span ng-if=\"item.year && item.year | number\" ng-bind-html=\"item.year\"></span>\n" +
    "            <span ng-if=\"item.mediaType\" ng-bind-html=\"item.mediaType\"></span>\n" +
    "            <span ng-if=\"item.issn\">ISSN: {{item.issn}}</span>\n" +
    "        </div>\n" +
    "        <div class=\"details-container\" ng-if=\"item.author\">\n" +
    "            <span class=\"text-muted\">Author(s)</span>\n" +
    "            <span class=\"detail\">\n" +
    "                <span ng-bind-html=\"item.author | lowercase | ucfirst\"></span>\n" +
    "            </span>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("common/engines/databases/databases.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/engines/databases/databases.tpl.html",
    "<div class=\"media\">\n" +
    "    <div class=\"media-body\">\n" +
    "        <h4 class=\"media-heading\">\n" +
    "            <a ng-href=\"{{item.url}}\" title=\"{{item.title}}\" target=\"_databases\" ng-click=\"gaPush()\">{{item.title | truncate: 40: '...': true}}</a>\n" +
    "        </h4>\n" +
    "        <div class=\"details-context\">\n" +
    "            <span ng-if=\"item.coverage\" ng-bind-html=\"item.coverage\"></span>\n" +
    "        </div>\n" +
    "        <p>\n" +
    "            {{item.description | truncate: 125: '...'}}\n" +
    "        </p>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("common/engines/ejournals/ejournals.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/engines/ejournals/ejournals.tpl.html",
    "<div class=\"media\">\n" +
    "    <div class=\"media-body\">\n" +
    "        <h4 class=\"media-heading\">\n" +
    "            <a ng-href=\"{{item.links[0].href}}\" title=\"{{item.title}}\" target=\"_ejournals\" ng-click=\"gaPush()\">{{item.title | ltrim | truncate: 50: '...': true}}</a>\n" +
    "        </h4>\n" +
    "\n" +
    "        <div class=\"details-context\">\n" +
    "            <span ng-if=\"item.date\" ng-bind-html=\"item.date\"></span>\n" +
    "            <span ng-if=\"item.links[0]\">\n" +
    "                <span title=\"{{item.links[0].name}}\">{{item.links[0].name | ltrim | truncate: 35: '...'}}</span>\n" +
    "            </span>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"details-container\" ng-if=\"item.authors\">\n" +
    "            <span class=\"text-muted\">Authors </span>\n" +
    "            <span class=\"details\" ng-bind-html=\"item.authors\"></span>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"details-container\" ng-if=\"item.links[1]\">\n" +
    "            <span class=\"text-muted\">Other Sources </span>\n" +
    "            <span class=\"details\" ng-repeat=\"link in item.links | after:1 | limitTo : (sourceLimit ? 10 : 2)\">\n" +
    "                <a ng-href=\"{{link.href}}\"\n" +
    "                   title=\"{{link.name}}\"\n" +
    "                   class=\"source-link\"\n" +
    "                   ng-bind-html=\"link.name | ltrim | truncate: 35: '...': true\"></a>\n" +
    "            </span>\n" +
    "            <div ng-show=\"item.links[3]\">\n" +
    "                <button type=\"button\" class=\"btn btn-default btn-xs\" ng-click=\"sourceLimit = !sourceLimit\">{{sourceLimit? 'less' : 'more'}} sources</button>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("common/engines/google-cs/google-cs.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/engines/google-cs/google-cs.tpl.html",
    "<div class=\"media\">\n" +
    "    <div class=\"media-body\">\n" +
    "        <h4 class=\"media-heading\"><a ng-href=\"{{item.link}}\" title=\"{{item.title}}\" target=\"_googlecs\" ng-click=\"gaPush()\">{{item.title | truncate: 40: '...': true}}</a></h4>\n" +
    "        <p ng-bind-html=\"item.snippet\"></p>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("common/engines/recommend/recommend.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/engines/recommend/recommend.tpl.html",
    "<a ng-href=\"{{item.link}}\" title=\"{{item.descr}}\">{{item.descr}}</a>\n" +
    "");
}]);

angular.module("common/engines/scout/scout.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/engines/scout/scout.tpl.html",
    "<div class=\"media\">\n" +
    "    <div class=\"media-body\">\n" +
    "        <h4 class=\"media-heading\">\n" +
    "            <a ng-href=\"{{item.PLink}}\"\n" +
    "               title=\"{{item.Items[0].Data}}\"\n" +
    "               target=\"_scout\"\n" +
    "               ng-bind-html=\"item.title | lowercase | ucfirst | truncate: 80: '...': true\" ng-click=\"gaPush()\"></a>\n" +
    "        </h4>\n" +
    "        <div class=\"details-context\">\n" +
    "            <span ng-if=\"item.RecordInfo.BibRecord.BibRelationships.IsPartOfRelationships[0].BibEntity.Dates[0]\">{{item.RecordInfo.BibRecord.BibRelationships.IsPartOfRelationships[0].BibEntity.Dates[0].Y}} </span>\n" +
    "            <span ng-if=\"item.mediaType\">{{item.mediaType}} </span>\n" +
    "            <span ng-if=\"item.FullText.Text.Availability\">Full Text Online</span>\n" +
    "        </div>\n" +
    "        <div collapse=\"isCollapsed\" ng-show=\"(item.RecordInfo.BibRecord.BibRelationships.HasContributorRelationships || item.source || item.RecordInfo.BibRecord.BibEntity.Subjects)\">\n" +
    "            <div class=\"details-container\" ng-if=\"item.RecordInfo.BibRecord.BibRelationships.HasContributorRelationships\">\n" +
    "                <span class=\"text-muted\">Authors </span>\n" +
    "            <span class=\"details\"\n" +
    "                  ng-repeat=\"author in item.RecordInfo.BibRecord.BibRelationships.HasContributorRelationships | unique: 'PersonEntity.Name.NameFull'\"\n" +
    "                  ng-bind-html=\"author.PersonEntity.Name.NameFull | lowercase | ucfirst\"></span>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"details-container\" ng-if=\"item.source\">\n" +
    "                <span class=\"text-muted\">Sources </span>\n" +
    "                <span class=\"details\" ng-bind-html=\"item.source\"></span>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"details-container\" ng-if=\"item.RecordInfo.BibRecord.BibEntity.Subjects\">\n" +
    "                <span class=\"text-muted\">Subejcts </span>\n" +
    "            <span class=\"details\"\n" +
    "                  ng-repeat=\"subject in item.RecordInfo.BibRecord.BibEntity.Subjects\"\n" +
    "                  ng-bind-html=\"subject.SubjectFull\"></span>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div ng-show=\"item.RecordInfo.BibRecord.BibRelationships.HasContributorRelationships || item.source || item.RecordInfo.BibRecord.BibEntity.Subjects\">\n" +
    "            <button type=\"button\" class=\"btn btn-default btn-xs\" ng-click=\"isCollapsed = !isCollapsed\">{{!isCollapsed ? 'less' : 'more'}} detail</button>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>");
}]);

/**
 * Central oneSearch module that defined all components and dependencies involved
 * for the oneSearch interface.
 *
 * All modules in this app are named with their immediate parent's name prepended.
 * So, all modules at this point are prepended with "oneSearch.*", and modules loaded in "oneSearch.common" are prepended with "common.*", and so on.
 * This is a lazy attempt to prevent namespace conflicts with other javascripts.
 */
angular.module('oneSearch', [
    'ngRoute',
    'ngResource',
    'ngAnimate',
    'ngSanitize',
    'ui.bootstrap',
    'angular.filter',
    'duScroll',
    'ualib.ui',
    'oneSearch.common',
    'oneSearch.templates',
    'oneSearch.bento'
])
    // The URL to the main website
    .constant('UALIB_DOMAIN', '//wwwdev2.lib.ua.edu/')

    // Default search parameters
    .value('SearchParams', {
        limit: 100
    })

    .value('duScrollOffset', 81)

angular.module('oneSearch.bento', [])

    .config(['$routeProvider', function($routeProvider) {
        /**
         * Register Bento Box display route with ngRoute's $routeProvider
         */
        $routeProvider
            .when('/bento/:s', {
                templateUrl: 'bento/bento.tpl.html',
                controller: 'BentoCtrl'
            });
    }])

/**
 * Bento Service Provider
 *
 * This service uses the mediaTypes service to organize the engine results by media type
 * and preloaded an engine's template and controller (if defined) if there are results for that engine.
 */
    .service('Bento', ['$routeParams', '$rootScope','$q', 'oneSearch', 'mediaTypes', function($routeParams, $rootScope, $q, oneSearch, mediaTypes){
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

        this.boxMenu = [];

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
                setResultLimit(type);
                self.boxes[type].engines.splice(i, 1);
            }
        }

        // Remove an engine from all boxes
        function removeFromBoxes(engine){
            angular.forEach(self.boxes, function(box, type){

                loadProgress(type, engine);
            })
        }

        function initResultLimit(box){
            var numEngines = self.boxes[box]['engines'].length;
            var limit = numEngines > 1 ? 1 : (numEngines < 2 ? 3 : 2);
            self.boxes[box].resultLimit = limit;
        }

        function setResultLimit(box){
            $q.when(self.boxes[box].results)
                .then(function(results){
                    var numResults = Object.keys(results).length;
                    var numEngines = self.boxes[box]['engines'].length;
                    var expecting = numResults + numEngines;

                    if ((expecting < 2 && self.boxes[box].resultLimit < 3) || (expecting < 3 && self.boxes[box].resultLimit < 2)){
                        self.boxes[box].resultLimit++;
                    }
                });
        }

        var engines;

        // Gets all boxes
        this.getBoxes = function(){
            // Search all engines registered with the oneSearch Provider, giving the
            // $routeParams object as the parameter (https://code.angularjs.org/1.3.0/docs/api/ngRoute/service/$routeParams)
            engines = oneSearch.searchAll($routeParams);

            // Deep copy media types defined by registered engines to the this.boxes object.
            angular.copy(mediaTypes.types, self.boxes);

            // Pre-define the "results" object for each media type - I only do this here so I don't have to check if it's defined later
            angular.forEach(self.boxes, function(box, type){
                initResultLimit(type);
                self.boxes[type].results = {};
                self.boxes[type].resourceLinks = {};
                self.boxes[type].resourceLinkParams = {};

            });

            //  Iterate over the Promises for each engine returned by the oneSearch.searchAll() function
            angular.forEach(engines, function(engine, name){

                engine.response
                    .then(function(data){ // If $http call was a success

                        // User the engine's results getter to get the results object
                        // The results getter is defined by the JSON path defined by the
                        // "resultsPath" param in an engine's config
                        var res = engine.getResults(data);
                        var link = engine.getResourceLink(data);

                        // Double check that the data is defined, in case the search API returned a '200' status with empty results.
                        if (isEmpty(res)){
                            //console.log(self.boxes);
                            removeFromBoxes(name);
                            //console.log(self.boxes);
                        }
                        else {
                            res = res.map(function(item, i){
                                var newItem = item;
                                newItem.position = i;
                                return newItem;
                            });
                            //console.log(res);
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
                                    // and sort by generation position in the original results list
                                    self.boxes[type].results[name] = grouped[type].sort(function(a, b){
                                        if (a.position > b.position){
                                            return 1;
                                        }
                                        if (a.position < b.position){
                                            return -1;
                                        }
                                        return 0;
                                    });

                                    // set resource "more" link
                                    self.boxes[type].resourceLinks[name] = decodeURIComponent(link[engine.id]);

                                    // set resource link parameters by media type specified by the engine config
                                    if (angular.isObject(engine.mediaTypes)){
                                        self.boxes[type].resourceLinkParams[name] = engine.mediaTypes.types[type];
                                    }
                                }
                                // update loading progress, setting engine as loaded for current box
                                loadProgress(type, name);
                            });

                            //preload the engine's template for easy access for directives
                            self.engines[name] = {};
                            self.engines[name].tpl = oneSearch.getEngineTemplate(engine);
                            self.engines[name].controller = oneSearch.getEngineController(engine);
                        }
                    }, function(msg){
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
            Bento.boxMenu = [];
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



    .directive('bentoBox', ['$rootScope', '$controller', '$compile', '$animate', '$timeout', 'Bento', 'oneSearch', function($rootScope, $controller, $compile, $animate, $timeout, Bento, oneSearch){
        return {
            restrict: 'A', //The directive always requires and attribute, so disallow class use to avoid conflict
            scope: {},
            link: function(scope, elm, attrs, Ctrl){
                //Get the box name from the elements bentoBox attribute
                var box = attrs.bentoBox;
                elm.addClass(box);
                elm.parent().attr('id', box + '-parent');

                scope.bento= Bento;

                //Preload the spinner element
                var spinner = angular.element('<div id="loading-bar-spinner"><div class="spinner-icon"></div></div>');

                //Preload the location of the boxe's title element (needs to be more dynamic in the future)
                var titleElm = elm.find('h2');
                titleElm.attr('id', box);

                // Preserve boxTitle text before any loading/waiting messages are inserted.
                var boxTitle = titleElm.text();


                // Box menu/index scope variables
                if (!attrs.omitFromMenu){
                    Bento.boxMenu.push({box: box, title: boxTitle, loaded: false, noResults: false});
                }

                //Enter the spinner animation, appending it to the title element
                $animate.enter(spinner, titleElm, angular.element(titleElm[0].lastChild));

                var engineTimeout;
                var waitingMessage = angular.element(' <span class="unresponsive-msg">Awaiting results from provider</span>');

                function checkEngineStatus(){
                    var engines = angular.copy(Bento.boxes[box]['engines']);
                    var en = [];
                    for (var e in oneSearch.engines){
                        if (engines.indexOf(e) > -1){
                            if (oneSearch.engines[e].response && !oneSearch.engines[e].response.done){
                                en.push(e);
                            }

                        }
                    }
                    if (engineTimeout && !spinner.hasClass('unresponsive')){
                        spinner.addClass('unresponsive');

                        $animate.enter(waitingMessage, spinner, angular.element(spinner[0].lastChild));
                    }

                    if (en.length){
                        engineTimeout = $timeout(checkEngineStatus, 500)
                    }

                }

                $timeout(checkEngineStatus, 2000);

                //Watch the boxes "engines" Array
                var boxWatcher = scope.$watchCollection(
                    function(){
                        return Bento.boxes[box]['engines'];
                    },
                    function(newVal, oldVal) {
                        // Has the "engines" Array changed?
                        if (newVal !== oldVal){
                            //console.log(box);
                            //console.log(newVal);
                            //console.log(oldVal);
                            //console.log('----------------------------');

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

                            // Create a new scope for the engine's results
                            // See $rootScope docs: https://code.angularjs.org/1.3.0/docs/api/ng/type/$rootScope.Scope#$new
                            var engineScope = $rootScope.$new();

                            // Place engine results for the current box under an "items" object in the new local scope
                            engineScope.items = Bento.boxes[box]['results'][engine];


                            if (engineScope.items && engineScope.items.length > 0){
                                // Set isCollapsed boolean to true
                                // For engines that have collapsible results (see /common/engines/ejournals/ejournals.tpl.html for example)
                                engineScope.isCollapsed = true;

                                ///engineScope.limit = Bento.boxes[box].resultLimit;
                                engineScope.engine = engine;
                                engineScope.resourceLink = Bento.boxes[box]['resourceLinks'][engine] === "undefined" ? false : Bento.boxes[box]['resourceLinks'][engine];
                                engineScope.resourceLinkParams = Bento.boxes[box]['resourceLinkParams'][engine];
                                engineScope.boxName = boxTitle;
                                engineScope.mediaType = box;
                                // When the engine's promise is ready, then load the engine's controller/template data applying
                                // the new isolated scope.
                                Bento.engines[engine].tpl.then(function(data){

                                    var EngCtrl = ['$scope', '$element', 'Bento', function($scope, $element, Bento){
                                        // Extend any controller defined by an engine's config
                                        if (Bento.engines[$scope.engine].controller){
                                            angular.extend(this, $controller(Bento.engines[$scope.engine].controller, {$scope: $scope}));
                                        }
                                        var gaBox = $scope.boxName.toLowerCase().trim().replace(/\s+/g, '_').replace(/[']+/g, '');
                                        $scope.box = Bento.boxes[box];

                                        $scope.gaPush = function(){
                                            ga('send', 'event', 'oneSearch', 'item_click', gaBox);
                                        };
                                        $scope.gaMore = function(){
                                            ga('send', 'event', 'oneSearch', 'more_click', 'more_' + gaBox);
                                        };

                                    }];

                                    var controller = $controller(EngCtrl, {$scope: engineScope, $element: elm});
                                    elm.data('$ngControllerController', controller);
                                    elm.children().data('$ngControllerController', controller);

                                    // Wrap the template in an element that specifies ng-repeat over the "items" object (i.e., the results),
                                    // gives the generic classes for items in a bento box.
                                    var template = angular.element('<div class="animate-repeat bento-box-item" ng-repeat="item in items | limitTo: box.resultLimit">'+data+'</div><div class="resource-link-container"><a class="btn btn-link btn-sm" ng-href="{{resourceLink}}" ng-if="resourceLink" target="_{{engine}}" ng-click="gaMore()">More results from {{engine | ucfirst}}  <span class="fa fa-fw fa-external-link"></span></a></div>');

                                    // Compile wrapped template with the isolated scope's context
                                    var html = $compile(template)(engineScope);

                                    // Append compiled HTML to box element
                                    elm.append(html);
                                });
                            }
                            else {
                                $rootScope.$broadcast('NoResultsForEngine', {engine: engine, box: box});
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
                    //console.log({b: b, box: box});
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

                    // Tell bentoMenu item it's loaded
                    Bento.boxMenu = Bento.boxMenu.map(function(obj){
                        if (obj.box === b){
                            obj.loaded = true;

                            if (isEmpty(Bento.boxes[b]['results'])){
                                obj.noResults = true;
                            }
                        }
                        return obj
                    });

                    // Tell spinner to exit animation
                    $animate.leave(spinner);

                    //$timeout.cancel(engineTimeout);

                    // Destroy this box's watcher (no need to waste the cycles)
                    boxWatcher();
                }
            }
        }
    }])

    .directive('bentoBoxMenu', ['Bento', '$document', '$rootScope', '$timeout', '$q', function(Bento, $document, $rootScope, $timeout, $q){
        return {
            restrict: 'AC',
            replace: true,
            link: function(scope, elm){
                var selected;
                var timeout;
                scope.boxMenu = Bento.boxMenu;

                scope.selectBox = function(box){
                    if (timeout){
                        $timeout.cancel(timeout);
                        $document.off('scroll', onScroll);
                    }

                    deselect();
                    select(box);

                    timeout = $timeout(function(){
                        $document.on('scroll', onScroll);
                    }, 500);
                };

                var select = function(box){
                    selected = angular.element(document.getElementById(box + '-parent'));
                    selected.addClass('box-selected');
                };

                var deselect = function(){
                    if (selected){
                        selected.removeClass('box-selected');
                    }
                };

                var onScroll = function(){
                    deselect();
                    $document.off('scroll', onScroll);
                }
            }
        }
    }])
/**
 * Central registration module for all common components.
 * "Common" components are modules that can be used by any view or front-end controller,
 * allowing them to be globally accessible to all aspects of the application.
 *
 */
angular.module('oneSearch.common', [
    'common.mediaTypes',
    'common.oneSearch',
    'common.engines',
    'filters.nameFilter'
])
angular.module('oneSearch.common')
    .factory('dataFactory', ['$http', function($http) {
        return {
            get: function(url) {
                return $http.get(url).then(function(resp) {
                    return resp.data; // success callback returns this
                });
            }
        };
    }])
    .directive('suggestOneSearch', ['$timeout', '$document', function($timeout, $document) {
        return {
            restrict: 'AEC',
            scope: {
                prompt: '@',
                model: '=',
                search: '='
            },
            controller: function($scope, $window, $timeout, $document,  dataFactory){
                $scope.items = {};
                $scope.filteredItems = [];
                $scope.model = "";
                $scope.current = -1;
                $scope.originalValue = $scope.model;
                $scope.dataRequested = false;
                $scope.numShow = 5;
                $scope.faqSearched = false;

                // hides the list initially
                $scope.selected = false;

                $scope.onChange = function(){
                    //console.log("OnChange event.");
                    $scope.selected = true;
                    var fixedString = $scope.model.replace(/\//g, " ");

                    if ($scope.model.length < 3 ||
                        ($scope.model.indexOf($scope.originalValue) < 0 && $scope.model.length >= $scope.originalValue.length) ||
                        ($scope.originalValue.indexOf($scope.model) < 0 && $scope.model.length <= $scope.originalValue.length)){
                        $scope.items = {};
                        $scope.setCurrent(-1, false);
                        $scope.dataRequested = false;
                        $scope.selected = false;
                        $scope.faqSearched = false;
                    }
                    if ($scope.model.length > 2 && !$scope.dataRequested){
                        dataFactory.get('//wwwdev2.lib.ua.edu/oneSearch/api/suggest/' + encodeURI(fixedString))
                            .then(function(data) {
                                $scope.items.suggest = data;
                                $scope.setCurrent(-1, false);
                            });
                        $scope.dataRequested = true;
                    }
                    if ($scope.model.length > 2){
                        $timeout(function() {
                            dataFactory.get('//wwwdev2.lib.ua.edu/oneSearch/api/recommend/' + encodeURI(fixedString))
                                .then(function(data) {
                                    $scope.items.recommend = data;
                                });
                            dataFactory.get('//wwwdev2.lib.ua.edu/staffDir/api/subject/' + encodeURI(fixedString) + '/match/startwith')
                                .then(function(data) {
                                    $scope.items.subjects = data;
                                });
                        }, 0);
                    }
                    if ($scope.model.length > 4 && !$scope.faqSearched){
                        //run GCS only if the last character is a space and prev one is not
                        var lastTwo = fixedString.slice(-2);
                        //console.log("Checking conditions for GCS search..." + lastTwo);
                        if (lastTwo.indexOf(" ") > 0) {
                            //console.log("Running GCS search.");
                            $timeout(function() {
                                $scope.faqSearched = true;
                                dataFactory.get('https://www.googleapis.com/customsearch/v1?key=AIzaSyCMGfdDaSfjqv5zYoS0mTJnOT3e9MURWkU&cx=003453353330912650815:lfyr_-azrxe&q=' +
                                    encodeURI(fixedString) + '&siteSearch=ask.lib.ua.edu')
                                    .then(function (data) {
                                        // pluck out the items array for easier 'suggestWatcher' processing
                                        $scope.items.faq = data.items;
                                    });
                            }, 0);
                        }
                    }
                    $scope.originalValue = $scope.model;
                };
                $scope.go = function ( path ) {
                    $scope.model = "";
                    $scope.originalValue = $scope.model;
                    $window.location.href = path;
                };
                $scope.setCurrent = function(index, forceModel) {
                    $scope.current = index;
                    if (typeof $scope.items.suggest != 'undefined')
                        for (var i = 0; i < $scope.items.suggest.length; i++)
                            $scope.items.suggest[i].class = '';
                    if (index >= 0)
                        if ($scope.filteredItems.length > 0){
                            if (index > $scope.filteredItems.length - 1)
                                index = $scope.filteredItems.length - 1;
                            if (forceModel)
                                $scope.model = $scope.filteredItems[index].search;
                            $scope.filteredItems[index].class = 'active';
                            $scope.current = index;
                        }
                };
                $scope.onFocus = function(){
                    if (angular.isDefined($scope.model) && $scope.model.length > 2){
                        $scope.selected = true;
                    }
                    //console.log("onFocus()");
                };
                $scope.onBlur = function(event){
                    //console.log("onBlur()");
                    $scope.selected = false;
                    $document.unbind("click");
                };
                $scope.compare = function(query){
                    return function(item){
                        if (item.search.indexOf(query) == 0 &&
                            !angular.equals(item.search.toLowerCase(), query.toLowerCase()))
                            return true;
                        return false;
                    };
                };

                // This is dumb, but quick fix to get GA events on suggestion box.
                // TODO: Remove this and add in global GA directives
                $scope.gaSuggestion = function(linkTitle){
                    ga('send', 'event', 'oneSearch', 'suggestion_click', linkTitle);
                };
                $scope.gaTypeAhead = function(linkTitle){
                    ga('send', 'event', 'oneSearch', 'type_ahead_click', linkTitle);
                };
            },
            link: function(scope, elem, attrs) {
                scope.showSuggestions = false;
                var suggestWatcher = scope.$watch('items', function(newVal, oldVal){
                    var show = false;

                    for (var item in newVal){
                        if (item.length > 0){
                            show = true;
                            break;
                        }
                    }

                    scope.showSuggestions = (scope.model.length > 2 && show);
                }, true);

                elem.bind("keydown", function (event) {
                    switch(event.keyCode){
                        //ArrowUp
                        case 38:
                            if (scope.current > 0){
                                scope.setCurrent(scope.current - 1, true);
                                event.preventDefault();
                            } else {
                                scope.setCurrent(-1, false);
                                scope.model = scope.originalValue;
                                event.preventDefault();
                            }
                            break;

                        //ArrowDown
                        case 40:
                            if (scope.model.length > 2 && scope.current < scope.numShow - 1)
                                if (scope.current < scope.items.suggest.length - 1){
                                    scope.setCurrent(scope.current + 1, true);
                                    event.preventDefault();
                                }
                            break;

                        //Enter
                        case 13:
                            scope.selected = false;

                            // Check if type-ahead selected. If so, trigger GA event
                            // gaTypeAhead() is also bound to ng-click for each type-ahead link
                            if (scope.current > -1 && scope.filteredItems[scope.current] && scope.model === scope.filteredItems[scope.current].search){
                                scope.gaTypeAhead(scope.model);
                            }
                            break;

                        //Backspace
                        case 8:
                        //Delete
                        case 46:
                            scope.selected = true;
                            break;

                        default:
                            //console.log("KeyCode " + event.keyCode);
                            break;
                    }
                    scope.$apply();
                });

                // Unbind key event when scope is destroyed
                scope.$on('$destroy', function(){
                    elem.unbind("keydown");
                    suggestWatcher();
                    //console.log("$destroy");
                });

                elem.bind("click", function (event) {
                    if (event.target.id === "osTextField") {
                        scope.onFocus();
                        $document.bind("click", function(event) {
                            if (event.target.id === "osTextField") {
                                scope.onFocus();
                            } else
                            if (event.button < 1) {
                                scope.onBlur(event);
                            }
                            scope.$apply();
                        });
                    } else
                    if (event.button < 1) {
                        scope.onBlur(event);
                    }
                    scope.$apply();
                });

                scope.handleSelection = function(selectedItem) {
                    $timeout(function() {
                        scope.model = selectedItem;
                        scope.originalValue = "";
                        scope.items = {};
                        scope.setCurrent(-1, false);
                        scope.dataRequested = false;
                        scope.selected = false;
                        scope.faqSearched = false;
                        scope.$apply();
                        scope.search();
                    }, 0);
                };

            },
            templateUrl: 'common/directives/suggest/suggest.tpl.html'
        };
    }]);

angular.module('engines.acumen', [])

    .config(['oneSearchProvider', function(oneSearchProvider){
        oneSearchProvider.engine('acumen', {
            id: 8,
            priority: 3,
            resultsPath: 'Acumen.data',
            totalsPath: 'Acumen.metadata.numFound',
            templateUrl: 'common/engines/acumen/acumen.tpl.html',
            controller: 'AcumenCtrl'
        })
    }])

    .controller('AcumenCtrl', function($scope, $filter){
        var items = $scope.items;

        for (var i = 0, len = items.length; i < len; i++) {
            if (items[i].type) {
                //console.log(items[i].type);
                if (items[i].type[0] == 'text' && items[i].details && items[i].details.genre) items[i].type = items[i].details.genre.sort().shift();
                else items[i].type = items[i].type.sort().shift();
            }
        }
    });
angular.module('engines.catalog', [])

    .config(['oneSearchProvider', function(oneSearchProvider){
        oneSearchProvider.engine('catalog', {
            id: 64,
            priority: 5,
            resultsPath: 'Catalog.list',
            totalsPath: 'Catalog.total',
            mediaTypes: {
                path: 'bibFormat',
                types: {
                    books: ['aa','ac', 'ad', 'am'],
                    journals: ['ab','as','bb','bs','cb','cs','db','ds','eb','es','fb','fs','gb','gs','ib','is','jb','js','kb','ks','mb','ms','ob','os','pb','ps','rb','rs','tb','ts']
                }
            },
            templateUrl: 'common/engines/catalog/catalog.tpl.html',
            controller: 'CatalogCtrl'
        })
    }])

    .filter('catalogSplitTitleAuthor', [function(){
        return function(title){
            if (title.indexOf('/') > -1){
                var titleParts = title.split(/\s\/\sedited\sby\s([^.+]+)\./);
                title = titleParts
            }
            return title;
        }
    }])

    .controller('CatalogCtrl', function($scope, $filter){
        var types = {
            bc: "Archive/Manuscript",
            cm: "Music Score",
            em: "Map",
            im: "Nonmusical Recording",
            jm: "Musical Recording",
            mm: "Computer File/Software",
            om: "Kit",
            pc: "Mixed Material/Collection",
            pm: "Mixed Material",
            rm: "Visual Material"
        };
        var items = $scope.items;

        for (var i = 0; i < items.length; i++){
            var t = items[i]['bibFormat'];
            items[i].mediaType = types[t];

            //Check for authors field. If not there, check the title for author names.
            if (!items[i].author){
                var split = $filter('catalogSplitTitleAuthor')(items[i].title);
                if (angular.isArray(split)){
                    items[i].title = split[0];
                    items[i].author = split[2];
                }
            }
        }

        if (angular.isArray($scope.resourceLinkParams)){
            var typeParam = '&type=';
            var params = typeParam + $scope.resourceLinkParams.join(typeParam);
            $scope.resourceLink += params;
        }

        $scope.items = items;
    });

angular.module('engines.databases', [])

    .config(['oneSearchProvider', function(oneSearchProvider){
        oneSearchProvider.engine('databases', {
            id: 2,
            priority: 1,
            resultsPath: 'Databases.databases',
            totalsPath: 'Databases.totalResults',
            templateUrl: 'common/engines/databases/databases.tpl.html'
        })
    }])
angular.module('engines.ejournals', [])

    .config(['oneSearchProvider', function(oneSearchProvider){
        oneSearchProvider.engine('ejournals', {
            id: 4,
            priority: 6,
            resultsPath: 'eJournals.results',
            totalsPath: 'eJournals.total',
            mediaTypes: {
                path: 'type',
                types: {
                    books: 'book',
                    journals: 'periodical'
                }
            },
            templateUrl: 'common/engines/ejournals/ejournals.tpl.html',
            controller: 'EjouralsCtrl'
        })
    }])

    .controller('EjouralsCtrl', function($scope){

        var param;
        switch ($scope.mediaType){
            case 'books':
                param = 'SS_searchTypeBook=yes';
                break;
            case 'journals':
                param = 'SS_searchTypeJournal=yes';
                break;
            case 'other':
                param = 'SS_searchTypeOther=yes'
        }

        if (param){
            $scope.resourceLink = $scope.resourceLink.replace('SS_searchTypeAll=yes&SS_searchTypeBook=yes&SS_searchTypeJournal=yes&SS_searchTypeOther=yes', param);
        }
    });
/**
 * @module common.engines
 *
 * Acts as central dependency manager for search engines.
 * All engines must be included here to appear in the results.
 *
 */
angular.module('common.engines', [
    'engines.acumen',
    'engines.catalog',
    'engines.databases',
    'engines.scout',
    'engines.googleCS',
    'engines.faq',
    'engines.libguides',
    'engines.ejournals',
    'engines.recommend'
])
/**
 * @Service enginesTemplateFactory
 *
 * Used to load an engine's template, defined through params in the engine's config with the oneSearch Provider
 * Currently, only loading templates through URL and $templateCache is available.
 * TODO: Allow String templates and TemplateProviders to load engine templates.
 *
 *
 */
    .service('enginesTemplateFactory', ['$http', '$templateCache', function($http, $templateCache){

        // Generic getter to load template based on engine config
        // @param config An Engine's config Object
        this.get = function(config){
            // return template is "templateUrl" is defined. otherwise, return null
            return angular.isDefined(config.templateUrl) ? this.fromUrl(config.templateUrl) : null;
        };

        // So far only templateUrl is supported - worked with both file and cached templates.
        // adopted from https://github.com/angular-ui/ui-router/blob/master/src/templateFactory.js
        this.fromUrl = function(url){
            if (url == null) return null;
            else return $http
                .get(url, {cache: $templateCache, headers: { Accept: 'text/html' }})
                .then(function(response){ return response.data});
        };

    }])
angular.module('engines.faq', [])

    .config(['oneSearchProvider', function(oneSearchProvider){
        oneSearchProvider.engine('faq', {
            id: 16,
            priority: 2,
            resultsPath: 'GoogleCS.items',
            totalsPath: 'GoogleCS.searchInformation.totalResults',
            filterQuery: 'site:ask.lib.ua.edu',
            templateUrl: 'common/engines/google-cs/google-cs.tpl.html'
        })
    }])
angular.module('engines.googleCS', [])

    .config(['oneSearchProvider', function(oneSearchProvider){
        oneSearchProvider.engine('googleCS', {
            id: 16,
            priority: 2,
            resultsPath: 'GoogleCS.items',
            totalsPath: 'GoogleCS.searchInformation.totalResults',
            filterQuery: '-site:guides.lib.ua.edu -site:ask.lib.ua.edu',
            templateUrl: 'common/engines/google-cs/google-cs.tpl.html'
        })
    }])
angular.module('engines.libguides', [])

    .config(['oneSearchProvider', function(oneSearchProvider){
        oneSearchProvider.engine('libguides', {
            id: 16,
            priority: 2,
            resultsPath: 'GoogleCS.items',
            totalsPath: 'GoogleCS.searchInformation.totalResults',
            filterQuery: 'site:guides.lib.ua.edu',
            templateUrl: 'common/engines/google-cs/google-cs.tpl.html'
        })
    }])
angular.module('engines.recommend', [])

    .config(['oneSearchProvider', function(oneSearchProvider){
        oneSearchProvider.engine('recommend', {
            id: 512,
            priority: 0,
            resultsPath: 'Recommendations',
            templateUrl: 'common/engines/recommend/recommend.tpl.html'
        })
    }])
angular.module('engines.scout', [])

    .config(['oneSearchProvider', function(oneSearchProvider){
        oneSearchProvider.engine('scout', {
            id: 1,
            priority: 4,
            resultsPath: 'Scout.SearchResult.Data.Records',
            totalsPath: 'Scout.SearchResult.Statistics.TotalHits',
            mediaTypes: {
                path: 'Header.PubTypeId',
                types: {
                    books: ['book', 'ebook'],
                    articles: 'academicJournal'
                }
            },
            templateUrl: 'common/engines/scout/scout.tpl.html',
            controller: 'ScoutCtrl'
        })
    }])

    .controller('ScoutCtrl', function($scope){
        var title; // Title variable to bind to $scope. ".BibRelationships.IsPartOfRelationships" title is used if no item title is present.
        var items = $scope.items;
        for (var i = 0; i < items.length; i++){
            if (items[i].Header.PubTypeId == 'audio'){
                items[i].mediaType = 'Audio';
            }
            if (items[i].Header.PubTypeId == 'videoRecording'){
                items[i].mediaType = 'Video Recording';
            }

            //Check if item has a title
            if (items[i].RecordInfo.BibRecord.BibEntity.Titles){
                title = items[i].RecordInfo.BibRecord.BibEntity.Titles[0].TitleFull;
            }

            //Search for "source"
            var bibRelationships = [];
            if (angular.isDefined(items[i].RecordInfo.BibRecord.BibRelationships.IsPartOfRelationships)){

                bibRelationships = items[i].RecordInfo.BibRecord.BibRelationships.IsPartOfRelationships;

                for (var x = 0, len = bibRelationships.length; x < len; x++){
                    if (angular.isUndefined(title)){
                        if (bibRelationships[x].BibEntity && bibRelationships[x].BibEntity.Titles){
                            title = bibRelationships[x].BibEntity.Titles[0].TitleFull;
                        }
                    }
                    if (angular.isDefined(bibRelationships[x].BibEntity.Identifiers) && bibRelationships[x].BibEntity.Identifiers[0].Type === 'issn-print'){
                        // define source title
                        if (bibRelationships[x].BibEntity.Titles){
                            items[i].source = bibRelationships[x].BibEntity.Titles[0].TitleFull;
                        }

                        // Append source volume, issue, etc.
                        if (angular.isDefined(bibRelationships[x].BibEntity.Numbering)){
                            for (var y = 0, l = bibRelationships[x].BibEntity.Numbering.length; y < l; y++){
                                items[i].source += ' ' + bibRelationships[x].BibEntity.Numbering[y].Type.substring(0,3) + '.' + bibRelationships[x].BibEntity.Numbering[y].Value;
                            }
                        }
                    }
                }
            }

            if (angular.isDefined(items[i].Items)){
                for (var x = 0; x < items[i].Items.length; x++){
                    if (items[i].Items[x].Group == 'Src'){
                        //console.log(items[i].Items[x].Group);
                        items[i].source = items[i].Items[x].Data;
                    }
                }
            }

            //Set item title
            items[i].title = title;
        }
        $scope.items = items;

        //Preprocess resource link to include facet. This is injected in the EDS header to limit results to media type (this is not native to EDS API)
        var box = angular.copy($scope.boxName);
        var link = angular.copy($scope.resourceLink);

        // Tokenize box name to camelCase for EDS inject script
        box = box.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function(match, index) {
            if (+match === 0) return ""; // or if (/\s+/.test(match)) for white spaces
            return index == 0 ? match.toLowerCase() : match.toUpperCase();
        });

        if (link.indexOf('facet=') > 0){
            link = link.replace(/&facet=(.+)&?/, box);
        }
        else {
            link += '&facet=' + box;
        }

        $scope.resourceLink = angular.copy(link);
    });
angular.module('filters.nameFilter', [])

    .filter('nameFilter', ['$filter', function($filter){
        return function(name){
            if (name.indexOf(',') > -1) {
                var nameParts = name.split(',');
                name = nameParts.map(function (obj) {
                    return obj.trim();
                }).reverse().join(' ');
            }
            return name;
        }
    }]);
function inArray(val, arr){
    return arr.indexOf(val) > -1;
}
/*
    Given an object with an array as it's value,
    this function will create a new object having the array
    keys as separate object keys and the old object keys as their value

    {
        field: ['value1', 'value2']
    }

    will result in

    {
        value1: 'field',
        value2: 'field'
    }
 */

var invertArrayToObject = function(obj){
    var inverted = {};

    Object.keys(obj).map(function(value, index){
        for (var i = 0, len = obj[value].length; i < len; i++){
            inverted[obj[value][i]] = value;
        }
    });
    return inverted;
}
// Adopted from http://stackoverflow.com/questions/4994201/is-object-empty
var hasOwnProperty = Object.prototype.hasOwnProperty;

function isEmpty(obj) {

    // null and undefined are "empty"
    if (obj == null) return true;

    // Assume if it has a length property with a non-zero value
    // that that property is correct.
    if (obj.length > 0)    return false;
    if (obj.length === 0)  return true;

    // Otherwise, does it have any properties of its own?
    // Note that this doesn't handle
    // toString and valueOf enumeration bugs in IE < 9
    for (var key in obj) {
        if (hasOwnProperty.call(obj, key)) return false;
    }

    return true;
}
// adopted from https://github.com/a8m/angular-filter/blob/master/src/_common.js
function toArray(object) {
    return Array.isArray(object) ? object :
        Object.keys(object).map(function(key) {
            return object[key];
        });
}
angular.module('common.mediaTypes', [])

    .provider('mediaTypes', [function mediaTypesProvider(){
        // Private Object for registered types
        var _types = {
            other: {
                engines: [],
                loaded: false
            }
        };

        // Register a media type and associate it with a given engine
        // These are only the anticipated media types - registered engines have no results
        // associated with a type, the type will be removed for that search.
        this.type = function(type, engine){
            if (!_types[type]){
                _types[type] = {
                    engines: [],
                    loaded: false
                };
            }
            if (!(_types['other'].engines.indexOf(engine) > -1)){
                //Automatically assume the registered engine will contain 'other' media types
                _types['other'].engines.push(engine);
            }
            _types[type].engines.push(engine);

        };

        // Helper function
        // will return a new object to map results from an engines results
        // This helps drive the 'mediaTypes' property for engine configuration
        function buildGroups(types){
            var groups = {};

            angular.forEach(types, function(value, type){
                var v = {};
                switch (typeof value){
                    case 'string':
                    case 'number':
                        value = [value];
                        break;
                    case 'object':
                        value = toArray(value);
                        break;
                }
                v[type] = value;

                //function at: /common/helpers/invert-array-to-object.js
                // This was the best name I could think of so far for this type of operation.
                // If you can think of a better name, let me know!
                // Honestly, I had almost no clue what to call it...
                v = invertArrayToObject(v);
                angular.extend(groups, v);
            });
            return groups;
        }

        this.$get = ['$parse', function($parse){
            return {
                types: _types,

                // Heavily influenced by angular-filter's group-by function:
                // https://github.com/a8m/angular-filter/blob/master/src/_filter/collection/group-by.js
                groupBy: function(collection, media){
                    var result = {};

                    if (angular.isObject(media)) {
                        var groups = buildGroups(media.types);
                        var getter = $parse(media.path);
                        var prop;
                        var g;

                        angular.forEach(collection, function(item){
                            prop = getter(item);
                            g = groups[prop];

                            //If not a registered media type, put into 'other' catch-all type
                            if (angular.isUndefined(g)){
                                if(!result['other']) {
                                    result['other'] = [];
                                }
                                result['other'].push(item);
                            }
                            else{
                                if (!result[g]){
                                    result[g] = [];
                                }
                                result[g].push(item);
                            }
                        });
                    }
                    else{
                        result[media] = collection;
                    }
                    return result;
                }
            }
        }];
    }])
/**
 * oneSearch Provider:
 *  This is the core of the oneSearch application.
 *  Search engines (i.e., resources) use the oneSearch Provider to register as searchable.
 *  This allows resources/engines to be easily plug-able and templated independent of each other.
 *
 *  The oneSearch Provider expects engines to register in the config phase.
 *  Engines are registered using the Provider's engine(engine_name, params) function:
 *      engine_name: String - defines the identifier for the engine
 *      params: Object - defines details for querying the engine (see example below)
 *
 *  Example:
 *
 *  // Define the engine as an Angular module
 *  angular.module('engines.MY_ENGINES_NAME')
 *
 *  //Register the engine's configuration with the oneSearch Provider
 *  .config(['oneSearchProvider', function(oneSearchProvider){
 *      oneSearchProvider.engine('MY_ENGINE_NAME', {
 *          id: String|Integer, //The id given to the backend JSON response handler that identifies the engine
 *          resultsPath: String, // A string representing the Object path to the search results (e.g., "engine.path.to.results")
            totalsPath: String, // Optional - A string representing the Object path to the total number of results found
            mediaTypes: { // Optional - Requires mediaTypesProvider module - An Object that specify media type qualifiers within the engines results
                path: String // The base path in the results object for the media type qualifier
                types: {    // Object that specifies what media types there are and how to identify them
                    TYPE_LABEL: String|Array // TYPE_LABEL will be the type id and the String or Array of Strings will represent the value given from the 'path' specified above.
                }
            },
            templateUrl: String //a string representing that url path to the engine's template
            controller: Function|String //an injectable controller for the engine - can be a Function or String referring to an existing Controller
        });
    });
 *
 */
angular.module('common.oneSearch', [])

    .factory('Search', ['$http', '$q', function($http, $q){

        function search(params){

            var canceller = $q.defer();
            var url = '//wwwdev2.lib.ua.edu/oneSearch/api/search/' + params['s'] + '/engine/' + params['engine'] + '/limit/' + params['limit'];

            var request = $http({
                method: 'GET',
                url: url,
                timeout: canceller.promise
            });

            var promise = request.then(function(data){
                this.done = true;
                return data.data;
            }, function(data){
                return $q.reject('Error');
            });

            promise.done = false;

            promise.abort = function(){
                this.done = true;
                canceller.resolve();
            };

            promise.finally(
                function(){
                    promise.abort = angular.noop;
                    canceller = request = promise = null;
                    this.done = false;
                }
            );

            return promise;
        }

        return {
            request: search
        };
    }])

    .provider('oneSearch', ['mediaTypesProvider', function oneSearchProvider(mediaTypesProvider){
        //private object that holds registered engines
        var _engines = {};

        //function to allow engines to register as searchable
        this.engine = function(name, engine){
            if (angular.isString(name)){
                var defaults = {
                    id: null, priority: 10, resultsPath: null, totalsPath: null, mediaTypes: null, templateUrl: null, filterQuery: null, controller: null
                };

                var e = angular.extend(defaults, engine);
                if (e.id){
                    if (e.mediaTypes){
                        Object.keys(e.mediaTypes.types).map(function(type){
                            mediaTypesProvider.type(type, name);
                        })
                    }
                    else{ //if no mediaTypes are defined, the engine is considered it's own media type
                        mediaTypesProvider.type(name, name);
                        e.mediaTypes = name;
                    }

                    e.name = name;
                    _engines[name] = e;
                }
            }
            else{
                console.log({Error: "oneSearch engine must have STRING defined name", engineParams: engine});
            }
        };

        this.$get = ['$q', '$parse', '$filter', '$rootScope', 'enginesTemplateFactory', 'SearchParams', 'Search', function($q, $parse, $filter, $rootScope, enginesTemplateFactory, SearchParams, Search){

            return {
                engines: _engines, // Expose engines at Service level
                searchAll: function(params){

                    //extend give params with default SearchParams
                    angular.extend(params, SearchParams);

                    // Sort engines by 'priority'
                    var prioritized = $filter('orderObjectBy')( _engines, 'priority');

                    // Cycle through each registered engine, send the GET request, then return $http's promise by default.
                    // Returning the promise, instead of the JSON data, allows for async loading of results.
                    angular.forEach(prioritized, function(engine, name){
                        //Create a local parameters variable 'p' and specify the engine id.
                        var p = {engine: engine.id};

                        //Extend local parameters by global params.
                        angular.extend(p, params);

                        //if filterQuery present, add it to query
                        // TODO: add proper REST support by accepting filter queries as objects and not just strings
                        if (engine.filterQuery !== null){
                            p.s += ' ' + engine.filterQuery;
                        }

                        /*console.log({
                         engine: engine,
                         params: p
                         });*/

                        // Store the $http response promise in the engine's object with key 'response'
                        engine.response = Search.request(p);

                        // Create results getter function from given results JSON path
                        if (angular.isDefined(engine.resultsPath)){
                            engine.getResults = $parse(engine.resultsPath);
                        }

                        // Create results getter function from given results JSON path
                        if (angular.isDefined(engine.totalsPath)){
                            engine.getTotal = $parse(engine.totalsPath);
                        }

                        // Create resource link getter for "more" results link
                        engine.getResourceLink = $parse("resourceLinks");

                        // Put engine's object in private _engines object
                        _engines[name] = engine;
                    });

                    // Return all engines with response promises, and getter functions
                    return _engines;
                },
                getEngineTemplate: function(engine){
                    return enginesTemplateFactory.get(engine);
                },
                getEngineController: function(engine){
                    return angular.isDefined(engine.controller) ? engine.controller : null;
                }

            }
        }]
    }])

    .controller('OneSearchCtrl', ['$scope', '$location', '$rootScope', '$window', 'oneSearch', function($scope, $location, $rootScope, $window, oneSearch){
        $scope.searchText;

        function abortPendingSearches(){
            for (var e in oneSearch.engines){
                if (oneSearch.engines[e].response && !oneSearch.engines[e].response.done){
                    oneSearch.engines[e].response.abort();
                }
            }
        }

        $scope.search = function(){
            if ($scope.searchText){
                $scope.searchText = $scope.searchText.replace(/\//g, ' ').trim();
                var searchText = encodeURIComponent($scope.searchText);

                //Cancel any pending searches - prevents mixed results by canceling the ajax requests
                abortPendingSearches();

                // Compensate for when not on home page
                // Since WP pages aren't loaded as angular routes, we must detect if there is no '#/PATH' present
                // after the URI (or that it's not a 'bento' route), then send the browser to a pre-build URL.
                if (!$location.path() || $location.path().indexOf('/bento') < 0){
                    var url = '#/bento/' + searchText;
                    switch ($location.host()){
                        case 'wwwdev2.lib.ua.edu':
                        case 'www.lib.ua.edu':
                            url = '//' + $location.host() + url;
                            break;
                        case 'localhost':
                            url = $location.absUrl() + url;
                            break;
                        default:
                            url = '//www.lib.ua.edu' + url;
                    }
                    $window.location = url; //Angular 1.2.8 $location is too limited...
                }
                else{
                    $location.path('/bento/'+$scope.searchText);
                }
            }
        };

        $scope.getRecommend = function(val){
            return $resource('//wwwdev2.lib.ua.edu/oneSearch/api/recommend/:search')
                .query({search: val})
                .$promise.then(function(rec) {
                    //console.log(rec);

                    return rec;
                });
        }


        $rootScope.$on('$routeChangeSuccess', function(event,currentRoute){
            if (currentRoute && $scope.searchText !== currentRoute.params.s){
                $scope.searchText = currentRoute.params.s;
            }
        });


    }])

    // Borrowed from https://github.com/fmquaglia/ngOrderObjectBy
    .filter('orderObjectBy', function() {
        return function (items, field, reverse) {
            var filtered = [];
            var newObj = {};
            angular.forEach(items, function(item) {
                filtered.push(item);
            });
            function index(obj, i) {
                return obj[i];
            }
            filtered.sort(function (a, b) {
                var comparator;
                var reducedA = field.split('.').reduce(index, a);
                var reducedB = field.split('.').reduce(index, b);
                if (reducedA === reducedB) {
                    comparator = 0;
                } else {
                    comparator = (reducedA > reducedB ? 1 : -1);
                }
                return comparator;
            });
            if (reverse) {
                filtered.reverse();
            }
            for (var i= 0, len = filtered.length; i < len; i++){
                var eng = filtered[i].name;
                newObj[eng] = filtered[i]
            }

            return newObj;
        };
    });