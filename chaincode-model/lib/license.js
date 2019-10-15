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


/**
 * Place an order for a vehicle
 * @param {org.ksa.vehicle.ministory.PlaceLicenseOrder} placeLicenseOrder - the PlaceLicenseOrder transaction
 * @transaction
 */
async function placeLicenseOrder(placeLicenseOrder) { // eslint-disable-line no-unused-vars
    console.log('placeLicenseOrder');

    const factory = getFactory();
    //const NS_M = 'org.ksa.vehicle.ministory';
    //const NS = 'org.ksa.vehicle';

    const order = factory.newResource('org.ksa.vehicle.ministory', 'LicenseOrder', placeLicenseOrder.orderId);
    order.licenseDetails = placeLicenseOrder.licenseDetails;
    order.licenseOrderStatus = 'REQUESTED';
    //order.manufacturer = placeLicenseOrder.manufacturer;
    //order.ministory = placeLicenseOrder.ministory;
    order.ministory = factory.newRelationship('composer.base', 'Ministory', placeLicenseOrder.ministory.getIdentifier());
    order.orderer = factory.newRelationship('composer.base', 'User', placeLicenseOrder.orderer.getIdentifier());

    // save the order
    const registry = await getAssetRegistry(order.getFullyQualifiedType());
    await registry.add(order);
}

/**
 * Update the status of an order
 * @param {org.ksa.vehicle.ministory.UpdateLicenseOrderStatus} updateLicenseOrderStatus - the UpdateLicenseOrderStatus transaction
 * @transaction
 */
async function updateLicenseOrderStatus(updateLicenseOrderStatus) { // eslint-disable-line no-unused-vars
    console.log('updateLicenseOrderStatus');

    const factory = getFactory();

    // save the new status of the order
    updateLicenseOrderStatus.licenseOrder.licenseOrderStatus = updateLicenseOrderStatus.licenseOrderStatus;

    // get vehicle registry
    const registry = await getAssetRegistry('org.license.License');
    if (updateLicenseOrderStatus.licenseOrderStatus === 'ASSIGNED') {
        const license = factory.newResource('org.license', 'License', updateLicenseOrderStatus.licenseNumber);
        license.licenseDetails = updateLicenseOrderStatus.licenseOrder.licenseDetails;
        license.issueDate = updateLicenseOrderStatus.issueDate;
        license.expiryDate = updateLicenseOrderStatus.expiryDate;
        license.issuer = factory.newRelationship('composer.base', 'Ministory', updateLicenseOrderStatus.ministory.getIdentifier());
        license.owner = factory.newRelationship('composer.base', 'User', updateLicenseOrderStatus.licenseOrder.orderer.getIdentifier());
        //license.licenseDetails.vin = updateLicenseOrderStatus.vin;
        license.licenseStatus = 'ACTIVE';
        return registry.add(license);
    } 
   

    // get order registry
    const orderRegistry = await getAssetRegistry(updateLicenseOrderStatus.licenseOrder.getFullyQualifiedType());
   
    // update order status
    // update order status
    // updateLicenseOrderStatus.order.vehicleDetails.vin = updateLicenseOrderStatus.vin || '';

    // if (!updateLicenseOrderStatus.order.statusUpdates) {
    //     updateLicenseOrderStatus.order.statusUpdates = [];
    // }

    // updateLicenseOrderStatus.order.statusUpdates.push(updateLicenseOrderStatus);

    await orderRegistry.update(updateLicenseOrderStatus.licenseOrder);
}


/**
 * Update the status of an order
 * @param {org.license.CancelLicense} CancelLicense - the CancelLicense transaction
 * @transaction
 */
async function CancelLicense(CancelLicense) { // eslint-disable-line no-unused-vars
    console.log('CancelLicense');

    const factory = getFactory();

    // save the new status of the order
    license = CancelLicense.license;
    license.licenseStatus = 'CANCELLED';
    
    const orderRegistry = await getAssetRegistry(license.getFullyQualifiedType());
   
    // update order status
    // update order status
    // CancelLicense.order.vehicleDetails.vin = CancelLicense.vin || '';

    // if (!CancelLicense.order.statusUpdates) {
    //     CancelLicense.order.statusUpdates = [];
    // }

    // CancelLicense.order.statusUpdates.push(CancelLicense);

    await orderRegistry.update(license);
}