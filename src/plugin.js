import MonthPicker from './App.vue';


module.exports = {
    install: function (Vue, options) {
      Vue.component('deali-month', MonthPicker);
    }
  };