import { query } from "./functions.js"
import { makeTreeList } from "./parts.js";


export const RecentPage = async() => {}

export const ListPage = async() => {

    let {result:trees} = await query({
        type:"trees_by_user_id",
        params:[sessionStorage.userId]
    });

    console.log(trees)

    $("#list-page .treelist").html(makeTreeList(trees))

}

export const UserProfilePage = async() => {}

export const TreeProfilePage = async() => {}