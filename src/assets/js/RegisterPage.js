function createUser(){
    $("#formRegister").submit(function(event){
        	event.preventDefault(); //prevent default action
        	var request_method = $(this).attr("method"); //get form GET/POST method
        	var registerRequest={
        	    firstName:$('#inputFirstName').val(),
                lastName:$('#inputLastName').val(),
                email:$('#inputEmail').val(),
                password:$('#inputPassword').val(),
                rePassword:$('#inputRePassword').val(),
                agencyName:$('#inputAgencyName').val(),
                agencyDetail:$('#inputAgencyDetail').val(),
                contactNumber:$('#inputContactNumber').val()
        	}
        	if(registerRequest.password!=registerRequest.rePassword){
        	    alert("Password berbeda!");
        	}else{
                $.ajax({
                    url :  "/api/checkEmailUser",
                    type: request_method,
                    dataType: 'json',
                    contentType: 'application/json',
                    data: JSON.stringify(registerRequest),
                    success: function(data) {
                        if(data.id==""||data.id==null){
                         $.ajax({
                                url :  "/api/createNewAccount",
                                type: request_method,
                                dataType: 'json',
                                contentType: 'application/json',
                                data: JSON.stringify(registerRequest),
                                success: function(data) {
                                    window.location.href = 'http://localhost:8080/login';
                                    alert("Register Done!");
                                },
                                error: function(data) {
                                },
                            });
                        }
                        else{
                            alert("Email telah terdaftar");
                        }
                    },
                    error: function(data) {
                    },
                });
        	}
        });
}

$(document).ready( function () {
    createUser()
})