# Nodejs: Firebase User Cleanup

## Overview
This repo contains the nodejs program to cleanup the exsiting user in firebase. 

## Problem Faced: 
There are more than thousand of test records that need to be deleted in firebase project. 

## Solution:
1. Find get all user uid from listing api.
2. Filter out the records that need to keep.
3. Delete the records by using firebase delete function.

## How to use it:
1. Replace the content of credential.json with your service account's private key content.
2. (Optional) In case you need to keep some of the accounts, you may fill up those uid in remainingUserUids array in app.js
3. npm run start
