function updateAgency(){
    $("#updateAgency").submit(function(event){
        	event.preventDefault(); //prevent default action
        	var request_method = $(this).attr("method"); //get form GET/POST method
        	var updateRequest={
        	    name:$('#agencyName').val(),
                details:$('#agencyDetails').val()
        	}
                $.ajax({
                    url :  "/api/updateAgency",
                    type: request_method,
                    dataType: 'json',
                    contentType: 'application/json',
                    data: JSON.stringify(updateRequest),
                    success: function(data) {
                        alert("Update Done!");
                        $('#agencyName').val(data.name);
                        $('#agencyDetails').val(data.details);
                        $('#agencyName').text(data.name)
                    },
                    error: function(data) {
                    },
                });

        });
}

$(document).ready( function () {
    updateAgency()
})