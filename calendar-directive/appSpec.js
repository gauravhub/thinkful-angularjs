describe("Calendar Directive App", function() {
	var scope,
        element,
        compiled,
        html;

	beforeEach(function() {
		module('calendarDirectiveApp');
	});

	beforeEach(function() {
		module('dir-templates');
	});

	beforeEach(inject(function($rootScope, $compile) {
        html="<calendar><calendar-range year='2014' month='1'></calendar-range></calendar>";
        scope = $rootScope.$new();
        compiled = $compile(html)
        element = compiled(scope);
        scope.$digest();
    }));

	it("should have an calendar range selector", function() {
		expect(element.find("select[id='selectMonth']").length).toBe(1);
		expect(element.find("select[id='selectYear']").length).toBe(1);
	});

	it("should have an calendar days content", function() {
		expect(angular.element(document.querySelector('.calendarDay'))).not.toBeNull();
	});

	it("should have selected month as initial month value", function() {
		expect(element.find("select[id='selectMonth']")[0].value).toBe("0");
	});

	it("should have selected year as initial year value", function() {
		expect(element.find("select[id='selectYear']")[0].value).toBe("2014");
	});

	it("should be able to reset calendar when year is updated", function() {
		ctrl = element.data('$calendarController');
		spyOn(ctrl, 'setCalendar');
		$(element.find("select[id='selectYear']")[0]).val('1999').trigger('change');;
		expect(ctrl.setCalendar).toHaveBeenCalledWith(1999, 0);
	});

	it("should be able to reset calendar when month is updated", function() {
		ctrl = element.data('$calendarController');
		spyOn(ctrl, 'setCalendar');
		$(element.find("select[id='selectMonth']")[0]).val('2').trigger('change');;
		expect(ctrl.setCalendar).toHaveBeenCalledWith(2014, 2);
	});
});