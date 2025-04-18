<template>
  <div class="navbar">
    <div class="navbar-left">
      <h2 class="page-title">{{ pageTitle }}</h2>
    </div>
    
    <div class="navbar-right">
      <div class="search-bar">
        <input 
          type="text" 
          v-model="globalSearch" 
          placeholder="Поиск по всему сайту..."
          @input="performGlobalSearch"
        >
        <i class="fas fa-search search-icon"></i>
      </div>
      
      <div class="notifications">
        <button class="icon-btn" @click="toggleNotifications">
          <i class="fas fa-bell"></i>
          <span class="badge" v-if="notificationsCount > 0">{{ notificationsCount }}</span>
        </button>
        
        <div class="dropdown" v-if="showNotifications">
          <div class="dropdown-header">
            <h3>Уведомления</h3>
            <button class="mark-all-btn" @click="markAllAsRead">
              Прочитать все
            </button>
          </div>
          
          <div class="notifications-list" v-if="notifications.length > 0">
            <div 
              v-for="notification in notifications" 
              :key="notification.id"
              class="notification-item"
              :class="{ 'unread': !notification.read }"
            >
              <div class="notification-icon">
                <i :class="notification.icon"></i>
              </div>
              <div class="notification-content">
                <div class="notification-title">{{ notification.title }}</div>
                <div class="notification-text">{{ notification.text }}</div>
                <div class="notification-time">{{ notification.time }}</div>
              </div>
            </div>
          </div>
          
          <div class="empty-notifications" v-else>
            Нет новых уведомлений
          </div>
        </div>
      </div>
      
      <div class="user-menu">
        <button class="user-btn" @click="toggleUserMenu">
          <div class="user-avatar">
            <i class="fas fa-user"></i>
          </div>
          <span class="user-name">Администратор</span>
          <i class="fas fa-chevron-down"></i>
        </button>
        
        <div class="dropdown" v-if="showUserMenu">
          <div class="dropdown-item">
            <i class="fas fa-user-circle"></i>
            <span>Профиль</span>
          </div>
          <div class="dropdown-item">
            <i class="fas fa-cog"></i>
            <span>Настройки</span>
          </div>
          <div class="dropdown-divider"></div>
          <div class="dropdown-item">
            <i class="fas fa-sign-out-alt"></i>
            <span>Выйти</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
  data() {
    return {
      globalSearch: '',
      showNotifications: false,
      showUserMenu: false,
      notifications: [
        {
          id: 1,
          title: 'Новый автомобиль',
          text: 'Toyota Camry добавлен в базу',
          time: '1 час назад',
          read: false,
          icon: 'fas fa-car'
        },
        {
          id: 2,
          title: 'Обновление системы',
          text: 'Установлена новая версия системы',
          time: '3 часа назад',
          read: true,
          icon: 'fas fa-sync'
        },
        {
          id: 3,
          title: 'Выгрузка на Auto.ru',
          text: 'Автомобили успешно выгружены',
          time: '5 часов назад',
          read: false,
          icon: 'fas fa-upload'
        }
      ]
    };
  },
  computed: {
    pageTitle() {
      // This could be more dynamic based on the current route
      const routeMap = {
        '/': 'Склад автомобилей',
        '/featured': 'Витрина авто',
        '/promotions': 'Акции и услуги',
        '/news': 'Новости',
        '/analytics': 'Аналитика',
        '/settings': 'Настройки',
        '/cars/new': 'Добавление автомобиля'
      };
      
      // Check if the current route is an edit route
      if (this.$route.path.match(/^\/cars\/\d+$/)) {
        return 'Редактирование автомобиля';
      }
      
      return routeMap[this.$route.path] || 'Панель управления';
    },
    notificationsCount() {
      return this.notifications.filter(n => !n.read).length;
    }
  },
  methods: {
    performGlobalSearch() {
      // Global search implementation
      console.log('Searching for:', this.globalSearch);
    },
    toggleNotifications() {
      this.showNotifications = !this.showNotifications;
      if (this.showNotifications) {
        this.showUserMenu = false;
      }
    },
    toggleUserMenu() {
      this.showUserMenu = !this.showUserMenu;
      if (this.showUserMenu) {
        this.showNotifications = false;
      }
    },
    markAllAsRead() {
      this.notifications.forEach(notification => {
        notification.read = true;
      });
    }
  },
  created() {
    // Close dropdowns when clicking outside
    document.addEventListener('click', (e) => {
      const notifications = this.$el.querySelector('.notifications');
      const userMenu = this.$el.querySelector('.user-menu');
      
      if (notifications && !notifications.contains(e.target)) {
        this.showNotifications = false;
      }
      
      if (userMenu && !userMenu.contains(e.target)) {
        this.showUserMenu = false;
      }
    });
  }
};
</script>

<style scoped>
.navbar {
  background-color: white;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.navbar-left {
  display: flex;
  align-items: center;
}

.page-title {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
}

.navbar-right {
  display: flex;
  align-items: center;
  gap: 20px;
}

.search-bar {
  position: relative;
}

.search-bar input {
  padding: 8px 12px 8px 32px;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 200px;
  transition: width 0.3s;
}

.search-bar input:focus {
  width: 300px;
  outline: none;
  border-color: #1976d2;
}

.search-icon {
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: #757575;
}

.notifications, .user-menu {
  position: relative;
}

.icon-btn {
  background: none;
  border: none;
  font-size: 18px;
  color: #424242;
  cursor: pointer;
  position: relative;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: background-color 0.2s;
}

.icon-btn:hover {
  background-color: #f5f5f5;
}

.badge {
  position: absolute;
  top: 0;
  right: 0;
  background-color: #f44336;
  color: white;
  font-size: 10px;
  font-weight: bold;
  min-width: 16px;
  height: 16px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 4px;
}

.user-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.user-btn:hover {
  background-color: #f5f5f5;
}

.user-avatar {
  width: 32px;
  height: 32px;
  background-color: #1976d2;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.user-name {
  font-weight: 500;
}

.dropdown {
  position: absolute;
  top: 100%;
  right: 0;
  width: 300px;
  background-color: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  z-index: 100;
  margin-top: 8px;
}

.dropdown-header {
  padding: 12px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #eee;
}

.dropdown-header h3 {
  margin: 0;
  font-size: 16px;
}

.mark-all-btn {
  background: none;
  border: none;
  color: #1976d2;
  cursor: pointer;
  font-size: 12px;
}

.mark-all-btn:hover {
  text-decoration: underline;
}

.notifications-list {
  max-height: 300px;
  overflow-y: auto;
}

.notification-item {
  display: flex;
  gap: 12px;
  padding: 12px 16px;
  border-bottom: 1px solid #eee;
  cursor: pointer;
}

.notification-item:hover {
  background-color: #f9f9f9;
}

.notification-item.unread {
  background-color: #e3f2fd;
}

.notification-icon {
  width: 40px;
  height: 40px;
  background-color: #f5f5f5;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #1976d2;
}

.notification-content {
  flex: 1;
}

.notification-title {
  font-weight: 500;
  font-size: 14px;
}

.notification-text {
  font-size: 12px;
  color: #757575;
  margin: 4px 0;
}

.notification-time {
  font-size: 11px;
  color: #9e9e9e;
}

.empty-notifications {
  padding: 20px;
  text-align: center;
  color: #757575;
  font-size: 14px;
}

.dropdown-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 16px;
  cursor: pointer;
}

.dropdown-item:hover {
  background-color: #f5f5f5;
}

.dropdown-divider {
  height: 1px;
  background-color: #eee;
  margin: 4px 0;
}
</style>