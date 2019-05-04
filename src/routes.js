import loadable from '@loadable/component'

const Home = loadable(() => import('./pages/Home/Home'))
const Services = loadable(() => import('./pages/Services/Services'))
const About = loadable(() => import('./pages/About/About'))
const NotFound = loadable(() => import('./pages/NotFound/NotFound'))

const routes = [
  {
    path: '/',
    component: Home,
    name: 'Home',
    exact: true
  },
  {
    path: '/services',
    component: Services,
    name: 'Services',
    exact: true
  },
  {
    path: '/about',
    component: About,
    name: 'About',
    exact: true
  },
  {
    path: '*',
    component: NotFound,
    status: 404
  }
]

export default routes
