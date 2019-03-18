$1
        server.post({{toUpperCase name}}_CREATE_URL, create{{name}});
        server.post({{toUpperCase name}}_DELETE_URL, delete{{name}});
        server.post({{toUpperCase name}}_READ_URL, read{{name}});
        server.post({{toUpperCase name}}_UPDATE_URL, update{{name}});