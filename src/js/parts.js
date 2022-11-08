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

export const makeUserProfilePage = ({name,email,username,img})=>`
<div>
    <div class="user-profile-image"><img src="${img}"></div>
    <div class="user-profile-body">
        <div class="user-profile-name">${name}</div>
        <div class="user-profile-username">@${username}</div>
        <div class="user-profile-email">${email}</div>
    </div>
    <a href="#" class="js-logout">Log out</a>
</div>
`

export const makeTreeProfileDescription = ({name,type,breed})=>`
<h2>${name}</h2>
<div>${type}</div>
<div>${breed}</div>
`