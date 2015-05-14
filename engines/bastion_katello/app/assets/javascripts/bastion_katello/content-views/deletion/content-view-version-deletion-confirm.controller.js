/**
 * @ngdoc object
 * @name  Bastion.content-views.controller:ContentViewVersionDeletionConfirm
 *
 * @requires $scope
 * @requires ContentView
 * @requires translate
 *
 * @description
 *   Provides the confirmation and submit code for the content view version deletion
 *   workflow
 */
angular.module('Bastion.content-views').controller('ContentViewVersionDeletionConfirmController',
    ['$scope', 'ContentView', 'translate',
    function ($scope, ContentView, translate) {

        function success() {
            var message = translate('Successfully initiated removal of %cv version %ver.');

            if ($scope.deleteOptions.deleteArchive) {
                message = translate('Successfully initiated deletion of %cv version %ver.');
            }

            message = message.replace('%cv', $scope.contentView.name).replace('%ver', $scope.version.version);
            $scope.successMessages.push(message);
            $scope.transitionTo('content-views.details.versions', {contentViewId: $scope.contentView.id});
        }

        function error(response) {
            $scope.deleting = false;
            $scope.$parent.$parent.errorMessages = response.data.errors;
        }

        $scope.validateEnvironmentSelection();

        $scope.performDeletion = function () {
            var params = {
                id: $scope.contentView.id,
                'environment_ids': $scope.selectedEnvironmentIds()
            };
            $scope.deleting = true;

            if ($scope.deleteOptions.deleteArchive) {
                params['content_view_version_ids'] = [$scope.version.id];
            }
            if ($scope.deleteOptions.activationKeys.contentView) {
                params['key_content_view_id'] = $scope.deleteOptions.activationKeys.contentView.id;
            }
            if ($scope.deleteOptions.activationKeys.environment) {
                params['key_environment_id'] = $scope.deleteOptions.activationKeys.environment.id;
            }
            if ($scope.deleteOptions.contentHosts.contentView) {
                params['system_content_view_id'] = $scope.deleteOptions.contentHosts.contentView.id;
            }
            if ($scope.deleteOptions.contentHosts.environment) {
                params['system_environment_id'] = $scope.deleteOptions.contentHosts.environment.id;
            }

            ContentView.removeAssociations(params, success, error);
        };
    }]
);
