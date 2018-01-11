import Vue from 'vue'
import Router from 'vue-router'
import store from '../vuex_store/store'
import verification_user from '../api/handle_fun'

Vue.use(Router);

const router = new Router({
  routes:[
    {
      path:'/',
      redirect:verification_user.verification_user_equipment.mobile?'/app_home':'/web_home/web_main'
    },
    {
      path:'/register',
      name:'register',
      component: (resolve) => {
        require(['../pages/mobile/Register.vue'], resolve)
      }
    },
    {
      path:'/login',
      name:'login',
      component: (resolve) => {
        require(['../pages/mobile/Login.vue'], resolve)
      }
    },
    {
      path:'/app_home',
      name:'app_home',
      component: (resolve) => {
        require(['../pages/mobile/AppHome.vue'], resolve)
      }
    },
    {
      path:'/article',
      name:'article',
      component: (resolve) => {
        require(['../pages/mobile/Article.vue'], resolve)
      }
    },
    {
      path:'/publish_article',
      name:'publish_article',
      component: (resolve) => {
        require(['../pages/mobile/Publish_article.vue'], resolve)
      }
    },
    {
      path:'/article_info/:article_id',
      name:'article_info',
      component: (resolve) => {
        require(['../pages/mobile/Article_info.vue'], resolve)
      }
    },
    {
      path:'/web_login',
      name:'web_login',
      component: (resolve) => {
        require(['../pages/web/Login.vue'], resolve)
      }
    },
    {
      path:'/web_register',
      name:'web_register',
      component: (resolve) => {
        require(['../pages/web/Register.vue'], resolve)
      }
    },
    {
      path:'/web_home',
      name:'web_home',
      component: (resolve) => {
        require(['../pages/web/WebHome.vue'], resolve)
      },
      children: [
        {
          path:'web_main',
          component: (resolve) => {
            require(['../pages/web/WebMain.vue'], resolve)
          }
        },
        {
          path:'article_info/:article_id',
          component: (resolve) => {
            require(['../pages/web/Article_info.vue'], resolve)
          }
        },
        {
          path:'me_info',
          component: (resolve) => {
            require(['../pages/web/me_info.vue'], resolve)
          }
        }
      ]
    }
  ]
});
router.beforeEach((to, from, next) => {
  store.dispatch('get_current_router', to.name);
  if (!localStorage.user_id){
    if (to.name != 'login' && to.name != 'register' && to.name != 'web_login' && to.name != 'web_register'){
      if (verification_user.verification_user_equipment.mobile){
        next('/login')
      }else {
        next('/web_login')
      }
    }else{
      next()
    }
  }else{
    if (to.name == 'app_home' || to.name == 'article'){
      store.dispatch('bottom_handel_show')
    }else{
      store.dispatch('bottom_handel_hide')
    }
    next()
  }
});
export default router;
