$(document).ready(function(){
    chrome.tabs.getSelected(null,function(tab) {
        var tablink = tab.url;
        if(tablink.indexOf('youtube.com') < 0){
            $("#adjustYoutube").hide();
            $("#goToYoutube").show();
            $("#goToYoutube > h6").html("Ir para YouTube");            
        }
        else if(tablink.indexOf('youtube.com') > 0 && tablink.indexOf('watch?v=') < 0){
            $("#adjustYoutube").hide();
            $("#goToYoutube").show();
            $("#goToYoutube > h6").html("Aguardando Seleção do Vídeo");
        }
        else{
            $("#adjustYoutube").show();
            $("#goToYoutube").hide();
            chrome.tabs.executeScript({
                code: `document.getElementsByClassName("video-stream html5-main-video")[0].playbackRate`
            }, function(res){
                let value = res.indexOf('.') > 0 ? res : `${res}.0`
                $("#playbackRate").html(`${value}x`)
                $("#range").val(value)
            })
        }
    })

    $(document).on('input change', '#range', function() {
        let value = $(this).val().indexOf('.') > 0 ? $(this).val() : `${$(this).val()}.0`
        $("#playbackRate").html(`${value}x`)
        chrome.tabs.executeScript({
            code: `document.getElementsByClassName("video-stream html5-main-video")[0].playbackRate = ${value}`
        })
    })

    $("#linkYoutube").click(function(){
        chrome.tabs.create({url: 'https://www.youtube.com/'})
    })
})