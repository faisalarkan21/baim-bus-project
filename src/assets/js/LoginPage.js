function loginAction(){
    $("#formLogin").submit(function(event){
        	event.preventDefault(); //prevent default action
        	var request_method = $(this).attr("method"); //get form GET/POST method
        	var user={
        	    id:"",
                email:$('#inputEmail').val(),
                password:$('#inputPassword').val(),
                firstName:"",
                lastName:"",
                mobileNumber:"",
                roleId:""
        	}
            $.ajax({
                url :  "/api/performLogin",
                type: request_method,
                dataType: 'json',
                contentType: 'application/json',
                data: JSON.stringify(user),
                success: function(data) {
                    var u = JSON.stringify(data);
                    if(u.id==""){
                        alert("wrong email or password");
                    }
                },
                error: function(data) {
                },
            });
        });
}

$(document).ready( function () {
    loginAction()
})