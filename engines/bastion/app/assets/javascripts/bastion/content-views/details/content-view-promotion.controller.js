/**
 * Copyright 2014 Red Hat, Inc.
 *
 * This software is licensed to you under the GNU General Public
 * License as published by the Free Software Foundation; either version
 * 2 of the License (GPLv2) or (at your option) any later version.
 * There is NO WARRANTY for this software, express or implied,
 * including the implied warranties of MERCHANTABILITY,
 * NON-INFRINGEMENT, or FITNESS FOR A PARTICULAR PURPOSE. You should
 * have received a copy of GPLv2 along with this software; if not, see
 * http://www.gnu.org/licenses/old-licenses/gpl-2.0.txt.
*/

/**
 * @ngdoc object
 * @name  Bastion.content-views.controller:ContentViewPromotionController
 *
 * @requires $scope
 * @requires $q
 * @requires ContentView
 * @requires ContentViewVersion
 * @requires Organization
 * @requires CurrentOrganization
 *
 * @description
 *   Provides the functionality specific to ContentViews for use with the Nutupane UI pattern.
 *   Defines the columns to display and the transform function for how to generate each row
 *   within the table.
 */
angular.module('Bastion.content-views').controller('ContentViewPromotionController',
    ['$scope', '$q', 'ContentView', 'ContentViewVersion', 'Organization', 'CurrentOrganization',
    function ($scope, $q, ContentView, ContentViewVersion, Organization, CurrentOrganization) {

        $scope.promotion = {};

        $scope.availableEnvironments =  Organization.paths({id: CurrentOrganization});

        $scope.enabledCheck = function (env) {
            var envIds = _.pluck($scope.version.environments, 'id');
            if (envIds.length === 0 && env.library) {
                //If just an archive, just allow library
                return true;
            } else if (_.indexOf(envIds, env.id) !== -1) {
                //if version is already promoted to the environment
                return false;
            } else if (_.indexOf(envIds, env['prior_id']) !== -1) {
                //if environment is a successor an existing environment
                return true;
            } else {
                return false;
            }
        };

        $scope.version = ContentViewVersion.query({id: $scope.$stateParams.versionId});

        $scope.promote = function () {
            ContentViewVersion.promote({id: $scope.version.id,
                'environment_id': $scope.selectedEnvironment.id}, function () {
                $scope.transitionTo('content-views.details.versions', {contentViewId: $scope.contentView.id});
            });

        };
    }]
);
