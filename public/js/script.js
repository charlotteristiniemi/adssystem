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

function goToMakeAd() {
	window.location.href = '/getAdId';
}

function putSubscriberData() {
	var data = $("input").serialize();
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


function postAd() {
	
	$.ajax({
		url: "/makeAd",
		type: "post",
		data: $("input, textarea").serialize(),
    success: function(data, status, xhr){
      window.location.reload();
      // window.location.href = '/ads';
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


function adCompany() {
	
	$.ajax({
		url: "/company",
		type: "post",
		data: $("input").serialize(),
    success: function(data, status, xhr){
      window.location.href = '/';
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