/**
 * Created by WB on 2017/8/22.
 */
import * as types from '../types'

const state = {
    bottom_show:false,
    current_router: null,
    alert_show: false,
    alert_text:null
}

const actions = {
    bottom_handel_show ({commit}){
        commit(types.BOTTOM_SHOW_HANDLE)
    },
    bottom_handel_hide ({commit}){
        commit(types.BUTTOM_HIDE_HANDLE)
    },
    get_current_router ({commit}, value){
        commit(types.CURRENT_ROUTER, value)
    },
    alert_handle_show ({commit}, value){
      commit(types.ALERT_SHOW, value)
    }
}

const mutations = {
    [types.BOTTOM_SHOW_HANDLE](state){
        state.bottom_show = true;
    },
    [types.BUTTOM_HIDE_HANDLE](state){
        state.bottom_show = false;
    },
    [types.CURRENT_ROUTER](state, value){
        state.current_router = value;
    },
    [types.ALERT_SHOW](state, value){
        state.alert_text = value;
        state.alert_show = true;
        let time = setTimeout(function () {
          state.alert_show = false;
          clearTimeout(time);
        }, 1000);
    }
}

export default {
    state,
    actions,
    mutations
}
