import Vue from 'vue'
import Router from 'vue-router'
import store from '../vuex_store/store'

Vue.use(Router);

const router = new Router({
  routes:[
    {
      path:'/',
      redirect:'/home'
    },
    {
      path:'/register',
      name:'register',
      component: (resolve) => {
        require(['../pages/Register.vue'], resolve)
      }
    },
    {
      path:'/login',
      name:'login',
      component: (resolve) => {
        require(['../pages/Login.vue'], resolve)
      }
    },
    {
      path:'/home',
      name:'home',
      component: (resolve) => {
        require(['../pages/Home.vue'], resolve)
      }
    },
    {
      path:'/article',
      name:'article',
      component: (resolve) => {
        require(['../pages/Article.vue'], resolve)
      }
    },
    {
      path:'/publish_article',
      name:'publish_article',
      component: (resolve) => {
        require(['../pages/Publish_article.vue'], resolve)
      }
    },
    {
      path:'/article_info/:article_id',
      name:'article_info',
      component: (resolve) => {
        require(['../pages/Article_info.vue'], resolve)
      }
    }
  ]
});
router.beforeEach((to, from, next) => {
  store.dispatch('get_current_router', to.name);
  if (!localStorage.user_id){
    if (to.name != 'login' && to.name != 'register'){
      next('/login')
    }else{
      next()
    }
  }else{
    if (to.name == 'publish_article' || to.name == 'article_info'){
      store.dispatch('bottom_handel_hide')
    }else{
      store.dispatch('bottom_handel_show')
    }
    next()
  }
});
export default router;
