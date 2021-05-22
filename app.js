let admin = require('firebase-admin');
let serviceAccount = require("./credential.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

/*
List the user that you want to keep here.

Sample:

let remainingUserUids = [
  "TfCRq3hjlscAAtW9A3h7jA13LNt1"
];
*/
let remainingUserUids = [];


function listAllUsersUid() {
  return new Promise((resolve, reject) => {
    admin
      .auth()
      .listUsers()
      .then((listUsersResult) => {
        let usersUid = listUsersResult.users.map((userRecord) => {
          return userRecord.uid;
        });
        resolve(usersUid);
      })
      .catch((error) => {
        console.log('Error listing users');
        reject(error);
      });
  })
}

function deleteUsersByUid(users) {
  return new Promise((resolve, reject) => {
    admin
      .auth()
      .deleteUsers(users)
      .then((deleteUsersResult) => {
        console.log(`Successfully deleted ${deleteUsersResult.successCount} users`);
        console.log(`Failed to delete ${deleteUsersResult.failureCount} users`);
        deleteUsersResult.errors.forEach((err) => {
          console.log(err.error.toJSON());
        });
        resolve();
      })
      .catch((error) => {
        console.log('Error deleting users:');
        reject(error);
      });
  })
}

listAllUsersUid()
  .then((allUsers) => {
    // Exclude the remaining user from the array list
    let selectedUserUid = allUsers.filter(item => !remainingUserUids.includes(item));
    return deleteUsersByUid(selectedUserUid);
  })
  .catch(error => {
    console.log('Error: ', error);
  });
