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
 **/

describe('Controller: NewFilterController', function() {
    var $scope,
        Filter,
        Rule;

    beforeEach(module('Bastion.content-views', 'Bastion.test-mocks'));

    beforeEach(inject(function($injector) {
        var $controller = $injector.get('$controller');

        Filter = $injector.get('MockResource').$new();
        Rule = $injector.get('MockResource').$new();
        $scope = $injector.get('$rootScope').$new();

        $scope.contentView = {id: 1};

        $controller('NewFilterController', {
            $scope: $scope,
            Filter: Filter,
            Rule: Rule
        });
    }));

    it('should attach a new filter resource on to the scope', function() {
        expect($scope.filter).toBeDefined();
    });

    it('should save a new package filter and transition to package filter detail page', function() {
        $scope.filter['content_view'] = $scope.contentView;
        $scope.filter.type = 'rpm';

        spyOn($scope, 'transitionTo');
        $scope.save($scope.filter, $scope.contentView);

        expect($scope.transitionTo).toHaveBeenCalledWith(
            'content-views.details.filters.details.rpm',
            {filterId: 1, contentViewId: 1}
        )
    });

    it('should save a new errata by id filter and transition to errata id filter detail page', function() {
        $scope.filter['content_view'] = $scope.contentView;
        $scope.filter.type = 'erratumId';

        spyOn($scope, 'transitionTo');
        $scope.save($scope.filter, $scope.contentView);

        expect($scope.transitionTo).toHaveBeenCalledWith(
            'content-views.details.filters.details.erratum.list',
            {filterId: 1, contentViewId: 1}
        )
    });

    it('should save a new errata by date and type filter and transition to errata by date type page', function() {
        $scope.filter['content_view'] = $scope.contentView;
        $scope.filter.type = 'erratumDateType';

        spyOn($scope, 'transitionTo');
        $scope.save($scope.filter, $scope.contentView);

        expect($scope.transitionTo).toHaveBeenCalledWith(
            'content-views.details.filters.details.erratum.dateType',
            {filterId: 1, contentViewId: 1}
        )
    });

});

