function validAge() {
	var name = $("#txt2").val();
	var abc = /^[\d\,\.]*$/;
	debugger
	if (!abc.test(name) || name == "")
		alert("Please enter valid number.");
	else
		alert(name);
	return;
}

function emailValidation() {
	var name = $("#txt2").val();
	//var regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
	var regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.{1}[a-zA-Z]{2,4}$/;
	if (!regex.test(name) || name == "")
		alert("Please enter valid email.");
	else
		alert(name);
	return;
}

//to pageloading image
var xhr = new XMLHttpRequest();
var progressbar = $("#progressbar");
xhr.upload.onprogress = function (e) {
	if (e.lengthComputable) {
		progressbar.value = e.loaded / e.total) * 100;
		progressbar.textContent = progressbar.value;
	}
};
