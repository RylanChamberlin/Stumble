def search
    res = Faraday.get("https://api.yelp.com/v3/businesses/search") do |req|
      req.headers['Authorization'] = "Bearer NuMbfcJRatwgeHamyeuE3bpOMQIyEH_bcSuozWRyTNLu4w4iToeEeuxDkcIJ6Axap_JT73j2_QPSYkdINJUk4Whf7jlsJcjjNfxyM7xwdH-h6divSbhaIg45ZG5LYnYx"
      req.params['categories'] = 'food,restaurants'
      req.params['term'] = params[:term]
      req.params['location'] = params[:location]
    end
    search_results = JSON.parse(res.body)
    render json: search_results
  end