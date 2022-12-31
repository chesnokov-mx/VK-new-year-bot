//maybeFinalVersion
const easyvk = require('easyvk')
const path = require('path');
const fs = require("fs");
require('dotenv').config()

const congratz = "Поздравляю с Новым годом!🎉🎁🎄🍷"

async function MainMakeMagic(){
    startServer()
    setTimeout(contragzAll, 21600000);
}
async function startServer(){
    easyvk({
        username: process.env.VKLOGIN,
        password: process.env.VKPAS,
    }).then(async vk => {
        let id = await vk.call('users.get', {
            user_ids: "chesnokovmx",
        });

        let letter = await vk.call('messages.send', {
            peer_id: vk.session.user_id,
            message: `${id[0].id} сервер попущен!`,
            random_id: easyvk.randomId()
        });
    })
}
async function contragzAll(){
    easyvk({
        username: process.env.VKLOGIN,
        password: process.env.VKPAS,
    }).then(async vk => {
        let listFriends = await vk.call('friends.get', {
            fields: 'bdate'
        })
        const ArrBirth = listFriends.items.map((el) => el.id)
        console.log(ArrBirth)
        for(let userId of ArrBirth){
            let letter = await vk.call('messages.send', {
                user_id: userId,
                peer_id: vk.session.user_id,
                message: congratz,
                random_id: easyvk.randomId()
            });
        }
    })
}
MainMakeMagic()