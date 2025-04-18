<template>
    <div class="featured-car-list">
      <div class="header">
        <h2>Featured Cars</h2>
        <div class="actions">
          <button class="btn-add" @click="openAddCarModal">
            <i class="fa fa-plus"></i> Add New Car
          </button>
          <div class="filter">
            <select v-model="filterStatus">
              <option value="all">All</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>
      </div>
  
      <div class="table-container">
        <table class="cars-table">
          <thead>
            <tr>
              <th>Image</th>
              <th @click="sortBy('name')">
                Car Name 
                <i class="fa fa-sort"></i>
              </th>
              <th @click="sortBy('brand')">
                Brand
                <i class="fa fa-sort"></i>
              </th>
              <th @click="sortBy('price')">
                Price
                <i class="fa fa-sort"></i>
              </th>
              <th @click="sortBy('status')">
                Status
                <i class="fa fa-sort"></i>
              </th>
              <th>Featured</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="car in filteredCars" :key="car.id">
              <td>
                <img :src="car.image" :alt="car.name" class="car-thumbnail" />
              </td>
              <td>{{ car.name }}</td>
              <td>{{ car.brand }}</td>
              <td>${{ car.price.toLocaleString() }}</td>
              <td>
                <span :class="['status-badge', car.status]">
                  {{ car.status }}
                </span>
              </td>
              <td>
                <div class="toggle-switch">
                  <input 
                    type="checkbox" 
                    :id="`featured-${car.id}`" 
                    v-model="car.featured"
                    @change="toggleFeatured(car)"
                  />
                  <label :for="`featured-${car.id}`"></label>
                </div>
              </td>
              <td>
                <div class="action-buttons">
                  <button class="btn-edit" @click="editCar(car)">
                    <i class="fa fa-edit"></i>
                  </button>
                  <button class="btn-delete" @click="confirmDelete(car)">
                    <i class="fa fa-trash"></i>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
  
      <div class="pagination">
        <button :disabled="currentPage === 1" @click="currentPage--">
          <i class="fa fa-chevron-left"></i>
        </button>
        <span>Page {{ currentPage }} of {{ totalPages }}</span>
        <button :disabled="currentPage === totalPages" @click="currentPage++">
          <i class="fa fa-chevron-right"></i>
        </button>
      </div>
  
      <!-- Add/Edit Car Modal -->
      <div class="modal" v-if="showModal">
        <div class="modal-content">
          <div class="modal-header">
            <h3>{{ isEditing ? 'Edit Car' : 'Add New Car' }}</h3>
            <button class="close-btn" @click="closeModal">&times;</button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="saveCar">
              <div class="form-group">
                <label for="car-name">Car Name</label>
                <input type="text" id="car-name" v-model="currentCar.name" required />
              </div>
              <div class="form-group">
                <label for="car-brand">Brand</label>
                <select id="car-brand" v-model="currentCar.brand" required>
                  <option value="">Select Brand</option>
                  <option v-for="brand in brands" :key="brand">{{ brand }}</option>
                </select>
              </div>
              <div class="form-group">
                <label for="car-price">Price</label>
                <input type="number" id="car-price" v-model="currentCar.price" required />
              </div>
              <div class="form-group">
                <label for="car-status">Status</label>
                <select id="car-status" v-model="currentCar.status" required>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
              <div class="form-group">
                <label for="car-image">Image URL</label>
                <input type="text" id="car-image" v-model="currentCar.image" required />
                <div class="image-preview" v-if="currentCar.image">
                  <img :src="currentCar.image" alt="Preview" />
                </div>
              </div>
              <div class="form-group checkbox">
                <input type="checkbox" id="car-featured" v-model="currentCar.featured" />
                <label for="car-featured">Featured</label>
              </div>
              <div class="form-actions">
                <button type="button" class="btn-cancel" @click="closeModal">Cancel</button>
                <button type="submit" class="btn-save">Save</button>
              </div>
            </form>
          </div>
        </div>
      </div>
  
      <!-- Delete Confirmation Modal -->
      <div class="modal" v-if="showDeleteModal">
        <div class="modal-content delete-modal">
          <div class="modal-header">
            <h3>Confirm Delete</h3>
            <button class="close-btn" @click="showDeleteModal = false">&times;</button>
          </div>
          <div class="modal-body">
            <p>Are you sure you want to delete <strong>{{ carToDelete?.name }}</strong>?</p>
            <p class="warning">This action cannot be undone.</p>
            <div class="form-actions">
              <button class="btn-cancel" @click="showDeleteModal = false">Cancel</button>
              <button class="btn-delete" @click="deleteCar">Delete</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'FeaturedCarList',
    data() {
      return {
        cars: [
          {
            id: 1,
            name: 'Model S',
            brand: 'Tesla',
            price: 89990,
            status: 'active',
            featured: true,
            image: '/images/cars/tesla-model-s.jpg'
          },
          {
            id: 2,
            name: 'Mustang GT',
            brand: 'Ford',
            price: 55995,
            status: 'active',
            featured: true,
            image: '/images/cars/ford-mustang.jpg'
          },
          {
            id: 3,
            name: 'A8',
            brand: 'Audi',
            price: 86500,
            status: 'active',
            featured: false,
            image: '/images/cars/audi-a8.jpg'
          },
          {
            id: 4,
            name: '911 Carrera',
            brand: 'Porsche',
            price: 101200,
            status: 'active',
            featured: true,
            image: '/images/cars/porsche-911.jpg'
          },
          {
            id: 5,
            name: 'Range Rover',
            brand: 'Land Rover',
            price: 92000,
            status: 'inactive',
            featured: false,
            image: '/images/cars/range-rover.jpg'
          }
        ],
        brands: ['Audi', 'BMW', 'Ford', 'Honda', 'Land Rover', 'Mercedes', 'Porsche', 'Tesla', 'Toyota'],
        currentPage: 1,
        itemsPerPage: 10,
        sortKey: 'name',
        sortDirection: 'asc',
        filterStatus: 'all',
        showModal: false,
        isEditing: false,
        currentCar: {},
        showDeleteModal: false,
        carToDelete: null
      };
    },
    computed: {
      filteredCars() {
        let result = [...this.cars];
        
        // Filter by status
        if (this.filterStatus !== 'all') {
          result = result.filter(car => car.status === this.filterStatus);
        }
        
        // Sort
        result.sort((a, b) => {
          let modifier = this.sortDirection === 'asc' ? 1 : -1;
          if (a[this.sortKey] < b[this.sortKey]) return -1 * modifier;
          if (a[this.sortKey] > b[this.sortKey]) return 1 * modifier;
          return 0;
        });
        
        return result;
      },
      totalPages() {
        return Math.ceil(this.filteredCars.length / this.itemsPerPage);
      }
    },
    methods: {
      sortBy(key) {
        if (this.sortKey === key) {
          this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
        } else {
          this.sortKey = key;
          this.sortDirection = 'asc';
        }
      },
      toggleFeatured(car) {
        // In a real app, you'd make an API call here
        console.log(`Car ${car.id} featured status changed to: ${car.featured}`);
      },
      openAddCarModal() {
        this.isEditing = false;
        this.currentCar = {
          name: '',
          brand: '',
          price: 0,
          status: 'active',
          featured: false,
          image: ''
        };
        this.showModal = true;
      },
      editCar(car) {
        this.isEditing = true;
        this.currentCar = { ...car };
        this.showModal = true;
      },
      closeModal() {
        this.showModal = false;
        this.currentCar = {};
      },
      saveCar() {
        if (this.isEditing) {
          // Update existing car
          const index = this.cars.findIndex(car => car.id === this.currentCar.id);
          if (index !== -1) {
            this.cars[index] = { ...this.currentCar };
          }
        } else {
          // Add new car
          const newId = Math.max(...this.cars.map(car => car.id)) + 1;
          this.cars.push({
            ...this.currentCar,
            id: newId
          });
        }
        this.closeModal();
      },
      confirmDelete(car) {
        this.carToDelete = car;
        this.showDeleteModal = true;
      },
      deleteCar() {
        if (this.carToDelete) {
          this.cars = this.cars.filter(car => car.id !== this.carToDelete.id);
          this.showDeleteModal = false;
          this.carToDelete = null;
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .featured-car-list {
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    padding: 20px;
  }
  
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }
  
  .header h2 {
    font-size: 1.5rem;
    color: #333;
    margin: 0;
  }
  
  .actions {
    display: flex;
    gap: 10px;
  }
  
  .btn-add {
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 4px;
    padding: 8px 16px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 5px;
  }
  
  .filter select {
    padding: 8px;
    border-radius: 4px;
    border: 1px solid #ddd;
  }
  
  .table-container {
    overflow-x: auto;
  }
  
  .cars-table {
    width: 100%;
    border-collapse: collapse;
  }
  
  .cars-table th, .cars-table td {
    padding: 12px 15px;
    text-align: left;
    border-bottom: 1px solid #eee;
  }
  
  .cars-table th {
    background-color: #f9f9f9;
    cursor: pointer;
    user-select: none;
  }
  
  .car-thumbnail {
    width: 60px;
    height: 40px;
    object-fit: cover;
    border-radius: 4px;
  }
  
  .status-badge {
    padding: 4px 8px;
    border-radius: 12px;
    font-size: 0.8rem;
    text-transform: capitalize;
  }
  
  .status-badge.active {
    background-color: #e8f5e9;
    color: #2e7d32;
  }
  
  .status-badge.inactive {
    background-color: #ffebee;
    color: #c62828;
  }
  
  .toggle-switch {
    position: relative;
    display: inline-block;
    width: 40px;
    height: 20px;
  }
  
  .toggle-switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }
  
  .toggle-switch label {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    transition: .4s;
    border-radius: 20px;
  }
  
  .toggle-switch label:before {
    position: absolute;
    content: "";
    height: 16px;
    width: 16px;
    left: 2px;
    bottom: 2px;
    background-color: white;
    transition: .4s;
    border-radius: 50%;
  }
  
  .toggle-switch input:checked + label {
    background-color: #2196F3;
  }
  
  .toggle-switch input:checked + label:before {
    transform: translateX(20px);
  }
  
  .action-buttons {
    display: flex;
    gap: 5px;
  }
  
  .btn-edit, .btn-delete {
    background: none;
    border: none;
    cursor: pointer;
    padding: 5px;
    border-radius: 4px;
  }
  
  .btn-edit {
    color: #2196F3;
  }
  
  .btn-delete {
    color: #f44336;
  }
  
  .pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    gap: 10px;
  }
  
  .pagination button {
    background: none;
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 5px 10px;
    cursor: pointer;
  }
  
  .pagination button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  /* Modal styles */
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
  }
  
  .modal-content {
    background-color: #fff;
    border-radius: 8px;
    width: 500px;
    max-width: 90%;
    max-height: 90vh;
    overflow-y: auto;
  }
  
  .delete-modal {
    width: 400px;
  }
  
  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 20px;
    border-bottom: 1px solid #eee;
  }
  
  .modal-header h3 {
    margin: 0;
    color: #333;
  }
  
  .close-btn {
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    color: #999;
  }
  
  .modal-body {
    padding: 20px;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  .form-group label {
    display: block;
    margin-bottom: 5px;
    font-weight: 500;
  }
  
  .form-group input, .form-group select {
    width: 100%;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
  
  .form-group.checkbox {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  
  .form-group.checkbox input {
    width: auto;
  }
  
  .image-preview {
    margin-top: 10px;
  }
  
  .image-preview img {
    max-width: 100%;
    max-height: 150px;
    border-radius: 4px;
  }
  
  .form-actions {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    margin-top: 20px;
  }
  
  .btn-cancel {
    background-color: #f5f5f5;
    border: 1px solid #ddd;
    padding: 8px 16px;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .btn-save {
    background-color: #2196F3;
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .warning {
    color: #f44336;
    font-style: italic;
  }
  </style>