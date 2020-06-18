# blockchain-vehicle
A Blockchain-based vehicle tracking system 

This project is an initiative towards vehicle tracking system in Saudi Arabia via Permissioned Blockchain system. It will include vehicle tracking from manufacturing till the real-time tracking of vehicles.

## How it looks

![alt tag](https://github.com/toqeer/blockchain-vehicle/blob/master/frontend/doc.gif)

---

## Installation 

This prototype is linux dependent. (recomended distro Ubuntu 16.04,18.04)

### Pre-requisites
* Hyperledger Composer
* Node-JS v10 or later than v10

### Installing/running network
considering you have installed pre-requisites.

##### Initiating blockchain network
```
cd ~/fabric-dev-servers export FABRIC_VERSION=hlfv12 ./startFabric.sh ./createPeerAdminCard.sh
```
##### Insalling Vehicle network
```
cd ~/chaincode-model
composer network install --card PeerAdmin@hlfv1 --archiveFile vehicle@[latest].bna
composer network start --networkName tutorial-network --networkVersion 0.0.1 --networkAdmin admin --networkAdminEnrollSecret adminpw --card PeerAdmin@hlfv1 --file networkadmin.card
composer card import --file networkadmin.card
composer-rest-server
```
starting restfull service
```
cd ~/restFullServer
npm install
node service.js
```
##### Installing Frontend
```
cd ~/frontend
npm install
npm start
```
Runs the app in the development mode.  
Open http://localhost:3000 to view it in the browser.  
More details regarding frontend can be found [here](https://github.com/toqeer/blockchain-vehicle/tree/master/frontend)