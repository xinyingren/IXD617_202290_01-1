import { query } from "./functions.js"
import { makeTreeList, makeTreeProfileDescription, makeUserProfilePage } from "./parts.js";


export const RecentPage = async() => {
    // let {result:trees} = await query({
    //     type:"tree_locations_by_user_id",
    //     params:[sessionStorage.userId]
    // });

    // console.log(trees);

    // let my_tree_ids = [...new Set(trees.map(o=>o.tree_id))];
    // console.log(my_tree_ids);
    // let last_locations = my_tree_ids.map(id=>{
    //     let locations = trees.filter(o=>id===o.tree_id);
    //     locations.sort((a, b) => {
    //         if (a.date_create > b.date_create) {
    //           return 1;
    //         }
    //         if (a.date_create < b.date_create) {
    //           return -1;
    //         }
    //         return 0;
    //       });
    //     return locations.slice(-1)[0];
    // })
    // console.log(last_locations)
    
    let {result:tree_locations} = await query({
        type:"recent_tree_locations",
        params:[sessionStorage.userId]
    });
    console.log(tree_locations);

    let valid_trees = tree_locations.reduce((r,o)=>{
        o.icon = o.img;
        if (o.lat && o.lng) r.push(o);
        return r;
    },[])

    let map_el = await makeMap("#recent-page .map");
    makeMarkers(map_el,valid_trees);
}

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