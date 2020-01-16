const axios = require('axios');
const Dev = require('../models/Dev')
const parseStringAsArray = require('../utils/parseStringAsArray')


// index, show, store, update, destroy

module.exports = {

    async index (request, response){
        const devs = await Dev.find();
        return response.json(devs);
    },

    async store(request, response) {
        const { github_username, techs, latitude, longitude } = request.body;

        let dev = await Dev.findOne({github_username});

        if (!dev) {
            const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);

            const { name = login, avatar_url, bio = blog} = apiResponse.data;
            const techsArray = parseStringAsArray(techs);

            const location = {
                type: 'Point',
                coordinates: [longitude, latitude],
            }

            const dev = await Dev.create({
                github_username: github_username,
                name: name,
                avatar_url: avatar_url,
                bio: bio,
                techs: techsArray,
                location
            })

            return response.json(dev);  
        } 

        return response.json();
    },

    async update(request, response) {
        const { name, avatar_url, bio, github_username, techs, latitude, longitude } = request.body;

        let dev = await Dev.findOne({github_username});
        const techsArray = parseStringAsArray(techs);
        const location = {
            type: 'Point',
            coordinates: [longitude, latitude],
        }

        dev.name = name;
        dev.avatar_url = avatar_url;
        dev.bio = bio;
        dev.techs = techsArray;
        dev.location = location;

        await dev.save();

        /*
        const dev = await Dev.update({
            name: name,
            avatar_url: avatar_url,
            bio: bio,
            techs: techsArray,
            location
        })
        */

        return response.json(dev); 
    },
    async destroy(request, response) {
        const { github_username } = request.body;
        let dev = await Dev.findOne({github_username});
        if (dev){
            await dev.remove();
        }
        return response.json(dev); 
    },


}