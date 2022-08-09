$(document).ready(function () {
    let responses = document.getElementsByClassName('btnShowResponses');
    for(let response of responses){
        $(response).click(function () {
            $('#responses-'+response.id.split('-')[1]).toggleClass("responses-after-click");
            let text = $(`#showResponses-${response.id.split('-')[1]}`).text();
            if(text == "Show Responses")
                $(`#showResponses-${response.id.split('-')[1]}`).html("Hide Responses");
            else
                $(`#showResponses-${response.id.split('-')[1]}`).html("Show Responses");
        });
    }
});