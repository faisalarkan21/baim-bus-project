function updateProfile(){
    $("#updateProfile").submit(function(event){
        	event.preventDefault(); //prevent default action
        	var request_method = $(this).attr("method"); //get form GET/POST method
        	var updateRequest={
        	    firstName:$('#firstName').val(),
                lastName:$('#lastName').val(),
        	    mobileNumber:$('#mobileNumber').val(),
        	    email:$('#email').val(),
        	    password:$('#password').val()
        	}
                $.ajax({
                    url : "/api/updateProfile",
                    type: request_method,
                    dataType: 'json',
                    contentType: 'application/json',
                    data: JSON.stringify(updateRequest),
                    success: function(data) {
                        alert("Update Profile Done!");
                        $('#firstName').val(data.firstName);
                        $('#lastName').val(data.lastName);
                        $('#phoneNO').val(data.mobileNumber)
                    },
                    error: function(data) {
                        alert("Update Profile Gagal")
                    },
                });

        });
}

$(document).ready( function () {
    updateProfile()
})