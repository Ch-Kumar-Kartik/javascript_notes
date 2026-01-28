a fetch promise only rejects when a network error is encountered 
(which is usually when tehre's a permission issue or similar). A fetch() 
promise does not reject HTTP errors (404 etc.) Instead a 
then() handler must check the response.ok and/or response.status properties


