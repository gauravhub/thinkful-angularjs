$(function(){
	if (!String.prototype.format) {
	  String.prototype.format = function() {
	    var args = arguments;
	    return this.replace(/{(\d+)}/g, function(match, number) { 
	      return typeof args[number] != 'undefined'
	        ? args[number]
	        : match
	      ;
	    });
	  };
	}

	function clearControls(controls) {
		for(control in controls) {
			$(controls[control]).text('');		
		}
	}

	$('#numX').click(function() {
		$(this).select();
	});

	$('#numY').click(function() {
		$(this).select();
	});

	$('#numX').keydown(function() {
		clearControls(['#numXErrorMessage', '#result']);
	});

	$('#numY').keydown(function() {
		clearControls(['#numYErrorMessage', '#result']);
	});

	$('#opAdd').click(function() {
		if(validateInputs()){
			var numX = parseFloat($('#numX').val());
			var numY = parseFloat($('#numY').val());
			var result = '{0} plus {1} is {2}'.format(numX, numY, numX + numY);

			$('#result').text(result);
		}
	});

	$('#opSubtract').click(function() {
		if(validateInputs()){
			var numX = parseFloat($('#numX').val());
			var numY = parseFloat($('#numY').val());
			var result = '{0} minus {1} is {2}'.format(numX, numY, numX - numY);

			$('#result').text(result);
		}
	});

	function validateInputs () {
		var numX = $('#numX').val();
		var numY = $('#numY').val();
		var validInputs = true;

		if(numX == '') {
			$('#numXErrorMessage').text('Please enter a number');
			validInputs = false;
		}

		if(isNaN(new Number(numX))) {
			$('#numXErrorMessage').text('Please enter a valid number');
			validInputs = false;
		}

		if(numY == '') {
			$('#numYErrorMessage').text('Please enter a number');
			validInputs = false;
		}

		if(isNaN(new Number(numY))) {
			$('#numYErrorMessage').text('Please enter a valid number');
			validInputs = false;
		}

		return validInputs;
	}
});