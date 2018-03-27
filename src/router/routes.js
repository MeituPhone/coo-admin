import Login from '../views/login/login.vue';
import Layout from '../views/admin/layout/layout.vue';
import Magazine from '../views/admin/magazine/magazine.vue';
import Questions from '../views/admin/questions/questions.vue';
import AllIcon from '../views/tests/allIcon/allIcon.vue';

// 设置页面元素
const _setElement = (title, next) => {
    document.title = `${title} - Your Ideas`;
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
                path: 'magazine',
                component: Magazine,
                beforeEnter: (to, from, next) => {
                    _setElement('杂志', next);
                }
            },
            {
                path: 'questions',
                component: Questions,
                beforeEnter: (to, from, next) => {
                    _setElement('问题', next);
                }
            }
        ]
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
