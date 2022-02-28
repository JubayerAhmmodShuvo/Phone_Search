document.getElementById('message').style.display = 'none';
const searchPhone = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    searchField.value = '';

    /* fetch url */
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    fetch(url)
        .then(response => response.json())
        .then(data => showPhoneDetails(data.data));

};

const showPhoneDetails = (phones) => {

    const searchResult = document.getElementById('search-result');
    searchResult.innerHTML = '';
    if (!phones.length) {
        document.getElementById('message').style.display = 'block';
    }
    phones.slice(0, 20).forEach(phone => {
        console.log(phone);

    });

};