/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* global getFactory getAssetRegistry emit query */


/**
 * Transfer a vehicle to another private owner
 * @param {org.vda.VehicleRegister} vehicleRegister - the VehicleRegister transaction
 * @transaction
 */
async function vehicleRegister(vehicleRegister) { // eslint-disable-line no-unused-vars
    console.log('vehicleRegister');

    // const NS = 'org.ksa.vehicle';
    // const NS_D = 'org.vda';
    // const factory = getFactory();

    var factory = getFactory();
// Create a new relationship to the vehicle.
    var vehicle = factory.newResource('org.vda', 'Vehicle', vehicleRegister.vehicle.vIn);
    vehicle.vehicleDetails=vehicleRegister.vehicle.vehicleDetails;
    vehicle.owner = vehicleRegister.vehicle.owner;
    const registry = await getAssetRegistry('org.vda.Vehicle');
    await registry.add(vehicle);
}


/**
 * Transfer a vehicle to another private owner
 * @param {org.vda.VehicleTransfer} vehicleTransfer - the VehicleTransfer transaction
 * @transaction
 */
async function vehicleTransfer(vehicleTransfer) { // eslint-disable-line no-unused-vars
    console.log('vehicleTransfer');

    // const NS = 'org.ksa.vehicle';
    // const NS_D = 'org.vda';
    // const factory = getFactory();

    const seller = vehicleTransfer.seller;
    const buyer = vehicleTransfer.buyer;
    const vehicle = vehicleTransfer.vehicle;

    var factory = getFactory();
// Create a new relationship to the vehicle.
    var transferDetails = factory.newConcept('org.vda', 'TransferDetails');
    vehicle.transferDetails=transferDetails;

    vehicle.transferFlag = 'ACTIVE';
    vehicle.transferDetails.seller = seller;
    vehicle.transferDetails.buyer = buyer;
    vehicle.transferDetails.vehicle = vehicle;
    vehicle.transferDetails.transferStatus = 'SELLER_INITIATED';


    const assetRegistry = await getAssetRegistry('org.vda.Vehicle');
    await assetRegistry.update(vehicle);
}


/**
 * Scrap a vehicle
 * @param {org.vda.VehicleTransferUpdateStatus} vehicleTransferUpdateStatus - the VehicleTransferUpdateStatus transaction
 * @transaction
 */
async function vehicleTransferUpdateStatus(vehicleTransferUpdateStatus) { // eslint-disable-line no-unused-vars
    console.log('vehicleTransferUpdateStatus');
    let vehicle = vehicleTransferUpdateStatus.vehicle;
    
    vehicle.transferDetails.transferStatus= vehicleTransferUpdateStatus.transferStatus;
    const assetRegistry = await getAssetRegistry('org.vda.Vehicle');
    //const vehicle = await assetRegistry.get(vehicleTransferUpdateStatus.vehicle.getIdentifier());
    if(vehicleTransferUpdateStatus.transferStatus=='MINISTORY_APPROVED'){
        vehicle.owner= vehicle.transferDetails.buyer;
        vehicle.transferFlag = 'NOT_ACTIVE';
    }
    
    await assetRegistry.update(vehicle);
}


/**
 * Scrap a vehicle
 * @param {org.vda.VehicleTransferCancel} vehicleTransferCancel - the VehicleTransferCancel transaction
 * @transaction
 */
async function vehicleTransferCancel(vehicleTransferCancel) { // eslint-disable-line no-unused-vars
    console.log('vehicleTransferCancel');
    let vehicle = vehicleTransferCancel.vehicle;
    if(vehicle.transferDetails.transferStatus!='SELLER_INITIATED'){
        throw new Error("Can't cancel, processed Transfer transaction");
    }
    const assetRegistry = await getAssetRegistry('org.vda.Vehicle');
    //const vehicle = await assetRegistry.get(vehicleTransferCancel.vehicle.getIdentifier());
    vehicle.transferFlag = 'NOT_ACTIVE';
    await assetRegistry.update(vehicle);
}


/**
 * Scrap a vehicle
 * @param {org.vda.ScrapVehicle} scrapVehicle - the ScrapVehicle transaction
 * @transaction
 */
async function scrapVehicle(scrapVehicle) { // eslint-disable-line no-unused-vars
    console.log('scrapVehicle');
    let vehicle = scrapVehicle.vehicle;
    const assetRegistry = await getAssetRegistry('org.vda.Vehicle');
    //const vehicle = await assetRegistry.get(scrapVehicle.vehicle.getIdentifier());
    vehicle.vehicleStatus = 'SCRAPPED';
    await assetRegistry.update(vehicle);
}


