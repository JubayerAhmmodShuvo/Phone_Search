// message and spinner called by ID and set display to none

document.getElementById('message').style.display = 'none';
document.getElementById('message2').style.display = 'none';
document.getElementById('spinner').style.display = 'none';

// search function for search bar

const searchPhone = () => {
    document.getElementById('spinner').style.display = 'block';
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;

    // clear field

    searchField.value = '';

    // clear details while new search

    const details = document.getElementById('phone-details');
    details.innerHTML = '';
    const searchResult = document.getElementById('search-result');
    searchResult.innerHTML = '';
    if (searchText.length > 0) {
        /* fetch url */
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

// show result when search

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

// to show catch item while details button clicked


const loadPhoneDetail = id => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;


    fetch(url)
        .then(response => response.json())
        .then(data => displayPhoneDetails(data.data));


};

// show details after clicking details button on

const displayPhoneDetails = (phone) => {
    const details = document.getElementById('phone-details');
    details.innerHTML = '';
    const div = document.createElement('div');
    div.classList.add('card');
    const ul = document.createElement('ul');
    const li = document.createElement('li');
    div.innerHTML = `
    <img class="h-50  img-fluid mb-3 " src="${phone.image}" class="card-img-top" alt="phone image">
                    <div class="card-body">
                        <h5 class=" mb-2 "> Name:${phone.name}</h5>
                        <h5 class=" mb-3 "> Brand:${phone.brand}</h5>
                        <h6 class=" mb-4 ">Release Date: ${phone.releaseDate  }</h6>
                      
                        <li> Storage: ${phone.mainFeatures.storage}</li>
                        <li>Display Size: ${phone.mainFeatures.displaySize}</li>
                        <li>ChipSet: ${phone.mainFeatures.chipSet}</li>
                        <li>Memory: ${phone.mainFeatures.memory}</li>
                        <li>Sensors: ${phone.mainFeatures.sensors}</li>
                        <li>WLAN:${phone.others?.WLAN ?? "No WLAN Detail Found"}</li>
                        <li>Memory:${phone.others?.Bluetooth ?? "No Bluetooth Detail Found" }</li>
                        <li>Bluetooth:${phone.others?.GPS ?? "No GPS Detail Found"}</li>
                        <li>NFC:${phone.others?.NFC ?? "No NFC Detail Found"}</li>
                        <li>Radio:${phone.others?.Radio ?? "No Radio Detail Found"}</li>
                        <li>USB:${phone.others?.USB ?? "No USB Detail Found"}</li>
  `;

    div.appendChild(ul);
    details.appendChild(div);
};