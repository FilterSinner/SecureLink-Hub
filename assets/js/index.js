


$("#add_user").submit(function(event){
    alert("Data Inserted Successfully!");
})

$("#update_user").submit(function(event){
    event.preventDefault();

    var unindexed_array = $(this).serializeArray();
    var data = {}

    $.map(unindexed_array, function(n, i){
        data[n['name']] = n['value']
    })


    var request = {
        "url" : `http://localhost:3000/api/users/${data.id}`,
        "method" : "PUT",
        "data" : data
    }

    $.ajax(request).done(function(response){
        alert("Data Updated Successfully!");
    })

})

if(window.location.pathname == "/"){
    $ondelete = $(".table tbody td a.delete");
    $ondelete.click(function(){
        var ids = $(this).attr("data-id")

        var request = {
            "url" : `http://localhost:3000/api/users/${ids}`,
            "method" : "DELETE"
        }

        if(confirm("Do you really want to delete this record?")){
            $.ajax(request).done(function(response){
                alert("Data Deleted Successfully!");
                location.reload();
            })
        }

    })
}


$("#send-emails").submit(function (event) {
    event.preventDefault();

    var selectedTemplate = $("#template").val();
    var selectedDepartment = $("#department").val();

    // Check if the selected department is "All"
    if (selectedDepartment === "all") {
        selectedDepartment = null; // Set it to null to indicate selecting all users
    }

    $.ajax({
        url: "/send-emails",
        method: "POST",
        data: { template: selectedTemplate, department: selectedDepartment },
        success: function (response) {
            if (response.success) {
                alert("Emails sent successfully");
            } else {
                alert("Error sending emails: " + response.error);
            }
        },
        error: function () {
            alert("Error sending emails: Internal Server Error");
        }
    });
});
