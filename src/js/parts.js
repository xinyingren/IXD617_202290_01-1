import { templater } from "./functions.js";


export const makeTreeList = templater(({id,name,type,breed,img})=>`
<a class="treelist-item tree-jump" href="#tree-profile-page" data-id="${id}">
    <div class="treelist-image"><img src="${img}"></div>
    <div class="treelist-body">
        <div class="treelist-name">${name}</div>
        <div class="treelist-type">${type}</div>
        <div class="treelist-breed">${breed}</div>
    </div>
</a>
`)