import axios from 'axios';

const baseUrl = 'https://bridgei2ipaibackendapp.azurewebsites.net/dataset'

export const getAllProjects = () => {
   return axios.get(`${baseUrl}/NameLookup/filter?KeyType=Project`).then((response) => response.data)
}

export const getProjectDetails = (id) => {
    return  axios.get(`${baseUrl}/Project/filter?ProjectID=${id}`).then(response=> response.data);
}

export const getMilestoneData = (id) => {
    return axios.get(`${baseUrl}/Milestone/filter?ProjectID=${id}`).then((response) => response.data)
}

export const getRiskData = (id) => {
    return axios.get(`${baseUrl}/Risk/filter?ProjectID=${id}`).then((resp) => resp.data)

}

export const getMitigationData = (id) => {
   return axios.get(`${baseUrl}/Mitigation/filter?ProjectID=${id}`).then(response => response.data)
}

export const postProjectData = (data) => {
    return axios.put(`${baseUrl}/project`, data).then((response) => response);

}

export const postMilestone = (data) => {

    return axios.post(`${baseUrl}/milestone`, data).then((resp) => resp);
}

export const postRiskData = (data) => {
    return axios.post(`${baseUrl}/risk`, data).then((resp) => resp);
}

export const putMilestone = (data) => {
    return axios.put(`${baseUrl}/milestone`, data).then((res) => res);
} 

export const putRisk = (data) => {
    return axios.put(`${baseUrl}/risk`, data).then((res) => res);
}

