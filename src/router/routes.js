import Login from '../views/login/login.vue';
import Layout from '../views/admin/layout/layout.vue';
import Magazine from '../views/admin/magazine/magazine.vue';
import MagazineList from '../views/admin/magazine/magazineList.vue';
import Questions from '../views/admin/questions/questions.vue';
import Me from '../views/admin/me/me.vue';
import AllIcon from '../views/tests/allIcon/allIcon.vue';
import Administrators from '../views/admin/administrators/list.vue';
import EasyH5s from '../views/admin/easyH5s/easyH5s.vue';
import h5Editor from '../views/h5Editor/h5Editor.vue'

// 设置页面元素
const _setElement = (title, next) => {
    document.title = `${title} - 美图移动`;
    if (typeof next === 'function') {
        next();
    }
};

const routes = [
    {
        path: '*',
        component: Login,
        beforeEnter: (to, from, next) => {
            _setElement('主页', next);
        }
    },
    {
        path: '/admin',
        component: Layout,
        children: [
            {
                path: 'me',
                component: Me,
                beforeEnter: (to, from, next) => {
                    _setElement('我的信息', next);
                }
            },
            {
                path: 'list',
                component: Administrators,
                beforeEnter: (to, from, next) => {
                    _setElement('管理员', next);
                }
            },
            {
                path: 'magazine',
                component: Magazine,
                beforeEnter: (to, from, next) => {
                    _setElement('杂志', next);
                },
                children: [
                    {
                        path: 'city/:id',
                        component: MagazineList,
                    }
                ]
            },
            {
                path: 'questions',
                component: Questions,
                beforeEnter: (to, from, next) => {
                    _setElement('问题', next);
                }
            },
            {
                path: 'easy_h5s',
                component: EasyH5s,
                beforeEnter: (to, from, next) => {
                    _setElement('简单H5', next);
                }
            }
        ]
    },
    {
        path: '/h5editor',
        component: h5Editor,
        beforeEnter: (to, from, next) => {
            _setElement('H5制作', next);
        }
    },
    {
        path: '/login',
        component: Login,
        beforeEnter: (to, from, next) => {
            _setElement('登录', next);
        }
    },
    {
        path: '/allicons',
        component: AllIcon,
        beforeEnter: (to, from, next) => {
            _setElement('所有Icons', next);
        }
    }
];

export default routes;
