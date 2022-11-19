## STATIC JOB LISTINGS
This is a challenge from [Frontend Mentor](https://www.frontendmentor.io). The options suggested by the challenge do not really suite me at this point, I am interested in generating HTML code with javascript how ever I am not yet familiar with any JS framework so I am going to try to pull data out of a object with plain javascript.

### DESIGN:
![Design preview for the Job listings with filtering coding challenge](./design/desktop-preview.jpg)

### The challenge
Your challenge is to build out this job listing page and get it looking as close to the design as possible.
You can use any tools you like to help you complete the challenge. So if you've got something you'd like to practice, feel free to give it a go.

Your users should be able to:
#### REQUIREMENTS:
- View the optimal layout for the site depending on their device's screen size
- See hover states for all interactive elements on the page
- Filter job listings based on the categories

#### FILTERING:
#### OPTION 1:
Filter job listings based on the categories using the HTML `data-` attribute. In this option, you'd use the hardcoded content that already exists in the [index.html](./index.html) file.
The categories are:
- Role: Frontend, Backend, Fullstack
- Level: Junior, Midweight, Senior
- Languages: Python, Ruby, JavaScript, HTML, CSS
- Tools: React, Sass, Vue, Django, RoR (Ruby on Rails)
#### The categories are:
- Role: Frontend, Backend, Fullstack
- Level: Junior, Midweight, Senior
- Languages: Python, Ruby, JavaScript, HTML, CSS
- Tools: React, Sass, Vue, Django, RoR (Ruby on Rails)

<em>So, if a job listing is for has the following categories `Frontend, Junior, JavaScript, React` your HTML data attributes would look like this `data-role="frontend" data-level="junior" data-languages="javascript" data-tools="react"`.</em>

### OPTION 2:
Use the [data.json](./js/data.json) file to pull the data and then dynamically add the content. This would be perfect if you're looking to practice a JS library/framework like React, Vue, or Svelte.
To add a filter, the user needs to click on the tablets on the right-side of the listing on desktop or the bottom on mobile. For each filter added, only listings containing all selected filters should be returned.
