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
</div>
`

export const makeTreeProfileDescription = ({name,type,breed})=>`
<h2>${name}</h2>
<div>${type}</div>
<div>${breed}</div>
`

export const makeTreeMapDescription = ({name,type,breed,img}) => {
    return `<div class="tree-map-description display-flex">
        <div class="tree-map-image">
            <img src="${img}" />
        </div>
        <div class="tree-map-body">
            <h1>${name}</h1>
            <div>${type}</div>
            <div>${breed}</div>
        </div>
    </div>`;
}



export const makeEditUserForm = ({name,username,email}) => {

    return `<div class="form-control">
        <label class="form-label" for="user-edit-username">Username</label>
        <input class="form-input" type="text" id="user-edit-username" data-role="none" placeholder="Type your Username" value="${username}">
    </div>
    <div class="form-control">
        <label class="form-label" for="user-edit-name">Name</label>
        <input class="form-input" type="text" id="user-edit-name" data-role="none" placeholder="Type your Name" value="${name}">
    </div>
    <div class="form-control">
        <label class="form-label" for="user-edit-email">Email</label>
        <input class="form-input" type="text" id="user-edit-email" data-role="none" placeholder="Type your Email" value="${email}">
    </div>`
}




const FormControlInput = ({namespace,name,displayname,type,placeholder,value}) => {
    return `<div class="form-control">
        <label class="form-label" for="${namespace}-${name}">${displayname}</label>
        <input class="form-input" type="${type}" id="${namespace}-${name}" data-role="none" placeholder="${placeholder}" value="${value}">
    </div>`
}
const FormControlTextarea = ({namespace,name,displayname,placeholder,value}) => {
    return `<div class="form-control">
        <label class="form-label" for="${namespace}-${name}">${displayname}</label>
        <textarea class="form-input" id="${namespace}-${name}" data-role="none" placeholder="${placeholder}">${value}</textarea>
    </div>`
}


export const makeEditTreeForm = ({tree,namespace}) => {
    return `
    ${FormControlInput({
        namespace,
        name: "name",
        displayname: "Name",
        type: "text",
        placeholder: "Type a Name",
        value: tree.name
    })}
    ${FormControlInput({
        namespace,
        name: "type",
        displayname: "Type",
        type: "text",
        placeholder: "Type a Type",
        value: tree.type
    })}
    ${FormControlInput({
        namespace,
        name: "breed",
        displayname: "Breed",
        type: "text",
        placeholder: "Type a Breed",
        value: tree.breed
    })}
    ${FormControlTextarea({
        namespace,
        name: "description",
        displayname: "Description",
        placeholder: "Type a Description",
        value: tree.description
    })}
    `;
}