let createForm = document.querySelector('.create-post-form');
let createTitle = document.querySelector('#create-title');
let createCountry = document.querySelector('#create-country');
let createImageUrl = document.querySelector('#create-image-url');
let createText = document.querySelector('#create-text');
let createImageFile = document.querySelector('#create-image-file');

createForm.addEventListener('submit', function(e){
    e.preventDefault();
    let text = createText.value;
    let data = new FormData(); //by writing this, we create an object of the type form data.
    data.append('title', createTitle.value);
    data.append('country', createCountry.value);
    data.append('imageUrl', createImageUrl.value);
    data.append('text', text);
    data.append('description', text.substring(0, text.indexOf('.')+1));
    data.append('imageFile', createImageFile.files[0]); //now the file which we choose will be sent to the server

    fetch('http://localhost:3000/posts' , {
        method: 'POST',
       /* headers: {
            'Content-Type': 'application/json'
        },*/
       /* body: JSON.stringify({ //we send the data to the server in json farmat
            title: createTitle.value,
            country: createCountry.value,
            imageUrl: createImageUrl.value,
            text: text,
            description: text.substring(0, text.indexOf('.')+1)
            //to add dot we added +1! The first sentence we took for description.
        })*/
        body: data
    }).then((res) => res.text())
    //.then((data) => console.log(data));
    .then((data) => window.history.go());
})

function disableInput(input1, input2){
    if(input1.value) {
        input2.disabled = true;
    }else{
        input2.disabled = false;
    }
}


createImageUrl.addEventListener('change', function(){
    disableInput(this, createImageFile)
});
createImageFile.addEventListener('change', function(){
    disableInput(this, createImageUrl)
});