document.addEventListener("DOMContentLoaded", function() {
    axios.get('https://api.example.com/data') // Cambia por la API que estés usando
    .then(response => {
        console.log(response.data);
        // Aquí puedes manipular y mostrar los datos en tu interfaz de AdminLTE
    })
    .catch(error => console.error('Error al consultar la API:', error));
 });
 