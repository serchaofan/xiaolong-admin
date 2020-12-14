import request from '../utils/request';

export function getNamespacesList() {
  return request({
    url: '/api/namespaces',
    method: 'get',
    baseURL: 'http://127.0.0.1:8000'
  })
}

export function getNodesList() {
  return request({
    url: '/api/nodes',
    method: 'get',
    baseURL: 'http://127.0.0.1:8000'
  })
}

export function getPodsList(params) {
  return request({
    url: '/api/pods',
    method: 'get',
    params,
    baseURL: 'http://127.0.0.1:8000'
  })
}

export function getDeploymentsList(params) {
  return request({
    url: '/api/deployments',
    method: 'get',
    params,
    baseURL: 'http://127.0.0.1:8000'
  })
}

export function getDaemonsetsList(params) {
  return request({
    url: '/api/daemonsets',
    method: 'get',
    params,
    baseURL: 'http://127.0.0.1:8000'
  })
}

export function getReplicasetsList(params) {
  return request({
    url: '/api/replicasets',
    method: 'get',
    params,
    baseURL: 'http://127.0.0.1:8000'
  })
}

export function getStatefulsList(params) {
  return request({
    url: '/api/statefulsets',
    method: 'get',
    params,
    baseURL: 'http://127.0.0.1:8000'
  })
}

export function getServicesList(params) {
  console.log(params)
  return request({
    url: '/api/services',
    method: 'get',
    params,
    baseURL: 'http://127.0.0.1:8000'
  })
}

export function getCronjobsList(params) {
  console.log(params)
  return request({
    url: '/api/cronjobs',
    method: 'get',
    params,
    baseURL: 'http://127.0.0.1:8000'
  })
}

export function getJobsList(params) {
  console.log(params)
  return request({
    url: '/api/jobs',
    method: 'get',
    params,
    baseURL: 'http://127.0.0.1:8000'
  })
}
