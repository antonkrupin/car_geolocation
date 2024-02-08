import { RootState } from ".";

export const fetchCoords = (state: RootState) => state.main.coords;
export const fetchGeolocationAccess = (state: RootState) => state.main.geolocationAccess;
export const fetchPersonalData = (state: RootState) => state.main.personalData;
export const fetchPhone = (state: RootState) => state.main.phone;
export const fetchOrders = (state: RootState) => state.main.orders;
export const fetchError = (state: RootState) => state.main.error;
export const fetchIsModalOpen = (state: RootState) => state.main.isModalOpen;
export const fetchIsLoading = (state: RootState) => state.main.isLoading;