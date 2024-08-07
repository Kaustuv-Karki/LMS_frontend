import { AxiosRequestConfig } from 'axios';
import apiRequest, { axiosClient } from './axiosClient';

const createApiMethod = (method: string) => {
  return async (url: string, data?: any, config?: AxiosRequestConfig) => {
    return apiRequest({
      ...config,
      url,
      method,
      data
    });
  };
};

export const getRequest = createApiMethod('GET');
export const postRequest = createApiMethod('POST');
export const putRequest = createApiMethod('PUT');
export const deleteRequest = createApiMethod('DELETE');
export const patchRequest = createApiMethod('PATCH');

export const getRequestWithParams = async (URL: string, params: any) => {
  return apiRequest({
    url: URL,
    method: 'GET',
    params
  });
};

export const postRequestWithParams = async (
  URL: string,
  params: any,
  data: any
) => {
  return apiRequest({
    url: URL,
    method: 'POST',
    params,
    data
  });
};

export const putRequestWithParams = async (
  URL: string,
  params: any,
  data: any
) => {
  return apiRequest({
    url: URL,
    method: 'PUT',
    params,
    data
  });
};

export const deleteRequestWithParams = async (URL: string, params: any) => {
  return apiRequest({
    url: URL,
    method: 'DELETE',
    params
  });
};

export const patchRequestWithParams = async (
  URL: string,
  params: any,
  data: any
) => {
  return apiRequest({
    url: URL,
    method: 'PATCH',
    params,
    data
  });
};

export async function handleRefreshToken(): Promise<string> {
  try {
    const response = await axiosClient.post('', {});

    // @ts-ignore
    return response.access;
  } catch (error) {
    throw error;
  }
}
