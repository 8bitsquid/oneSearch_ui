angular.module('engines.scout', [])

    .config(['oneSearchProvider', function(oneSearchProvider){
        oneSearchProvider.engine('scout', {
            id: 1,
            resultsPath: 'Scout.SearchResult.Data.Records',
            totalsPath: 'Scout.SearchResult.Statistics.TotalHits',
            mediaTypes: {
                path: 'Header.PubTypeId',
                types: {
                    books: ['book', 'ebook'],
                    journals: 'serialPeriodical',
                    articles: 'academicJournal',
                    media: ['audio', 'videoRecording']
                }
            }
        })
    }])

    .directive('scout', [function(){
        return {
            restrict: 'AC',
            templateUrl: 'common/engines/scout/scout.tpl.html'
        }
    }])