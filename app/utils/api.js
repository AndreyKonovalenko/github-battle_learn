const axios = require('axios');

const id = '';
const sec = '';
const params = '?client_id=' + id + "@client_sec=" + sec;

export default {
    // buttle: (players) => {
    //
    // },
    fetchPopularRepos: (language) => {
        let encodedURI = window.encodeURI('https://api.github.com/search/repositories?q=stars:>1+language:' +  language + '&sort=stars&order=desc&type=Repositories');
        return axios.get(encodedURI)
            .then( (response) => {
                return response.data.items;
            });
    }
}
