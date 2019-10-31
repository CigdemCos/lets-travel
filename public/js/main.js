let callMeForm = document.querySelector('.call-me-form');


//This event happens when the object document is completely loaded.
/*getPosts func. is an async. func. and that means that the variable called
posts is not going to wait for the answer from the getPosts func.
That's why we need to use async-await!!*/
document.addEventListener('DOMContentLoaded', async function(){
    let posts = await getPosts(); 
    //posts: we have an array of all post stored in the DB.
    let articles = document.querySelector('.articles');
    /*we have to be sure that every time we work with the articles,
    this div is empty without any articles*/
    articles.innerHTML='';

    posts.forEach((post) =>{
        let postHTML = `
        <div class="col-12 col-md-6 col-lg-4 col-xl-4 list-item">
			<div class="cards list-content">
				<img class="card-img-top" src="${post.imageUrl}" alt="${post.title}">
				<div class="card-body">
					<h4 class="card-title">${post.title}</h4>
					<p class="card-text">${post.description}</p>
					<div class="button-box">
					<a href="/sight?id=${post.id}" class="btn btn-primary">Details</a>
					</div>
				</div>
			</div>
		</div>`;
    //Let's add some articles
    articles.insertAdjacentHTML('beforeend', postHTML);
    })
})

callMeForm.addEventListener('submit', function(e){
    e.preventDefault();
    let phoneInput = callMeForm.querySelector('input');

    fetch('http://localhost:3000/callback-requests',{
        method:'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            phoneNumber: phoneInput.value
        })
    }).then((res) => res.text())
    .then(() => alert('We will call you back as soon as possible!'));
})

//Arrow button
/*Scroll to top when arrow up clicked BEGIN*/
$(window).scroll(function() {
    var height = $(window).scrollTop();
    if (height > 50) {
        $('#back2Top').fadeIn();
    } else {
        $('#back2Top').fadeOut();
    }
});
$(document).ready(function() {
    $("#back2Top").click(function(event) {
        event.preventDefault();
        $("html, body").animate({ scrollTop: 0 }, "slow");
        return false;
    });

});
 /*Scroll to top when arrow up clicked END*/