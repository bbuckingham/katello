/**
 * @ngdoc object
 * @name  Bastion.docker-tags.controller:DockerTagsController
 *
 * @requires $scope
 * @requires $location
 * @requires Nutupane
 * @requires DockerTag
 * @requires CurrentOrganization
 *
 * @description
 *   Provides the functionality specific to docker tags for use with the Nutupane UI pattern.
 *   Defines the columns to display and the transform function for how to generate each row
 *   within the table.
 */
angular.module('Bastion.docker-tags').controller('DockerTagsController',
    ['$scope', '$location', 'Nutupane', 'DockerTag', 'CurrentOrganization',
    function ($scope, $location, Nutupane, DockerTag, CurrentOrganization) {

        var params = {
            'organization_id': CurrentOrganization,
            'sort_by': 'name',
            'sort_order': 'ASC',
            'grouped': true
        };

        var nutupane = new Nutupane(DockerTag, params);
        $scope.table = nutupane.table;

        $scope.table.closeItem = function () {
            $scope.transitionTo('docker-tags.index');
        };
    }]
);
