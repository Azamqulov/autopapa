<template>
    <div class="car-list">
      <table>
        <thead>
          <tr>
            <th>Фото</th>
            <th>Марка</th>
            <th>Модель</th>
            <th>Год</th>
            <th>Цена</th>
            <th>VIN</th>
            <th>Статус</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="car in cars" :key="car.id" @dblclick="editCar(car)">
            <td>
              <img v-if="car.photos && car.photos.length" :src="car.photos[0]" alt="Car thumbnail" class="thumbnail">
              <div v-else class="no-image">Нет фото</div>
            </td>
            <td>{{ car.make }}</td>
            <td>{{ car.model }}</td>
            <td>{{ car.year }}</td>
            <td>{{ formatPrice(car.price) }}</td>
            <td>{{ car.vin }}</td>
            <td>
              <span class="status" :class="car.status">{{ getStatusLabel(car.status) }}</span>
            </td>
            <td>
              <div class="actions">
                <button class="edit-btn" @click.stop="editCar(car)" title="Редактировать">
                  <i class="fas fa-edit"></i>
                </button>
                <button class="delete-btn" @click.stop="deleteCar(car)" title="Удалить">
                  <i class="fas fa-trash"></i>
                </button>
                <button 
                  class="feature-btn" 
                  :class="{ featured: car.featured }" 
                  @click.stop="toggleFeatured(car)"
                  title="Добавить на витрину"
                >
                  <i class="fas fa-star"></i>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      
      <div v-if="cars.length === 0" class="no-data">
        Нет автомобилей для отображения
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'CarList',
    props: {
      cars: {
        type: Array,
        required: true
      }
    },
    methods: {
      formatPrice(price) {
        return new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB' }).format(price);
      },
      getStatusLabel(status) {
        const labels = {
          active: 'Активно',
          sold: 'Продано',
          pending: 'Резерв',
          hidden: 'Скрыто'
        };
        return labels[status] || status;
      },
      editCar(car) {
        this.$emit('edit', car);
      },
      deleteCar(car) {
        this.$emit('delete', car);
      },
      toggleFeatured(car) {
        this.$store.dispatch('cars/toggleFeature', car);
      }
    }
  };
  </script>
  
  <style scoped>
  .car-list {
    width: 100%;
    overflow-x: auto;
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
  }
  
  thead {
    background-color: #f5f5f5;
  }
  
  th, td {
    padding: 12px 15px;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }
  
  tr:hover {
    background-color: #f9f9f9;
    cursor: pointer;
  }
  
  .thumbnail {
    width: 80px;
    height: 60px;
    object-fit: cover;
    border-radius: 4px;
  }
  
  .no-image {
    width: 80px;
    height: 60px;
    background-color: #eee;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    color: #999;
    border-radius: 4px;
  }
  
  .status {
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 12px;
    font-weight: bold;
  }
  
  .status.active {
    background-color: #e8f5e9;
    color: #2e7d32;
  }
  
  .status.sold {
    background-color: #ffebee;
    color: #c62828;
  }
  
  .status.pending {
    background-color: #fff8e1;
    color: #f57f17;
  }
  
  .status.hidden {
    background-color: #eceff1;
    color: #546e7a;
  }
  
  .actions {
    display: flex;
    gap: 8px;
  }
  
  .actions button {
    border: none;
    background: none;
    cursor: pointer;
    width: 32px;
    height: 32px;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .edit-btn {
    color: #1976d2;
  }
  
  .delete-btn {
    color: #d32f2f;
  }
  
  .feature-btn {
    color: #757575;
  }
  
  .feature-btn.featured {
    color: #ffc107;
  }
  
  .no-data {
    text-align: center;
    padding: 40px;
    color: #757575;
  }
  </style>