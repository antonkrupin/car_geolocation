/* eslint-disable import/no-anonymous-default-export */
export default {
	startPage: () => '/',
	geolocationAccess: () => '/geolocationAccess',
	loginPage: () => '/login',
	accessConfirmation: () => '/accessConfirmation',
	personalDataConfirmation: () => '/personalDataConfirmation/:phone',
	freightOrders: () => '/freightOrders/:phone',
	freightOrderDetails: () => '/details/:id',
	freightOrederRegistration: () => '/registration/:id',
	earlyOrderSign: () => '/earlyOrder/:id',
}
