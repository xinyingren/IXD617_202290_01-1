
const hex = () => chance.string({length:3, pool:'3456789AB'});
const num = () => chance.natural({min:350,max:600});
const getdate = (d1,d2) => dayjs(new Date(chance.natural({min:d1,max:d2}))).format('YYYY-MM-DD HH:mm:ss');

const treetype = (type) => {
    let types = {
        'apple':['fuji','pink-lady','gala'],
        'orange':['navel','blood','tangerine'],
        'pear':['anjou','baldwin','kieffer'],
        'mango':['alphonso','palmer','kent']
    }
    return chance.pickone(types[type]);
}

const getUsers = () => (new Array(10)).fill(0).map((o,i)=>{
    o = {};
    o.id = i + 1;
    o.name = chance.name();
    o.username = 'user'+o.id;
    o.password = md5('pass');
    o.emil = o.username+'@gmail.com';
    o.img = `https://via.placeholder.com/${num()}x${num()}/${hex()}/fff/?text=${o.name}`;
    o.date_create = getdate(Date.parse('2020/01/01'),Date.now());
    return o;
});

const getTrees = () => (new Array(50)).fill(0).map((o,i)=>{
    o = {};
    o.id = i + 1;
    o.user_id = chance.natural({min:1,max:10});
    o.name = chance.first();
    o.type = chance.pickone(['apple','orange','pear','mango']);
    o.breed = treetype(o.type);
    o.description = chance.sentence();
    o.img = `https://via.placeholder.com/${num()}x${num()}/${hex()}/fff/?text=${o.name}`;
    o.date_create = getdate(Date.parse('2020/01/01'),Date.now());
    return o;
});

const getLocations = () => (new Array(250)).fill(0).map((o,i)=>{
    o = {};
    o.id = i + 1;
    o.tree_id = chance.natural({min:1,max:50});
    o.lat = chance.latitude({min:40.602402, max:40.991179});
    o.lng = chance.longitude({min:-74.037420, max:-72.787296});
    o.description = chance.sentence();
    o.photo = `https://via.placeholder.com/${num()}x${num()}/${hex()}/fff/?text=PHOTO`;
    o.icon = `https://via.placeholder.com/${num()}x${num()}/${hex()}/fff/?text=ICON`;
    o.date_create = getdate(Date.parse('2020/01/01'),Date.now());
    return o;
});

const exportAsJSON = (type,data) => {
    document.querySelector('.output').innerHTML = `
    <h2>${type}</h2>
<pre>
[
${data.map((o)=>`${JSON.stringify(o)}`).join(',\n')}
]
</pre>
`;
}

const exportAsSQL = (type,data) => {
    document.querySelector('.output').innerHTML = `
<h2>${type}</h2>
<pre>
INSERT INTO \`${type}\` (\`${Object.keys(data[0]).join('`, `')}\`) VALUES
${data.map((o)=>`(${JSON.stringify(Object.values(o)).slice(1,-1)})`).join(',\n')}
</pre>
`;
}

window.addEventListener('DOMContentLoaded',()=>{
    document.querySelector('.users-json').addEventListener('click',()=>{ exportAsJSON('Users',
    getUsers());});
    document.querySelector('.trees-json').addEventListener('click',()=>{ exportAsJSON('Trees',
    getTrees());});
    document.querySelector('.locations-json').addEventListener('click',()=>{ exportAsJSON('Locations',
    getLocations());});
    document.querySelector('.users-sql').addEventListener('click',()=>{ exportAsSQL('Users',
    getUsers());});
    document.querySelector('.trees-sql').addEventListener('click',()=>{ exportAsSQL('Trees',
    getTrees());});
    document.querySelector('.locations-sql').addEventListener('click',()=>{ exportAsSQL('Locations',
    getLocations());});

});