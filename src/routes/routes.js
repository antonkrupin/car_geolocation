/* eslint-disable import/no-anonymous-default-export */
export default {
	startPage: () => '/',
	geolocationAccess: () => '/geolocationAccess',
	loginPage: () => '/login',
	accessConfirmation: () => '/accessConfirmation',
	freightOrders: () => '/freightOrders/:phone',
	freightOrderDetails: () => '/details/:id',
	freightOrederRegistration: () => '/registration/:id',
	earlyOrderSign: () => '/earlyOrder/:id',
}
