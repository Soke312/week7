$('#input-box').submit(function () {
    $.post({
        url: '/',
        data: {"item": $('#my-input').val()},
        dataType: 'json',
    })
})
$(document).on('click', 'button.delete', function(event){
    var id = $(this).attr("id")
    $.ajax({
        url: "/?id=" + id,
        type: 'DELETE'
    })
})
function getAllItems () {
    $.getJSON({
        url: '/list',
        success: function(data){
            var list = [];
            $.each(data.docs, function(i, item){
                list.push("<li>" + " " + item.item + "<button type ='button' class='btn btn-danger btn-sm delete' id='"+item._id+" '> Delete </button>"+"</li>");
            })
            $("<ul>", {
                html: list.join("")
            }).appendTo("#list");
        }
    })
}
getAllItems();