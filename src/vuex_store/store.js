/**
 * Created by WB on 2017/8/22.
 */
import Vue from 'vue'
import Vuex from 'vuex'

import app_all from './modules/app_all'

Vue.use(Vuex)

export default new Vuex.Store({
    modules:{
        app_all
    }
})