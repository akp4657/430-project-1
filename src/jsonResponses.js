// Storing in memory
const users = {};

// Respond with a JSON object
const respondJSON = (request, response, status, object) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.write(JSON.stringify(object));
  response.end();
};

// Function to respond without the body, used for HEAD requests
const respondJSONMeta = (request, response, status) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.end();
};

// Return User
const getUsers = (request, response) => {
  const responseJSON = {
    users,
  };

  respondJSON(request, response, 200, responseJSON);
};

const getUsersMeta = (request, response) => respondJSONMeta(request, response, 200);

const notReal = (request, response) => {
  const responseJSON = {
    message: 'The page you are looking for was not found',
    id: 'notFound',
  };

  return respondJSON(request, response, 404, responseJSON);
};

const notRealMeta = (request, response) => respondJSONMeta(request, response, 404);

// Add a user with POST method from class
const addUser = (request, response, body) => {
  // Default message is it fails
  const responseJSON = {
    message: 'Name and age are both required.',
  };

  console.dir(body.name);
  // If either are empty, return immediately
  if (!checkBody(body)) {
    responseJSON.id = 'missingParams';
    return respondJSON(request, response, 400, responseJSON);
  }

  // Otherwise, it must be successful.
  let responseCode = 201;

  // If it exists, then update partially and change code
  if (users[body.name]) {
    responseCode = 204;
  } else {
    users[body.name] = {};
  }

  users[body.name].name = body.name;
  users[body.name].lightStart = body.lightStart;
  users[body.name].look = body.look;

  // Exit after creating the user
  if (responseCode === 201) {
    responseJSON.message = 'Created Successfully';
    return respondJSON(request, response, responseCode, responseJSON);
  }
  return respondJSONMeta(request, response, responseCode);
};


// Iterating through objects to check the body 
// https://stackoverflow.com/questions/8312459/iterate-through-object-properties
const checkBody = (body) => {
  let truthValue = false;

  for (let prop in body) {
    if (Object.prototype.hasOwnProperty.call(body, prop)) {
        if(!body[prop])
        {
          truthValue = false;
        }else{
          truthValue = true;
        }
    }
  }
  return truthValue;


}

// public exports
module.exports = {
  getUsers,
  addUser,
  notReal,
  notRealMeta,
  getUsersMeta,

};
