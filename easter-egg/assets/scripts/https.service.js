let HttpsService = function (baseUrl) {

    function get(endpoint) {
        return new Promise((resolve, reject) => {
            $.ajax({
                type: 'GET',
                url: baseUrl + endpoint,
                success: function (response) {
                    resolve(response);
                },
                error: function () {
                    alert('Error retrieving data');
                },
                dataType: 'json'
            });
        });
    }

    function post(endpoint, data) {
        return new Promise((resolve, reject) => {
            $.ajax({
                type: 'POST',
                url: baseUrl + endpoint,
                data: data,
                success: function (response) {
                    resolve(response);
                },
                error: function (response) {
                    reject(response.responseJSON);
                },
                dataType: 'json'
            });
        });
    }

    function put(endpoint, data) {
        return new Promise((resolve, reject) => {
            $.ajax({
                type: 'PUT',
                url: baseUrl + endpoint,
                data: data,
                success: function (response) {
                    resolve(response);
                },
                error: function (response) {
                    reject(response.responseJSON);
                },
                dataType: 'json'
            });
        });
    }

    function remove(endpoint, data) {
        return new Promise((resolve, reject) => {
            $.ajax({
                type: 'DELETE',
                url: baseUrl + endpoint,
                data: data,
                success: function (response) {
                    resolve(response);
                },
                error: function (response) {
                    reject(response.responseJSON);
                },
                dataType: 'json'
            });
        });
    }

    return {
        get: get,
        post: post,
        put: put,
        remove: remove
    };
};
