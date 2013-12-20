/**
 * Copyright 2013 Red Hat, Inc.
 *
 * This software is licensed to you under the GNU General Public
 * License as published by the Free Software Foundation; either version
 * 2 of the License (GPLv2) or (at your option) any later version.
 * There is NO WARRANTY for this software, express or implied,
 * including the implied warranties of MERCHANTABILITY,
 * NON-INFRINGEMENT, or FITNESS FOR A PARTICULAR PURPOSE. You should
 * have received a copy of GPLv2 along with this software; if not, see
 * http://www.gnu.org/licenses/old-licenses/gpl-2.0.txt.
 **/

describe('Controller: PathController', function () {
    var $scope,
        gettext,
        FormUtils,
        Environment,
        row;

    beforeEach(module('Bastion.environments', 'Bastion.test-mocks'));

    beforeEach(function () {
        Environment = {};
        gettext = function() {};
        row = {
            showCreate: false,
            showEdit: false
        };
    });

    beforeEach(inject(function ($injector) {
        var $controller = $injector.get('$controller'),
            $q = $injector.get('$q'),
            $http = $injector.get('$http'),
            $timeout = $injector.get('$timeout'),
            FormUtils = $injector.get('FormUtils');

        $scope = $injector.get('$rootScope').$new();

        $controller('PathController', {
            $scope: $scope,
            $q: $q,
            gettext: gettext,
            $timeout: $timeout,
            $http: $http,
            Environment: Environment,
            FormUtils: FormUtils
        });
    }));

    it('should support selecting a non-library environment', function () {
//        var environment = {id: 1, library: false};
//        $scope.selectEnvironment(environment);
//        expect($scope.close).toHaveBeenCalled();
    });
});
