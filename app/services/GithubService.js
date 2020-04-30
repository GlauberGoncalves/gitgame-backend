const axios = require('axios');


class Github {
    constructor() {
        this.path = `https://api.github.com`
    }

    async findUserByName(githubName){
        try{
            const url = `${this.path}/users/${githubName}`
            console.log(await axios.get(url))
        } catch (error){
            console.error(error)
        }
    }

    async findReposByUser(githubUser) {
        try {
            const url = `${this.path}/users/${githubUser}/repos`
            return await axios.get(url);  
        } catch (error) {
            console.error(error);
        }
    }
}

module.exports = Github