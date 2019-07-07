CallUnboundAction: function(){
	var request = {};
	request.getMetadata = function() {
		
		return {
		boundParameter: null,
		parameterTypes:{
			"IntegerParam":{
				"typeName": "Edm.Int32",
				"structuralProperty":1
				}
		},
		operationType: 0,
		operationName: "new_ActionTest",
		};
	}

	Xrm.WebApi.online.execute(request).then(
		function(result){
			if(result.ok){
			//Additional Operations
			alert("Execute Success");
			}
		},
		function(error){
			//Additional Operations
			alert("Execute Error");
		}
	);
}
