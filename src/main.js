import Vue from 'vue'
import Vuelidate from 'vuelidate'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import 'materialize-css/dist/js/materialize.min'
import dateFilter from "./filters/date.filter"
import titlePlugin from "./utils/title.plugin"
import messagePlugin from '@/utils/message.plugin'
import firebase from "firebase/app"
import 'firebase/auth'
import 'firebase/database'
import Loader from '@/components/app/Loader'
import currencyFilter from "./filters/currency.filter"
import localizeFilter from "./filters/localize.filter"
import tooltipDirective from '@/directives/tooltip.directive'
import Paginate from 'vuejs-paginate'
import VueMeta from 'vue-meta'

Vue.component('Paginate', Paginate)
Vue.config.productionTip = false
Vue.use(Vuelidate)
Vue.use(messagePlugin)
Vue.use(titlePlugin)
Vue.use(VueMeta)
Vue.filter('date',dateFilter)
Vue.filter('currency',currencyFilter)
Vue.filter('localize',localizeFilter)
Vue.component('Loader',Loader)
Vue.directive('tooltip',tooltipDirective)

const firebaseConfig = {
  apiKey: "AIzaSyBwdFLQy3ysnFCBpkDDVSztZ9AtmglC6Qw",
  authDomain: "vue-crm-crm.firebaseapp.com",
  databaseURL: "https://vue-crm-crm.firebaseio.com",
  projectId: "vue-crm-crm",
  storageBucket: "vue-crm-crm.appspot.com",
  messagingSenderId: "300902918635",
  appId: "1:300902918635:web:feb79a079cc07b802611ae",
  measurementId: "G-RQ8Z9W82F4"
}

firebase.initializeApp(firebaseConfig)

let app

firebase.auth().onAuthStateChanged(()=>{
  if(!app){
    app=new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})
