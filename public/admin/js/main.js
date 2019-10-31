let addPostBtn = document.querySelector('.create-post-btn');
let logOutBtn = document.querySelector('.log-out-btn');


//This event happens when the object document is completely loaded.
document.addEventListener('DOMContentLoaded',function(){
    //When the page is loading, these functions will be called.
    addPosts();
    addCallbackRequests();
    addEmails();
})

addPostBtn.addEventListener('click', function(){
    let articlesTab = document.getElementById('v-pills-articles');
    articlesTab.classList.remove('show');
    articlesTab.classList.remove('active');

    let createTab = document.getElementById('v-pills-create-post');
    createTab.classList.add('show');
    createTab.classList.add('active');

})

/*getPosts func. is an async. func. and that means that the variable called
posts is not going to wait for the answer from the getPosts func.
That's why we need to use async-await!!*/
async function addPosts(){
    let posts = await getPosts(); 
    //posts: we have an array of all post stored in the DB.
    let articles = document.querySelector('.articles');
    /*we have to be sure that every time we work with the articles,
    this div is empty without any articles*/
    articles.innerHTML='';

    let i =1; //order number

    posts.forEach((post) =>{
        let postHTML = `
    <article class="d-flex justify-content-between align-items-center article-inline">
        <div class="num w5">${i++}</div>
        <input class="id" type="hidden" value="${post.id}">
        <div class="name w30">${post.title}</div>
        <div class="date w30">${post.date}</div>
        <div class="country w20">${post.country}</div>
        <div class="edit w10"><button class="btn btn-link btn-edit">Edit</button></div>
        <div class="remove w5"><button class="btn btn-link btn-remove">X</button></div>
    </article>`;
    //Let's add some articles
    articles.insertAdjacentHTML('beforeend', postHTML);
    })
}

    //---
    async function addCallbackRequests(){
        let requests = await getCallbackRequests(); 
        //requests: we have an array of all requests stored in the DB.
         let requestsBlock = document.querySelector('#v-pills-callback');
         /*we have to be sure that every time we work with the requestsBlock,
         this div is empty without any requests*/
         requestsBlock.innerHTML='';

          let i =1; //order number
   
    requests.forEach((request) =>{
        let requestHTML = `
    <article class="d-flex justify-content-between align-items-center article-inline">
        <div class="num w5">${i++}</div>
        <input class="id" type="hidden" value="${request.id}">
        <div class="name w60">${request.phoneNumber}</div>
        <div class="date w30">${request.date}</div>
        <div class="remove w5"><button class="btn btn-link btn-remove">X</button></div>
    </article>`;
    //Let's add some articles
    requestsBlock.insertAdjacentHTML('beforeend', requestHTML);
    })
    }

//---
async function addEmails(){
    let emails = await getEmails(); 
    //emails: we have an array of all emails stored in the DB.
     let emailsBlock = document.querySelector('#v-pills-mails');
     /*we have to be sure that every time we work with the emailsBlock,
     this div is empty without any requests*/
     emailsBlock.innerHTML='';

      let i =1; //order number

emails.forEach((emailRequest) =>{
    let emailHTML = `
<article class="d-flex justify-content-between align-items-center article-inline">
    <div class="num w5">${i++}</div>
    <input class="id" type="hidden" value="${emailRequest.id}">
    <div class="name w30">${emailRequest.name}</div>
    <div class="email w30">${emailRequest.email}</div>
    <div class="date w30">${emailRequest.date}</div>
    <div class="remove w5"><button class="btn btn-link btn-remove">X</button></div>
    <div class="text w100">${emailRequest.text}</div>
</article>`;
//Let's add some articles
emailsBlock.insertAdjacentHTML('beforeend', emailHTML);
})
}

//deleting cookie
logOutBtn.addEventListener('click', function(){
    document.cookie.split(";").forEach(function(c) { document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); });
    window.location.href = '/';
})