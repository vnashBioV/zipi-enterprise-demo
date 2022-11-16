var message = 'hello world'
var type="text"
//create a new XMLHttpRequest
var xhr = new XMLHttpRequest();
//Get a callback when a server responds
xhr.addEventListener('lod', () => {
    console.log(xhr.responseText);
})
xhr.open('GET', 'https://developer.zipi.co.za/testingmobileapp.php?sendto=' + userEmail + 
    '&name=' + company + 
    '&date=' + new Date().toISOString().substring(0,10) +
    '&type=' + type +
    '&bookingref=' + bookingref +
    '&cargoquantity=' + cargoquantity
)
//send the request
xhr.send()