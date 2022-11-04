// job listing array
import dataArr from "./data.json" assert {type: "json"};

const jobList = document.getElementById("job-list");

const example = {
    "id": 2,
    "company": "Manage",
    "logo": "./images/manage.svg",
    "new": true,
    "featured": true,
    "position": "Fullstack Developer",
    "role": "Fullstack",
    "level": "Midweight",
    "postedAt": "1d ago",
    "contract": "Part Time",
    "location": "Remote",
    "languages": ["Python"],
    "tools": ["React"]
};

class JobListing {
    constructor() {
        
    }
}



function render(obj) {
    let renderString = "";
    renderString = `
        <li class="job-container">
            <div class="left-side">
                <img class="avatar" src="${obj.logo}" alt="${obj.company}">
                <div class="job-description">
                    <div class="description-header">
                        <div class="agency-name">${obj.company}</div>
                        <div class="new">NEW!</div>
                        <div class="featured">FEATURED</div>
                    </div>
                    <div class="job-title">${obj.position}</div>
                    <div class="description-footer">
                        <div class="listings-age">${obj.postedAt}</div>
                        <i class="fa-solid fa-circle"></i>
                        <div class="contract">${obj.contract}</div>
                        <i class="fa-solid fa-circle"></i>
                        <div class="job-location">${location}</div>
                    </div>
                </div>
            </div>
            <div class="right-side">
                <div class="qualifications">
                    <div class="role">${obj.role}</div>
                    <div class="level">${obj.level}</div>

    `;  
    if (obj.languages.length) {
        renderString += obj.languages.map(x => `<div class="languages">${x}</div>`);
    }
    if (obj.tools.length) {
        renderString += obj.tools.map(x => `<div class="tools">${x}</div>`);
    }
    renderString += `
                </div>
            </div>
        </li>
    `;

    jobList.innerHTML += renderString;
}
render(example);

console.log(dataArr[3])
