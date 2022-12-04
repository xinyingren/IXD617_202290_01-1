import { checkListFilter, checkListSearchForm, checkLocationAddForm, checkPasswordEditForm, checkSignupForm, checkTreeAddForm, checkTreeDeleteForm, checkTreeEditForm, checkUserEditForm, checkUserEditPhotoForm } from "./forms.js";
import { checkUpload } from "./functions.js";
import { ChooseLocationPage, ListPage, RecentPage, TreeAddPage, TreeEditPage, TreeProfilePage, UserEditPage, UserEditPhotoPage, UserProfilePage } from "./routes.js";
import { checkSigninForm, checkUserId } from "./signin.js";

// Document Ready
$(() => {

    checkUserId();

    $(document)

    .on("pagecontainerbeforeshow", function(event, ui) {
        
        /* PAGE ROUTES */
        switch(ui.toPage[0].id) {
            case "recent-page": RecentPage(); break;
            case "list-page": ListPage(); break;

            case "user-profile-page": UserProfilePage(); break;
            case "user-edit-page": UserEditPage(); break;
            case "user-edit-photo-page": UserEditPhotoPage(); break;

            case "tree-profile-page": TreeProfilePage(); break;
            case "tree-add-page": TreeAddPage(); break;
            case "tree-edit-page": TreeEditPage(); break;

            case "choose-location-page": ChooseLocationPage(); break;
            case "location-edit-page": break;
        }
    })
    
    

    // EVENT DELEGATION
    .on("submit", "#signin-form", function(e) {
        e.preventDefault();
        checkSigninForm();
    })
    .on("submit", "#signup-form", function(e) {
        console.log("signup", e)
        e.preventDefault();
        checkSignupForm();
    })

    .on("submit", "#user-edit-form", function(e) {
        e.preventDefault();
        checkUserEditForm();
    })
    .on("submit", "#tree-edit-form", function(e) {
        e.preventDefault();
        checkTreeEditForm();
    })
    .on("submit", "#list-search-form", function(e) {
        e.preventDefault();
        let search = $(this).find("input").val();
        checkListSearchForm(search);
    })


    .on("change", ".imagepicker input", function(e) {
        checkUpload(this.files[0])
        .then((d) => {
            console.log(d);
            let filename = `uploads/${d.result}`;
            $(this).parent().prev().val(filename);
            $(this).parent().css({
                "background-image": `url('${filename}')`
            })
        })
    })


    .on("click", "[data-filter]", function(e){
        let {filter,value} = $(this).data();
        if (value!=="") checkListFilter(filter,value);
        else ListPage();
    })





    .on("click", ".js-logout", function(e) {
        sessionStorage.removeItem("userId");
        checkUserId();
    })


    .on("click", ".tree-jump", function(e) {
        let id = $(this).data("id");

        sessionStorage.treeId = id;
    })
    .on("click", ".location-jump", function(e) {
        let id = $(this).data("id");

        sessionStorage.locationId = id;
    })

    .on("click", ".js-tree-delete", function(e) {
        checkTreeDeleteForm();
    })
    .on("click", ".js-choose-tree-for-location", function(e) {
        $("#location-tree-id").val(sessionStorage.treeId);
        $("#location-back").val(-2);
    })


    .on("click", ".js-submit-user-edit-form", function(e) {
        checkUserEditForm();
    })
    .on("click", ".js-submit-user-edit-photo-form", function(e) {
        checkUserEditPhotoForm();
    })
    .on("click", ".js-submit-password-edit-form", function(e) {
        checkPasswordEditForm();
    })
    .on("click", ".js-submit-tree-add-form", function(e) {
        checkTreeAddForm();
    })
    .on("click", ".js-submit-tree-edit-form", function(e) {
        checkTreeEditForm();
    })
    .on("click", ".js-submit-location-add-form", function(e) {
        checkLocationAddForm();
    })
    


    .on("click", ".nav-link", function(e) {
        if (e.cancelable) e.preventDefault();
        let id = $(this).index();
        $(this).parent().next().children().eq(id)
            .addClass("active")
            .siblings().removeClass("active");
        $(this).addClass("active")
            .siblings().removeClass("active");
    })



    // ACTIVATE TOOLS
    .on("click", "[data-activate]", function(e) {
        const target = $(this).data("activate");
        $(target).addClass("active");
    })
    .on("click", "[data-deactivate]", function(e) {
        const target = $(this).data("deactivate");
        $(target).removeClass("active");
    })
    .on("click", "[data-toggle]", function(e) {
        const target = $(this).data("toggle");
        $(target).toggleClass("active");
    })
    .on("click", "[data-activateone]", function(e) {
        const target = $(this).data("activateone");
        $(target).toggleClass("active")
            .sibling().removeClass("active");
    })
});