import Vue from 'vue'
import Vuelidate from 'vuelidate'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import 'materialize-css/dist/js/materialize.min'
import dateFilter from "./filters/date.filter"
import messagePlugin from '@/utils/message.plugin'
import firebase from "firebase/app"
import 'firebase/auth'
import 'firebase/database'

Vue.config.productionTip = false
Vue.use(Vuelidate)
Vue.use(messagePlugin)
Vue.filter('date',dateFilter)

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
