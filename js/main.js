// job listing array
import dataArr from "./data.json" assert {type: "json"};

const jobList = document.getElementById("job-list");

let filterArr = [];
let dataFiltered = [];


// render job listings
function generateListings(obj) {
    let renderString = "";
    dataFiltered.map(obj =>{
        renderString += `
        <li class="job-container shadow" id="${obj.id}">
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
            <div class="qualification">${filterArr[i]}</div>
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
    console.log(dataFiltered)
}


function renderListings() {
    filterData();
    generateListings();
}

renderListings();


let qualification = document.querySelectorAll("button");
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
// reset filter
document.getElementById("clear").addEventListener("click", () => {
    filterArr.length = 0;
    displayFilter();
    renderListings()
})



let closeButton = document.querySelectorAll(".close");
// remove items from filter
const trackFilterMutations = mutations => {
    mutations.forEach(mutation => {
        if (mutation.type === "childList") {
            closeButton = document.querySelectorAll(".close");
            closeButton.forEach(button => {
                button.addEventListener("click", () => {
                    filterArr.splice(filterArr.indexOf(button.value), 1);
                    displayFilter()
                    generateFilter();
                })
            })
        }
    })
}

const trackListingMutations = mutations => {
    mutations.forEach(mutation => {
        if (mutation.type === "childList") {
            qualification = document.querySelectorAll("button");
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








