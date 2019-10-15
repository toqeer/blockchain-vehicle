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

/* global getFactory getAssetRegistry emit */

/**
 * Place an order for a vehicle
 * @param {org.ksa.vehicle.manufacturer.PlaceOrder} placeOrder - the PlaceOrder transaction
 * @transaction
 */
async function placeOrder(placeOrder) { // eslint-disable-line no-unused-vars
    console.log('placeOrder');

    const factory = getFactory();
    //const NS_M = 'org.ksa.vehicle.manufacturer';
    //const NS = 'org.ksa.vehicle';

    const order = factory.newResource('org.ksa.vehicle.manufacturer', 'Order', placeOrder.orderId);
    order.vehicleDetails = placeOrder.vehicleDetails;
    order.orderStatus = 'PLACED';
    order.manufacturer = placeOrder.manufacturer;
    order.orderer = factory.newRelationship('composer.base', 'User', placeOrder.orderer.getIdentifier());

    // save the order
    const registry = await getAssetRegistry(order.getFullyQualifiedType());
    await registry.add(order);
}

/**
 * Update the status of an order
 * @param {org.ksa.vehicle.manufacturer.UpdateOrderStatus} updateOrderStatus - the UpdateOrderStatus transaction
 * @transaction
 */
async function updateOrderStatus(updateOrderStatus) { // eslint-disable-line no-unused-vars
    console.log('updateOrderStatus');

    const factory = getFactory();


    // save the new status of the order
    updateOrderStatus.order.orderStatus = updateOrderStatus.orderStatus;

    // get vehicle registry
    const registry = await getAssetRegistry('org.vda.Vehicle');
    if (updateOrderStatus.orderStatus === 'VIN_ASSIGNED') {
        const vehicle = factory.newResource('org.vda', 'Vehicle', updateOrderStatus.vin);
        vehicle.vehicleDetails = updateOrderStatus.order.vehicleDetails;
        //vehicle.vehicleDetails.vin = updateOrderStatus.vin;
        vehicle.vehicleStatus = 'IN_ACTIVE';
        return registry.add(vehicle);
    } 
    else if (updateOrderStatus.orderStatus === 'OWNER_ASSIGNED') {

        // if (!updateOrderStatus.order.orderer.vehicles) {
        //    updateOrderStatus.order.orderer.vehicles = [];
        // }

        const vehicle = await registry.get(updateOrderStatus.vin);
        //vehicle.vehicleStatus = 'ACTIVE';
        vehicle.owner = updateOrderStatus.order.orderer;
        //vehicle.owner = factory.newRelationship('org.ksa.vehicle', 'PrivateOwner', updateOrderStatus.order.orderer.email);

        await registry.update(vehicle);
    }
    else if (updateOrderStatus.orderStatus === 'DELIVERED') {

        // if (!updateOrderStatus.order.orderer.vehicles) {
        //    updateOrderStatus.order.orderer.vehicles = [];
        // }

        const vehicle = await registry.get(updateOrderStatus.vin);
        vehicle.vehicleStatus = 'ACTIVE';
        //vehicle.owner = updateOrderStatus.order.orderer;
        //vehicle.owner = factory.newRelationship('org.ksa.vehicle', 'PrivateOwner', updateOrderStatus.order.orderer.email);

        await registry.update(vehicle);
    }

    // get order registry
    const orderRegistry = await getAssetRegistry(updateOrderStatus.order.getFullyQualifiedType());
   
    // update order status
    // update order status
    // updateOrderStatus.order.vehicleDetails.vin = updateOrderStatus.vin || '';

    // if (!updateOrderStatus.order.statusUpdates) {
    //     updateOrderStatus.order.statusUpdates = [];
    // }

    // updateOrderStatus.order.statusUpdates.push(updateOrderStatus);

    await orderRegistry.update(updateOrderStatus.order);
}
