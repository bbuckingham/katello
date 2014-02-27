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
 * @name  Bastion.content-views.controller:PackageFilterController
 *
 * @requires $scope
 * @requires gettext
 * @requires Rule
 *
 * @description
 */
angular.module('Bastion.content-views').controller('PackageFilterController',
    ['$scope', 'gettext', 'Rule', function ($scope, gettext, Rule) {

        $scope.rule = {
            type: 'all',
            editMode: false,
            working: false
        };

        $scope.filter.$promise.then(function (filter) {
            addType(filter.rules);
        });

        $scope.addRule = function (rule, filter) {
            Rule.save({filterId: filter.id}, rule, addSuccess, failure);
        };

        $scope.updateRule = function (rule, filter) {
            var params = {filterId: filter.id, ruleId: rule.id},
                success, failure;

            // Need access to the original rule
            success = function () {
                rule.editMode = false;
                rule.working = false;
                $scope.successMessages = [gettext('Package successfully updated.')];
            };

            failure = function () {
                rule.working = false;
            };

            Rule.update(params, rule, success, failure);
        };

        $scope.invalid = function (rule) {
            var valid = rule.name;

            if (rule.type === 'equal') {
                valid = valid && rule.version;
            } else if (rule.type === 'less') {
                valid = valid && rule['max_version'];
            } else if (rule.type === 'greater') {
                valid = valid && rule['min_version'];
            } else if (rule.type === 'range') {
                valid = valid && rule['min_version'] && rule['max_version'];
            }

            return !valid;
        };

        $scope.clearValues = function (rule) {
            rule.version = undefined;
            rule['min_version'] = undefined;
            rule['max_version'] = undefined;
        };

        $scope.removeRules = function (filter) {
            angular.forEach(filter.rules, function (rule) {
                if (rule.selected) {
                    Rule.delete({filterId: filter.id, actionId: rule.id});
                }
            });

            filter.$get();
        };

        function addSuccess(rule) {
            $scope.rule = {
                type: 'all'
            };
            $scope.rule.editMode = false;
            $scope.rule.working = false;
            addType([rule]);
            $scope.filter.rules.push(rule);

            $scope.successMessages = [gettext('Package successfully added.')];
        }

        function failure(response) {
            $scope.errorMessages = [response.data.displayMessage];
        }

        function addType(rules) {
            angular.forEach(rules, function (rule) {
                rule.type = type(rule);
            });
        }

        function type(rule) {
            var typeId;

            if (rule.version) {
                typeId = 'equal';
            } else if (rule['min_version'] && !rule['max_version']) {
                typeId = 'greater';
            } else if (!rule.min && rule['max_version']) {
                typeId = 'less';
            } else if (rule.min && rule['max_version']) {
                typeId = 'range';
            } else {
                typeId = 'all';
            }

            return typeId;
        }

    }]
);
