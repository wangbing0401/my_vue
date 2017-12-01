/**
 * Created by WB on 2017/10/24.
 */
import Vue from 'vue'

Vue.filter('article_icon_filter', function (v1, v2) {
    const l = v2.length;
    var select_icon;
    for (let i = 0; i < l; i++){
        if (v1 == v2[i]._id){
            select_icon = v2[i].name;
        }
    }
    switch (select_icon){
        case 'html5':
            return require('../assets/img/html5_icon.png');
            break;
        case 'js':
            return require('../assets/img/js_icon.png');
            break;
        case 'css3':
            return require('../assets/img/css3_icon.png');
            break;
        case 'angular':
            return require('../assets/img/angular_icon.png');
            break;
        case 'vue':
            return require('../assets/img/vue_icon.png');
            break;
        case 'react':
            return require('../assets/img/react_icon.png');
            break;
        case 'node':
          return require('../assets/img/node_icon.png');
          break;
        case 'meteor':
          return require('../assets/img/meteor_icon.png');
          break;
        case 'mongodb':
          return require('../assets/img/mongodb_icon.png');
          break;
        default:
          return require('../assets/img/other_icon.png');
    }
});

Vue.filter('format_date', function (v1) {
    const date = new Date(v1);
    const year = date.getFullYear();
    const month = date.getMonth()+1;
    const day = date.getDate();
    const hour = date.getHours();
    const minu = date.getMinutes();
    return year+'-'+month+'-'+day+' '+hour+':'+minu;
});
