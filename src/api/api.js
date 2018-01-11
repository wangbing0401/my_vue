/**
 * Created by WB on 2017/8/29.
 */
import axios from 'axios'

const instance = axios.create({
    baseURL: server_url,
    timeout: 1000,
    headers:{'Content-Type': 'application/json', 'Accept': 'application/json'}
});
// 请求拦截器
var that = this;
instance.interceptors.request.use((config) => {
    if(config.method  === 'get'){
        // config.params = qs.stringify(config.params);
        // console.log(config);
    }
    return config;
},(error) =>{
    _.toast("错误的传参", 'fail');
    return Promise.reject(error);
});
//响应拦截器
instance.interceptors.response.use((response) => {
    return response.data;
}, (error) => {
    console.log(error)
});

var api = {
    get_user_list:(data) => instance.get('/get_user_list', {params:data}),
    login:(data) => instance.post('/login', data),
    register:(data) => instance.post('/register', data),
    article_category_list:(data) => instance.get('/article_category_list'),
    add_article:(data) => instance.post('/add_article', data),
    get_article_list:(data) => instance.get('/get_article_list', {params:data}),
    get_article_info:(data) => instance.get('/get_article_info', {params:data}),
    collect_article:(data) => instance.get('/collect_article', {params:data}),
    delete_article:(data) => instance.delete('/delete_article', {params:data}),
    search_article:(data) => instance.get('/search_article', {params:data})
}

export default api
