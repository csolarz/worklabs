'use strict';

module.exports = {
    check: function (ipAddress, autorization) {
         return checkAutorization(ipAddress, autorization);
    }
}

function checkAutorization(ipAddress, autorization) {
    let allowedOrigins = process.env.ALLOWED_ORIGINS.trim();
    let autorizado = false;

    if (autorization === undefined || autorization === '' || allowedOrigins === undefined || allowedOrigins === '') {
        return autorizado;
    }
    ipAddress = (ipAddress.trim() === '::1') ? '127.0.0.1' : ipAddress.trim();

    let listOrigins = allowedOrigins.split(',');
    let origins = [];

    for (var i = 0; i < listOrigins.length; i++) {
        origins = listOrigins[i].split(':');

        if (origins.length > 1) {
            if ((origins[0].trim() === '*' || origins[0].trim() === ipAddress) && (origins[1].trim() === autorization.trim())) {
                autorizado = true;
            }
        }
    }
    return autorizado;
}