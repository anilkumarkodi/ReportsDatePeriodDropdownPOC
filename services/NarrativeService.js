Reports.service('NarrativeService', ['$http', function($http){
    var dataSet;
    var successPromise = function(response){
        var Narratives = response.data.dataValues ? response.data.dataValues : [];
        var allDataElementIds = _.map(_.flatten(_.map(dataSet.sections, "dataElements")), "id");
        var existingDataElementIds = _.map(Narratives, "dataElement");
        _.map(allDataElementIds, function(dataElementId){
            if(!_.includes(existingDataElementIds, dataElementId))
                Narratives.push({dataElement: dataElementId, period: response.data.period, orgUnit: response.data.orgUnit, value: ""})
        })
        return Narratives;
    }
    var failurePromise = function(){
        alert('Could not connect to DHIS');
    }
    this.getNarratives = function(dataset, period, orgUnitId){
    dataSet = dataset;
        return $http.get(ApiUrl + "/dataValueSets?dataSet=" + dataset.id + "&period=" + period + "&orgUnit=" + orgUnitId)
            .then(successPromise, failurePromise);
    }

    this.saveNarratives = function(Narratives){
        var validate = function(response){
        if(response.data.importCount.ignored > 0 || response.data.importCount.deleted > 0)
            alert(response.data.conflicts[0].value);
        }
        return $http.post(ApiUrl + "/dataValueSets", {dataValues: Narratives}, {headers: {"Content-Type": "application/json"}})
            .then(validate, failurePromise)
    }
}]);