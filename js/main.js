// job listing array
import dataArr from "./data.json" assert {type: "json"};

const jobList = document.getElementById("job-list");


function render(obj) {
    let renderString = "";
    renderString = `
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
    jobList.innerHTML += renderString;
}

dataArr.map(x => render(x));



const qualification = document.querySelectorAll("button");
let filterArr = [];

qualification.forEach(element => {
    element.addEventListener("click", () => {
        if (!filterArr.includes(element.value)) {
            filterArr.push(element.value);
        }
        console.log(filterArr)
    })
})
