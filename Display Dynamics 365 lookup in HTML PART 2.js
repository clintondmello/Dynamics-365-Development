var projectId = null;

var SafetyInspectionCustomization = {

    selectProject: function () {

        var lookupOptions = {};
        var projectName, _projectId;

        lookupOptions.allowMultiSelect = false;
        lookupOptions.defaultEntityType = "cf_pmtracker";
        lookupOptions.entityTypes = ["cf_pmtracker"];

        Xrm.Utility.lookupObjects(lookupOptions).then(

            function (result) {
                if (result !== undefined && result.length > 0) {
                    //debugger;
                    var selectedItem = result[0];

                    if (selectedItem !== null && selectedItem.id !== null) {

                        _projectId = selectedItem.id.replace("{", "").replace("}", "");

                        //Setting it in Global Variable
                        projectId = _projectId;
                        
                        if (selectedItem.name !== undefined) {
                            projectName = selectedItem.name;
                            document.getElementById("selectedProject").value = "" + projectName;
                        }
                        else {
                            throw "Project Name is Blank. Please Naviagate to Project Entity and add the Project Name!";
                        }

                    }
                    
                }

            },
            function (error) {
                throw error.result;
            }

        );

    }
};
