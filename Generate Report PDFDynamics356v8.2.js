quoteInvoice = {

  //This function is called when the custom button is cliked from the Dynamics 365 Ribbon
	runReportToPrint: function () {
		debugger;
    
		var params = quoteInvoice.getReportingSession();
		var newPth = Xrm.Page.context.getClientUrl() + "/Reserved.ReportViewerWebControl.axd?ReportSession=" + params[0] + "&Culture=1033&CultureOverrides=True&UICulture=1033&UICultureOverrides=True&ReportStack=1&ControlID=" + params[1] + "&OpType=Export&FileName=public&ContentDisposition=OnlyHtmlInline&Format=PDF";

		//Calling the below function converts the report to PDF format. This has not been included in this code
		quoteInvoice.convertResponseToPDF(newPth);
	},

	getReportingSession: function () {

		var selectedIds = Xrm.Page.data.entity.getId();

		selectedIds = selectedIds.replace('{', '').replace('}', '');
    
    //The fetchXML shown below is for the Quote entity as out report is run on the Quote entity
    //Depending on your report/entity the fetchXML will change
		var strParameterXML = "<fetch distinct='false' mapping='logical' output-format='xml-platform' version='1.0'><entity name= 'quote'><all-attributes/><filter type='and'><condition attribute='quoteid' value='" + selectedIds + "' operator='eq' /></filter></entity ></fetch >";
		
    //Below shown is the GUID of the report that will run
    var reportGuid = "DAF05843-CA33-E711-811E-FC15B42827EC";

    //Below shown is the Name of the Report
		var reportName = "Quote Invoice.rdl";
    
		var pth = Xrm.Page.context.getClientUrl() + "/CRMReports/rsviewer/QuirksReportViewer.aspx";

		var retrieveEntityReq = new XMLHttpRequest();
		retrieveEntityReq.open("POST", pth, false);
		retrieveEntityReq.setRequestHeader("Accept", "*/*");
		retrieveEntityReq.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		retrieveEntityReq.send("id=%7B" + reportGuid + "%7D&uniquename=" + Xrm.Page.context.getOrgUniqueName() + "&iscustomreport=true&reportnameonsrs=&reportName=" + reportName + "&isScheduledReport=false&p:quoteid=" + strParameterXML);
		var x = retrieveEntityReq.responseText.lastIndexOf("ReportSession=");
		var y = retrieveEntityReq.responseText.lastIndexOf("ControlID=");
		var ret = new Array();
		ret[0] = retrieveEntityReq.responseText.substr(x + 14, 24);
		ret[1] = retrieveEntityReq.responseText.substr(x + 10, 32);
		return ret;
	}

}
