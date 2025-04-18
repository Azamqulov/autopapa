// src/store/modules/cars.js
export default {
    namespaced: true,
  
    state: {
      cars: [],
      loading: false,
      error: null
    },
  
    getters: {
      getAllCars: state => state.cars,
      getCarById: state => id => state.cars.find(car => car.id === id),
      getWhiteFeaturedCars: state => state.cars.filter(car => car.isFeaturedWhite),
      getBlueFeaturedCars: state => state.cars.filter(car => car.isFeaturedBlue),
      isLoading: state => state.loading,
      hasError: state => !!state.error,
      getError: state => state.error
    },
  
    mutations: {
      SET_LOADING(state, status) {
        state.loading = status;
      },
      SET_ERROR(state, error) {
        state.error = error;
      },
      SET_CARS(state, cars) {
        state.cars = cars;
      },
      ADD_CAR(state, car) {
        state.cars.push(car);
      },
      UPDATE_CAR(state, updatedCar) {
        const index = state.cars.findIndex(car => car.id === updatedCar.id);
        if (index !== -1) {
          state.cars.splice(index, 1, updatedCar);
        }
      },
      DELETE_CAR(state, carId) {
        state.cars = state.cars.filter(car => car.id !== carId);
      },
      TOGGLE_FEATURE(state, { car, type }) {
        const index = state.cars.findIndex(c => c.id === car.id);
        if (index !== -1) {
          if (type === 'white') {
            state.cars[index].isFeaturedWhite = !state.cars[index].isFeaturedWhite;
          } else if (type === 'blue') {
            state.cars[index].isFeaturedBlue = !state.cars[index].isFeaturedBlue;
          }
        }
      }
    },
  
    actions: {
      async fetchCars({ commit }) {
        commit('SET_LOADING', true);
        commit('SET_ERROR', null);
        
        try {
          // In a real implementation, this would be an API call
          // For now, we'll use mock data
          const response = await new Promise(resolve => {
            setTimeout(() => {
              resolve([
                {
                  id: 1,
                  make: 'Toyota',
                  model: 'Camry',
                  year: 2022,
                  color: 'Белый',
                  engineVolume: 2.5,
                  horsePower: 200,
                  engineType: 'petrol',
                  transmission: 'automatic',
                  driveType: 'front',
                  mileage: 15000,
                  price: 2500000,
                  condition: 'used',
                  isActive: true,
                  isFeaturedWhite: true,
                  isFeaturedBlue: false,
                  exportToAutoRu: true,
                  exportToAvito: true,
                  exportToDrom: false,
                  vin: 'JTD3456789012345',
                  licensePlate: 'A123BC777',
                  ptsNumber: '77УЕ123456',
                  ptsDate: '2022-05-10',
                  stsNumber: '9912345678',
                  stsDate: '2022-05-10',
                  ownersCount: 1,
                  customsClearance: 'yes',
                  description: 'Отличный автомобиль в идеальном состоянии. Один владелец, полный комплект документов.',
                  descriptionAutoruAvito: 'Toyota Camry 2022. Один владелец. Сервисная книжка. Без ДТП.',
                  descriptionDrom: 'Продается Toyota Camry 2022 года. В отличном состоянии.',
                  photos: [
                    'https://via.placeholder.com/800x600.png?text=Toyota+Camry+1',
                    'https://via.placeholder.com/800x600.png?text=Toyota+Camry+2',
                    'https://via.placeholder.com/800x600.png?text=Toyota+Camry+3'
                  ]
                },
                {
                  id: 2,
                  make: 'BMW',
                  model: 'X5',
                  year: 2021,
                  color: 'Черный',
                  engineVolume: 3.0,
                  horsePower: 249,
                  engineType: 'diesel',
                  transmission: 'automatic',
                  driveType: 'full',
                  mileage: 25000,
                  price: 5500000,
                  condition: 'used',
                  isActive: true,
                  isFeaturedWhite: false,
                  isFeaturedBlue: true,
                  exportToAutoRu: true,
                  exportToAvito: false,
                  exportToDrom: true,
                  vin: 'WBA12345678901234',
                  licensePlate: 'Е777КХ799',
                  ptsNumber: '77УН654321',
                  ptsDate: '2021-06-15',
                  stsNumber: '9987654321',
                  stsDate: '2021-06-15',
                  ownersCount: 2,
                  customsClearance: 'yes',
                  description: 'BMW X5 в отличном состоянии. Дизельный двигатель, полный привод.',
                  descriptionAutoruAvito: 'BMW X5 2021 года. Дизель, полный привод. Два владельца.',
                  descriptionDrom: 'Продается BMW X5 2021 года выпуска.',
                  photos: [
                    'https://via.placeholder.com/800x600.png?text=BMW+X5+1',
                    'https://via.placeholder.com/800x600.png?text=BMW+X5+2',
                  ]
                }
              ]);
            }, 500);
          });
          
          commit('SET_CARS', response);
        } catch (error) {
          commit('SET_ERROR', error.message || 'Failed to fetch cars');
          console.error(error);
        } finally {
          commit('SET_LOADING', false);
        }
      },
      
      async fetchCar({ commit, state }, carId) {
        commit('SET_LOADING', true);
        commit('SET_ERROR', null);
        
        try {
          // First check if car exists in state
          const existingCar = state.cars.find(car => car.id == carId);
          if (existingCar) {
            return existingCar;
          }
          
          // Otherwise fetch from API (mock)
          const response = await new Promise(resolve => {
            setTimeout(() => {
              resolve({
                id: carId,
                make: 'Toyota',
                model: 'Camry',
                year: 2022,
                color: 'Белый',
                engineVolume: 2.5,
                horsePower: 200,
                engineType: 'petrol',
                transmission: 'automatic',
                driveType: 'front',
                mileage: 15000,
                price: 2500000,
                condition: 'used',
                isActive: true,
                isFeaturedWhite: true,
                isFeaturedBlue: false,
                exportToAutoRu: true,
                exportToAvito: true,
                exportToDrom: false,
                vin: 'JTD3456789012345',
                licensePlate: 'A123BC777',
                ptsNumber: '77УЕ123456',
                ptsDate: '2022-05-10',
                stsNumber: '9912345678',
                stsDate: '2022-05-10',
                ownersCount: 1,
                customsClearance: 'yes',
                description: 'Отличный автомобиль в идеальном состоянии. Один владелец, полный комплект документов.',
                descriptionAutoruAvito: 'Toyota Camry 2022. Один владелец. Сервисная книжка. Без ДТП.',
                descriptionDrom: 'Продается Toyota Camry 2022 года. В отличном состоянии.',
                photos: [
                  'https://via.placeholder.com/800x600.png?text=Toyota+Camry+1',
                  'https://via.placeholder.com/800x600.png?text=Toyota+Camry+2',
                  'https://via.placeholder.com/800x600.png?text=Toyota+Camry+3'
                ]
              });
            }, 300);
          });
          
          return response;
        } catch (error) {
          commit('SET_ERROR', error.message || `Failed to fetch car with ID ${carId}`);
          console.error(error);
          return null;
        } finally {
          commit('SET_LOADING', false);
        }
      },
      
      async createCar({ commit }, carData) {
        commit('SET_LOADING', true);
        commit('SET_ERROR', null);
        
        try {
          // In a real implementation, this would be an API call
          const response = await new Promise(resolve => {
            setTimeout(() => {
              // Generate a random ID for the new car
              const newCar = {
                ...carData,
                id: Date.now(),
              };
              resolve(newCar);
            }, 500);
          });
          
          commit('ADD_CAR', response);
          return response;
        } catch (error) {
          commit('SET_ERROR', error.message || 'Failed to create car');
          console.error(error);
          return null;
        } finally {
          commit('SET_LOADING', false);
        }
      },
      
      async updateCar({ commit }, carData) {
        commit('SET_LOADING', true);
        commit('SET_ERROR', null);
        
        try {
          // In a real implementation, this would be an API call
          const response = await new Promise(resolve => {
            setTimeout(() => {
              resolve(carData);
            }, 500);
          });
          
          commit('UPDATE_CAR', response);
          return response;
        } catch (error) {
          commit('SET_ERROR', error.message || `Failed to update car with ID ${carData.id}`);
          console.error(error);
          return null;
        } finally {
          commit('SET_LOADING', false);
        }
      },
      
      async deleteCar({ commit }, carId) {
        commit('SET_LOADING', true);
        commit('SET_ERROR', null);
        
        try {
          // In a real implementation, this would be an API call
          await new Promise(resolve => {
            setTimeout(() => {
              resolve();
            }, 500);
          });
          
          commit('DELETE_CAR', carId);
          return true;
        } catch (error) {
          commit('SET_ERROR', error.message || `Failed to delete car with ID ${carId}`);
          console.error(error);
          return false;
        } finally {
          commit('SET_LOADING', false);
        }
      },
      
      toggleFeature({ commit }, { car, type = 'white' }) {
        commit('TOGGLE_FEATURE', { car, type });
      }
    }
  };