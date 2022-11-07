// job listing array
import dataArr from "./data.json" assert {type: "json"};

const jobList = document.getElementById("job-list");

let filterArr = [];
let dataFiltered = [];


// render job listings
function generateListings(obj) {
    let renderString = "";
    dataFiltered.map(obj =>{
        if (obj.featured === true) {
            renderString += `
            <li class="job-container shadow highlight" id="${obj.id}">
            `
        }
        else {
            renderString += `
            <li class="job-container shadow" id="${obj.id}">
            `
        }
        renderString += `
            <div class="left-side">
                <img class="avatar" src="${obj.logo}" alt="${obj.company}">
                <div class="job-description">
                    <div class="description-header">
                        <div class="agency-name">${obj.company}</div>`;
    if (obj.new) {
        renderString += `<div class="new">NEW!</div>`;
    }
    if (obj.featured) {
        renderString += `<div class="featured">FEATURED</div>`;
    }    
    renderString += `</div>
                    <div class="job-title">${obj.position}</div>
                    <div class="description-footer">
                        <div class="listings-age">${obj.postedAt}</div>
                        <i class="fa-solid fa-circle"></i>
                        <div class="contract">${obj.contract}</div>
                        <i class="fa-solid fa-circle"></i>
                        <div class="job-location">${obj.location}</div>
                    </div>
                </div>
            </div>
            <hr></hr>
            <div class="right-side">
                <div class="qualifications">
                    <button class="qualification" value="${obj.role}">${obj.role}</button>
                    <button class="qualification" value="${obj.level}">${obj.level}</button>
    `;  
    if (obj.languages.length) {
        renderString += obj.languages.map(x => `<button class="qualification" value="${x}">${x}</button>`).join("");
    }   
    if (obj.tools.length) {
        renderString += obj.tools.map(x => `<button class="qualification" value="${x}">${x}</button>`).join("");
    }
    renderString += `
                </div>
            </div>
        </li>
    `;
    });
    jobList.innerHTML = renderString;
}


// render DOM elements for filter
function generateFilter() {
    let filterString = "";
    for (let i = 0; i < filterArr.length; i++) {
        filterString +=         `
        <div class="filter-item">
            <div class="filter">${filterArr[i]}</div>
            <button class="close" value="${filterArr[i]}" id="${filterArr[i]}">
                <img src="./images/icon-remove.svg">
            </button>
        </div>
        `;
    }
    filterList.innerHTML = filterString;
}



function filterData() {
    dataFiltered = dataArr.map(obj => {
        let found = 0;
        for (let index in filterArr) {
            for (let key in obj) {
                if (typeof obj[key] === "object") {
                    if (obj[key].includes(filterArr[index])) {
                        found++;
                    }
                }
                else {
                    if (obj[key] === filterArr[index]) {
                        found++;
                    }
                }
            }
        }
        if (found === filterArr.length) {
            return obj
        }
    }).filter(obj =>  obj?obj:false);
}


function renderListings() {
    filterData();
    generateListings();
}

renderListings();


let qualification = document.querySelectorAll(".qualification");
const filterList = document.getElementById("filter-list");



// display or hide filter container
function displayFilter() {
    if (filterArr.length === 0) {
        document.getElementById("filter-container").style.opacity = 0;
    }
    if (filterArr.length === 1) {
        document.getElementById("filter-container").style.opacity = 1;
    }  
}

let closeButton = document.querySelectorAll(".close");
// reset filter
document.getElementById("clear").addEventListener("click", () => {
    filterArr.length = 0;
    displayFilter();
    renderListings()
})


// remove items from filter
const trackFilterMutations = mutations => {
    mutations.forEach(mutation => {
        if (mutation.type === "childList") {
            closeButton = document.querySelectorAll(".close");
            closeButton.forEach(button => {
                button.addEventListener("click", () => {
                    console.log("close")
                    filterArr.splice(filterArr.indexOf(button.value), 1);
                    //console.log(filterArr)
                    displayFilter();
                    generateFilter();
                    renderListings();
                })
            })
        }
    })
}

const trackListingMutations = mutations => {
    mutations.forEach(mutation => {
        if (mutation.type === "childList") {
            qualification = document.querySelectorAll(".qualification");
            // udd to filter
            qualification.forEach(element => {
                element.addEventListener("click", () => {
                    if (!filterArr.includes(element.value)) {
                        filterArr.push(element.value);
                        displayFilter();
                        generateFilter();
                        renderListings();
                    }
                })
            })
        }

    })
}

// udd to filter
qualification.forEach(element => {
    element.addEventListener("click", () => {
        if (!filterArr.includes(element.value)) {
            filterArr.push(element.value);
            displayFilter();
            generateFilter();
            renderListings();
        }
    })
})


const config = { attributes: true, childList: true, subtree: true };


const observeFilter = new MutationObserver(trackFilterMutations);
const observeListings = new MutationObserver(trackListingMutations);

observeFilter.observe(filterList, config);
observeListings.observe(jobList, config);








