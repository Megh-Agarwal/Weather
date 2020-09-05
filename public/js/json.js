var placesAutocomplete = places({
    appId: "plV8M0FS8RY1",
    apiKey: "78d837f89689ff7c548ed3b627e638bb",
    container: document.querySelector('#address-input')
});

const weatherForm = document.querySelector('form')
const search = document.getElementById('address-input');
const messageOne = document.querySelector('#message-1')

const city = document.getElementById('city').textContent

const urlAutodetected = 'https://poiuytrewqasdfghjkl.herokuapp.com/weather?address=' + city;
$.ajax({
    type: 'GET',
    url: urlAutodetected,
    success: function(response){
        var data = response;
        if (data.error) {
            messageOne.textContent = data.error
        } else {
            messageOne.textContent = "The json data is printed below"
        }
        document.getElementById('result').textContent = `${JSON.stringify(data, undefined, 4)}`;
    }
})


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value;
    const url = 'https://poiuytrewqasdfghjkl.herokuapp.com/weather?address=' + location;
    $.ajax({
        type: 'GET',
        url: url,
        beforeSend: function(){
            messageOne.textContent = 'Loading...'
        },
        success: function(response){
            var data = response;
            if (data.error) {
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = "The json data is printed below"
            }
            document.getElementById('result').textContent = `${JSON.stringify(data, undefined, 4)}`;
        }
    })
})