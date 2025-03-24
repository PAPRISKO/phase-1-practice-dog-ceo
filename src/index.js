console.log('%c HI', 'color: firebrick')
document.addEventListener("DOMContentLoaded", () => {
    const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
    const breedUrl = "https://dog.ceo/api/breeds/list/all";
    const imgContainer = document.getElementById("dog-image-container");
    const breedList = document.getElementById("dog-breeds");
    const breedDropdown = document.getElementById("breed-dropdown");

    // Fetch and display dog images
    fetch(imgUrl)
        .then(response => response.json())
        .then(data => {
            data.message.forEach(imageUrl => {
                const img = document.createElement("img");
                img.src = imageUrl;
                img.style.width = "200px";
                img.style.margin = "10px";
                imgContainer.appendChild(img);
            });
        });

    // Fetch and display dog breeds
    fetch(breedUrl)
        .then(response => response.json())
        .then(data => {
            const breeds = Object.keys(data.message);
            renderBreeds(breeds);
        });

    function renderBreeds(breeds) {
        breedList.innerHTML = ""; // Clear previous list
        breeds.forEach(breed => {
            const li = document.createElement("li");
            li.textContent = breed;
            li.style.cursor = "pointer";
            li.addEventListener("click", () => {
                li.style.color = "blue"; // Change color on click
            });
            breedList.appendChild(li);
        });
    }

    // Filter breeds based on dropdown selection
    breedDropdown.addEventListener("change", (event) => {
        const selectedLetter = event.target.value;
        fetch(breedUrl)
            .then(response => response.json())
            .then(data => {
                const breeds = Object.keys(data.message);
                const filteredBreeds = breeds.filter(breed => breed.startsWith(selectedLetter));
                renderBreeds(filteredBreeds);
            });
    });
});
