describe("DataSetService", function () {
    var dataSetService;
    var httpMock;
    var $rootScope;
    var timeout;
    var p;
    var dataEntrySectionService;

    beforeEach(function () {
        angular.module('d2HeaderBar', []);
        module("Reports");
    });

    beforeEach(inject(function (DataSetService, DataEntrySectionService, $httpBackend, $q, _$rootScope_, $timeout) {
        dataSetService = DataSetService;
        p = $q;
        $rootScope = _$rootScope_;
        httpMock = $httpBackend;
        timeout = $timeout;
        dataEntrySectionService = DataEntrySectionService;
    }));

    describe("getDataSet", function () {
        it("Should get basic data set object", function (done) {
            var dataSet = {
                id: "1234"
            };
            var serverDataSet = {
                id: "1234",
                name: "Karma",
                categoryCombo: {
                    name: "default"
                },
                isResolved: Promise.resolve({}),
                sections: []
            };

            var expectedDataSet = {
                name: "Karma",
                id: "1234",
                type: "dataset",
                sections: []
            };

            httpMock.expectGET("http://localhost:8000/api/dataSets/" + dataSet.id + ".json").respond(200, serverDataSet);
            var mockedSection = {
                name: "test section",
                id: "123",
                dataElements: [],
                code: 1,
                isResolved: Promise.resolve({})
            };

            spyOn(dataEntrySectionService, 'getSection').and.callFake(function () {
                var defer = p.defer();
                defer.resolve(mockedSection);
                return defer.promise;
            });

            var actualDataSet;
            dataSetService.getDataSet(dataSet.id).then(function (response) {
                response.isResolved.then(function () {
                    actualDataSet = response;
                    expectedDataSet.isResolved = actualDataSet.isResolved;
                    expect(expectedDataSet).toEqual(actualDataSet);
                    done();
                })
            });
            httpMock.flush();
            setInterval($rootScope.$digest, 900)
        });

        it("should get the failure promise when server not responded", function () {
            var dataSetId = {};
            var actualPromise = {isError: true, status: 404, statusText: ''};
            var expectedPromise;
            httpMock.expectGET("http://localhost:8000/api/dataSets/" + dataSetId + ".json").respond(404);
            dataSetService.getDataSet(dataSetId).then(function (response) {
                expectedPromise = response;
            });
            httpMock.flush();
            expect(expectedPromise).toEqual(actualPromise);
        })
    });
});