function home() {
	window.location.href = '/';
}

function company() {
	window.location.href = '/company';
}

function subscriber() {
	window.location.href = '/subscriber';
}

function seeAds() {
	window.location.href = '/ads';
}

function change() {
	window.location.href = '/changeSubscriberData';
}

function cancelChange() {
	window.location.href = '/subscriberData';
}




// function postStory() {
	
// 	$.ajax({
// 		url: "/add_new_story",
// 		type: "post",
// 		data: $("input, select, textarea").serialize(),
//     success: function(data, status, xhr){
//     	console.log('data = ' + data);
//     	console.log('status = ' + status);
//     	console.log('xhr.responseText = ' + xhr.responseText);
//       window.location.reload();
//       // swal("OK!", "Du har nu lagt till en ny historia", "success");
//       return false;
//     },
//     error:function(xhr, status, error){
        
//       console.log(xhr.responseText);
//       var err = '';
//       $.each(JSON.parse(xhr.responseText) , function(i, item) {
         
//         err +='<li>'+item.msg+'</li>';
//       });
      
//       $(".error-list").html(err);
//       return false;
//     }
// 	});
// }

function putSubscriberData() {
	var data = $("input").serialize();
	console.log('data: '+ data);
	$.ajax({
		url: "/changeSubscriberData",
		type: "put",
		data: $("input").serialize(),

    success: function(res){
      window.location.href = '/subscriberData';
      return false;
    },
    error:function(xhr, status, error){
        
      console.log(xhr.responseText);
      var err = '';
      $.each(JSON.parse(xhr.responseText) , function(i, item) {
         
        err +='<li>'+item.msg+'</li>';
      });
      
      $(".error-list").html(err);
      return false;
    }
	});
}