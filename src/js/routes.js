import { query } from "./functions.js"
import { makeTreeList, makeTreeProfileDescription, makeUserProfilePage } from "./parts.js";


export const RecentPage = async() => {}

export const ListPage = async() => {

    let {result:trees} = await query({
        type:"trees_by_user_id",
        params:[sessionStorage.userId]
    });

    console.log(trees)

    $("#list-page .treelist").html(makeTreeList(trees))

}

export const UserProfilePage = async() => {
    let {result:users} = await query({
        type:"user_by_id",
        params:[sessionStorage.userId]
    });
    let [user] = users;

    console.log(user)

    $("#user-profile-page [data-role='main']").html(makeUserProfilePage(user))
}

export const TreeProfilePage = async() => {
    let {result:trees} = await query({
        type:"tree_by_id",
        params:[sessionStorage.treeId]
    });
    let [tree] = trees;

    $(".tree-profile-top").css({"background-image":`url(${tree.img})`})
    $("#tree-profile-page h1").html(tree.name)
    $("#tree-profile-page .section-description").html(makeTreeProfileDescription(tree));

    let {result:locations} = await query({
        type:"locations_by_tree_id",
        params:[sessionStorage.treeId]
    });
    console.log(locations)
}