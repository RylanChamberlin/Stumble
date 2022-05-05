import axios from "axios";

export default axios.create({

    baseURL: `https://api.yelp.com/v3/businesses`,
    headers: {
        Authorization: `Bearer NuMbfcJRatwgeHamyeuE3bpOMQIyEH_bcSuozWRyTNLu4w4iToeEeuxDkcIJ6Axap_JT73j2_QPSYkdINJUk4Whf7jlsJcjjNfxyM7xwdH-h6divSbhaIg45ZG5LYnYx`
    },
});

