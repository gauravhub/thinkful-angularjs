describe("Editable Item Directive App", function() {
	var scope,
        element,
        compiled,
        html;

	beforeEach(function() {
		module('editableItemDirectiveApp');
	});

	beforeEach(function() {
		module('dir-templates');
	});

	beforeEach(inject(function($rootScope, $compile) {
        html="<div make-editable>Hello Directives!</div>";
        scope = $rootScope.$new();
        compiled = $compile(html)
        element = compiled(scope);
        scope.$digest();
    }));

	it("should have an edit button", function() {
		expect(element.find('button').length).toBe(1);
		expect(element.find('button').text()).toBe('Edit');
	});

	it("should contain 'Hello Directives!' text", function() {
		expect(element.html()).toContain('Hello Directives!');
	});

	it("should toggle to edit mode on click of Edit button", function() {
		element.find('button').trigger('click'); // Click on Edit
		expect(element.find('button').text()).toBe('Save');
		expect(element.hasClass('edit')).toBeTruthy();
		expect(element.attr('contenteditable')).toBeTruthy();
	});

	it("should toggle to view mode on click of Save button", function() {
		element.find('button').trigger('click'); // Click on Edit
		element.find('button').trigger('click'); // Click on Save
		expect(element.find('button').text()).toBe('Edit');
		expect(element.attr('contenteditable')).toBeFalsy();
		expect(element.hasClass('view')).toBeTruthy();
	});
});