document.getElementById('message').style.display = 'none';
document.getElementById('message2').style.display = 'none';
document.getElementById('spinner').style.display = 'none';
const searchPhone = () => {
    document.getElementById('spinner').style.display = 'block';
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    searchField.value = '';
    const details = document.getElementById('phone-details');
    details.innerHTML = '';
    if (searchText.length > 0) { /* fetch url */
        const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
        fetch(url)
            .then(response => response.json())
            .then(data => showPhoneDetails(data.data));
    } else {

        document.getElementById('message2').style.display = 'block';
        document.getElementById('spinner').style.display = 'none';
        document.getElementById('message').style.display = 'none';
    }



};

const showPhoneDetails = (phones) => {

    const searchResult = document.getElementById('search-result');
    searchResult.innerHTML = '';
    if (!phones.length) {
        document.getElementById('message').style.display = 'block';
        document.getElementById('spinner').style.display = 'none';
        document.getElementById('message2').style.display = 'none';
    } else {
        phones.slice(0, 20).forEach(phone => {
            document.getElementById('spinner').style.display = 'none';

            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
        <div class="card h-100 mt-5">
                    <img class="h-75 mb-3" src="${phone.image}" class="card-img-top" alt="phone image">
                    <div class="card-body">
                        <h5 class="card-title mb-2 text-center"> Name:${phone.phone_name}</h5>
                        <h5 class="card-title mb-2 text-center"> Brand:${phone.brand}</h5>
                        <div class="d-flex justify-content-end mt-2">
                            <button onclick="loadPhoneDetail('${phone.slug}')" class="btn btn-primary border-0 ">Details</button>
                        </div>
                    </div>
                </div>
        `;
            searchResult.appendChild(div);
        });
    }

};
const loadPhoneDetail = id => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;


    fetch(url)
        .then(response => response.json())
        .then(data => displayPhoneDetails(data.data));


};
const displayPhoneDetails = (phone) => {
    const details = document.getElementById('phone-details');
    details.innerHTML = '';
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
    <img class="h-75 mb-3" src="${phone.image}" class="card-img-top" alt="phone image">
                    <div class="card-body">
                        <h5 class="card-title mb-2 text-center"> Name:${phone.name}</h5>
                        <h5 class="card-title mb-2 text-center"> Brand:${phone.brand}</h5>
                        <p></p>
                        <p></p>
  `;
    details.appendChild(div);
};