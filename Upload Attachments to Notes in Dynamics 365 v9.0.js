var crmCustomization = {

PickFile: function () {

Xrm.Device.pickFile().then(

function (result) {
var dataRecieved = result;
var Content = dataRecieved[0].fileContent;
var FileSize = dataRecieved[0].fileSize;
var FileName = dataRecieved[0].fileName;
var MimeType = dataRecieved[0].mimeType;
var recordId = Xrm.Page.data.entity._entityId.guid;

crmCustomization.UploadToNotes(FileName, MimeType, Content, recordId);
},
function (error) {
alert(error.message);
});
},
UploadToNotes: function (FileName, MimeType, Content, recordId) {
var note = Object();
note["notetext"] = "New Attachment"
note["subject"] = "Uploaded File";
note["filename"] = FileName;
note["mimetype"] = MimeType;
note["objectid_contact@odata.bind"] = "/contacts(" + recordId + ")";
note["documentbody"] = Content;

$.ajax({
type: "POST",
contentType: "application/json; charset=utf-8",
datatype: "json",
url: Xrm.Page.context.getClientUrl() + "/api/data/v9.0/annotations",
async: true,
data: JSON.stringify(note),
beforeSend: function (XMLHttpRequest) {
XMLHttpRequest.setRequestHeader("Accept", "application/json");
XMLHttpRequest.setRequestHeader("OData-MaxVersion", "4.0");
XMLHttpRequest.setRequestHeader("OData-Version", "4.0");
},
success: function (data, textStatus, XmlHttpRequest) {
var result = data;
alert("File attached to Notes successfully");
},
error: function (XmlHttpRequest, textStatus, errorThrown) {
Xrm.Utility.alertDialog("Error: " + textStatus + " " + errorThrown);
}
});

},

};
