import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: 'Dashboard', icon: 'dashboard' }
    }]
  },

  {
    path: '/overview',
    component: Layout,
    children: [{
      path: 'overview',
      name: 'overview',
      component: () => import('@/views/dashboard/index'),
      meta: { title: 'Namespace Overview', icon: 'namespace' }
    }]
  },

  {
    path: '/workloads',
    component: Layout,
    meta: { title: 'Workloads', icon: 'workload', breadcrumb: false },
    children: [
      {
        path: 'deployments',
        name: 'deployments',
        component: () => import('@/views/workloads/deployments'),
        meta: { title: 'Deployments' }
      },
      {
        path: 'pods',
        name: 'pods',
        component: () => import('@/views/workloads/pods'),
        meta: { title: 'Pods' }
      },
      {
        path: 'daemonsets',
        name: 'daemonsets',
        component: () => import('@/views/workloads/daemonsets'),
        meta: { title: 'Daemon Sets' }
      },
      {
        path: 'statefulsets',
        name: 'statefulsets',
        component: () => import('@/views/workloads/statefulsets'),
        meta: { title: 'Stateful Sets' }
      },
      {
        path: 'replicasets',
        name: 'replicasets',
        component: () => import('@/views/workloads/replicasets'),
        meta: { title: 'Replica Sets' }
      },
      {
        path: 'cronjobs',
        name: 'cronjobs',
        component: () => import('@/views/dashboard/index'),
        meta: { title: 'Cron Jobs' }
      }
    ]
  },

  {
    path: '/service',
    component: Layout,
    meta: { title: 'Service', icon: 'services', breadcrumb: false },
    children: [
      {
        path: 'services',
        name: 'services',
        component: () => import('@/views/service/services'),
        meta: { title: 'Services' }
      },
      {
        path: 'ingresses',
        name: 'ingresses',
        component: () => import('@/views/dashboard/index'),
        meta: { title: 'Ingresses' }
      },
      {
        path: 'network_policies',
        name: 'network_policies',
        component: () => import('@/views/dashboard/index'),
        meta: { title: 'Network Policies' }
      }
    ]
  },

  {
    path: '/config',
    component: Layout,
    children: [{
      path: 'config',
      name: 'config',
      component: () => import('@/views/dashboard/index'),
      meta: { title: 'Config and Storage', icon: 'storage' }
    }]
  },

  {
    path: '/rbac',
    component: Layout,
    meta: { title: 'RBAC', icon: 'rbac', breadcrumb: false },
    children: [
      {
        path: 'roles',
        name: 'roles',
        component: () => import('@/views/rbac/roles'),
        meta: { title: 'Role' }
      },
      {
        path: 'role',
        name: 'role',
        hidden: true,
        component: () => import('@/views/rbac/role'),
        meta: { title: 'Role' }
      },
      {
        path: 'role_bindings',
        name: 'role_bindings',
        component: () => import('@/views/rbac/role_bindings'),
        meta: { title: 'RoleBinding' }
      },
      {
        path: 'role_binding',
        name: 'role_binding',
        hidden: true,
        component: () => import('@/views/rbac/role_binding'),
        meta: { title: 'RoleBinding' }
      },
      {
        path: 'cluster_roles',
        name: 'cluster_roles',
        component: () => import('@/views/rbac/cluster_roles'),
        meta: { title: 'ClusterRole' }
      },
      {
        path: 'cluster_role',
        name: 'cluster_role',
        hidden: true,
        component: () => import('@/views/rbac/cluster_role'),
        meta: { title: 'ClusterRole' }
      },
      {
        path: 'cluster_role_bindings',
        name: 'cluster_role_bindings',
        component: () => import('@/views/rbac/cluster_role_bindings'),
        meta: { title: 'ClusterRoleBinding' }
      },
      {
        path: 'cluster_role_binding',
        name: 'cluster_role_binding',
        hidden: true,
        component: () => import('@/views/rbac/cluster_role_binding'),
        meta: { title: 'ClusterRoleBinding' }
      },
    ]
  },

  {
    path: '/events',
    component: Layout,
    children: [{
      path: 'events',
      name: 'events',
      component: () => import('@/views/events'),
      meta: { title: 'Events', icon: 'events' }
    }]
  },

  {
    path: '/cluster',
    component: Layout,
    meta: { title: 'Cluster', icon: 'cluster', breadcrumb: false },
    children: [
      {
        path: 'namespaces',
        name: 'namespaces',
        component: () => import('@/views/cluster/namespaces'),
        meta: { title: 'Namespaces' }
      },
      {
        path: 'nodes',
        name: 'nodes',
        component: () => import('@/views/cluster/nodes'),
        meta: { title: 'Nodes' }
      },
      {
        path: 'node',
        name: 'node',
        hidden: true,
        component: () => import('@/views/cluster/node'),
        meta: { title: 'Node' }
      }
    ]
  },

  {
    path: '/cdk8s',
    component: Layout,
    children: [{
      path: 'cdk8s',
      name: 'cdk8s',
      component: () => import('@/views/dashboard/index'),
      meta: { title: 'CDK8S', icon: 'cdk8s' }
    }]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
