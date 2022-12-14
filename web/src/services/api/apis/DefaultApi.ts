/* tslint:disable */
/* eslint-disable */
/**
 * Api
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 2022-12-20T19:00:42Z
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import * as runtime from '../runtime';
import type {
  GetIncomeResponse,
  GetPhotosProducerResponseInner,
  GetPhotosResponse,
  GetProjectsResponse,
  GetUserInfoResponse,
  PutPhotoRequest,
  PutPhotoResponse,
  PutProjectsRequest,
  PutUserInfoRequest,
} from '../models';
import {
    GetIncomeResponseFromJSON,
    GetIncomeResponseToJSON,
    GetPhotosProducerResponseInnerFromJSON,
    GetPhotosProducerResponseInnerToJSON,
    GetPhotosResponseFromJSON,
    GetPhotosResponseToJSON,
    GetProjectsResponseFromJSON,
    GetProjectsResponseToJSON,
    GetUserInfoResponseFromJSON,
    GetUserInfoResponseToJSON,
    PutPhotoRequestFromJSON,
    PutPhotoRequestToJSON,
    PutPhotoResponseFromJSON,
    PutPhotoResponseToJSON,
    PutProjectsRequestFromJSON,
    PutProjectsRequestToJSON,
    PutUserInfoRequestFromJSON,
    PutUserInfoRequestToJSON,
} from '../models';

export interface DownloadGetRequest {
    projectId: string;
    accessToken: string;
}

export interface IncomeGetRequest {
    accessToken: string;
}

export interface PhotosGetRequest {
    labels: string;
}

export interface PhotosProducerGetRequest {
    accessToken: string;
    amountLow?: string;
    label?: string;
    month?: string;
    amountHigh?: string;
}

export interface PhotosUploadPutRequest {
    putPhotoRequest: PutPhotoRequest;
}

export interface ProjectsGetRequest {
    projectId: string;
    accessToken: string;
}

export interface ProjectsPutRequest {
    accessToken: string;
    putProjectsRequest: PutProjectsRequest;
}

export interface UserinfoGetRequest {
    accessToken: string;
}

export interface UserinfoPutRequest {
    accessToken: string;
    putUserInfoRequest: PutUserInfoRequest;
}

/**
 * 
 */
export class DefaultApi extends runtime.BaseAPI {

    /**
     */
    async buyGetRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // DevelopmentLabelHubBackendApiAuthorizerF478BBAE authentication
        }

        const response = await this.request({
            path: `/buy`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     */
    async buyGet(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.buyGetRaw(initOverrides);
    }

    /**
     */
    async buyOptionsRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/buy`,
            method: 'OPTIONS',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     */
    async buyOptions(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.buyOptionsRaw(initOverrides);
    }

    /**
     */
    async downloadGetRaw(requestParameters: DownloadGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Array<string>>> {
        if (requestParameters.projectId === null || requestParameters.projectId === undefined) {
            throw new runtime.RequiredError('projectId','Required parameter requestParameters.projectId was null or undefined when calling downloadGet.');
        }

        if (requestParameters.accessToken === null || requestParameters.accessToken === undefined) {
            throw new runtime.RequiredError('accessToken','Required parameter requestParameters.accessToken was null or undefined when calling downloadGet.');
        }

        const queryParameters: any = {};

        if (requestParameters.projectId !== undefined) {
            queryParameters['project-id'] = requestParameters.projectId;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (requestParameters.accessToken !== undefined && requestParameters.accessToken !== null) {
            headerParameters['access-token'] = String(requestParameters.accessToken);
        }

        const response = await this.request({
            path: `/download`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse<any>(response);
    }

    /**
     */
    async downloadGet(requestParameters: DownloadGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<string>> {
        const response = await this.downloadGetRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async downloadOptionsRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/download`,
            method: 'OPTIONS',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     */
    async downloadOptions(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.downloadOptionsRaw(initOverrides);
    }

    /**
     */
    async incomeGetRaw(requestParameters: IncomeGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<GetIncomeResponse>> {
        if (requestParameters.accessToken === null || requestParameters.accessToken === undefined) {
            throw new runtime.RequiredError('accessToken','Required parameter requestParameters.accessToken was null or undefined when calling incomeGet.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (requestParameters.accessToken !== undefined && requestParameters.accessToken !== null) {
            headerParameters['access-token'] = String(requestParameters.accessToken);
        }

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // DevelopmentLabelHubBackendApiAuthorizerF478BBAE authentication
        }

        const response = await this.request({
            path: `/income`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => GetIncomeResponseFromJSON(jsonValue));
    }

    /**
     */
    async incomeGet(requestParameters: IncomeGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<GetIncomeResponse> {
        const response = await this.incomeGetRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async incomeOptionsRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/income`,
            method: 'OPTIONS',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     */
    async incomeOptions(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.incomeOptionsRaw(initOverrides);
    }

    /**
     */
    async photosGetRaw(requestParameters: PhotosGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<GetPhotosResponse>> {
        if (requestParameters.labels === null || requestParameters.labels === undefined) {
            throw new runtime.RequiredError('labels','Required parameter requestParameters.labels was null or undefined when calling photosGet.');
        }

        const queryParameters: any = {};

        if (requestParameters.labels !== undefined) {
            queryParameters['labels'] = requestParameters.labels;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // DevelopmentLabelHubBackendApiAuthorizerF478BBAE authentication
        }

        const response = await this.request({
            path: `/photos`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => GetPhotosResponseFromJSON(jsonValue));
    }

    /**
     */
    async photosGet(requestParameters: PhotosGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<GetPhotosResponse> {
        const response = await this.photosGetRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async photosOptionsRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/photos`,
            method: 'OPTIONS',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     */
    async photosOptions(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.photosOptionsRaw(initOverrides);
    }

    /**
     */
    async photosProducerGetRaw(requestParameters: PhotosProducerGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Array<GetPhotosProducerResponseInner>>> {
        if (requestParameters.accessToken === null || requestParameters.accessToken === undefined) {
            throw new runtime.RequiredError('accessToken','Required parameter requestParameters.accessToken was null or undefined when calling photosProducerGet.');
        }

        const queryParameters: any = {};

        if (requestParameters.amountLow !== undefined) {
            queryParameters['amount-low'] = requestParameters.amountLow;
        }

        if (requestParameters.label !== undefined) {
            queryParameters['label'] = requestParameters.label;
        }

        if (requestParameters.month !== undefined) {
            queryParameters['month'] = requestParameters.month;
        }

        if (requestParameters.amountHigh !== undefined) {
            queryParameters['amount-high'] = requestParameters.amountHigh;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (requestParameters.accessToken !== undefined && requestParameters.accessToken !== null) {
            headerParameters['access-token'] = String(requestParameters.accessToken);
        }

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // DevelopmentLabelHubBackendApiAuthorizerF478BBAE authentication
        }

        const response = await this.request({
            path: `/photos/producer`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(GetPhotosProducerResponseInnerFromJSON));
    }

    /**
     */
    async photosProducerGet(requestParameters: PhotosProducerGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<GetPhotosProducerResponseInner>> {
        const response = await this.photosProducerGetRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async photosProducerOptionsRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/photos/producer`,
            method: 'OPTIONS',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     */
    async photosProducerOptions(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.photosProducerOptionsRaw(initOverrides);
    }

    /**
     */
    async photosUploadOptionsRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/photos/upload`,
            method: 'OPTIONS',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     */
    async photosUploadOptions(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.photosUploadOptionsRaw(initOverrides);
    }

    /**
     */
    async photosUploadPutRaw(requestParameters: PhotosUploadPutRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<PutPhotoResponse>> {
        if (requestParameters.putPhotoRequest === null || requestParameters.putPhotoRequest === undefined) {
            throw new runtime.RequiredError('putPhotoRequest','Required parameter requestParameters.putPhotoRequest was null or undefined when calling photosUploadPut.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // DevelopmentLabelHubBackendApiAuthorizerF478BBAE authentication
        }

        const response = await this.request({
            path: `/photos/upload`,
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
            body: PutPhotoRequestToJSON(requestParameters.putPhotoRequest),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => PutPhotoResponseFromJSON(jsonValue));
    }

    /**
     */
    async photosUploadPut(requestParameters: PhotosUploadPutRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<PutPhotoResponse> {
        const response = await this.photosUploadPutRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async projectsGetRaw(requestParameters: ProjectsGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<GetProjectsResponse>> {
        if (requestParameters.projectId === null || requestParameters.projectId === undefined) {
            throw new runtime.RequiredError('projectId','Required parameter requestParameters.projectId was null or undefined when calling projectsGet.');
        }

        if (requestParameters.accessToken === null || requestParameters.accessToken === undefined) {
            throw new runtime.RequiredError('accessToken','Required parameter requestParameters.accessToken was null or undefined when calling projectsGet.');
        }

        const queryParameters: any = {};

        if (requestParameters.projectId !== undefined) {
            queryParameters['project-id'] = requestParameters.projectId;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (requestParameters.accessToken !== undefined && requestParameters.accessToken !== null) {
            headerParameters['access-token'] = String(requestParameters.accessToken);
        }

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // DevelopmentLabelHubBackendApiAuthorizerF478BBAE authentication
        }

        const response = await this.request({
            path: `/projects`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => GetProjectsResponseFromJSON(jsonValue));
    }

    /**
     */
    async projectsGet(requestParameters: ProjectsGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<GetProjectsResponse> {
        const response = await this.projectsGetRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async projectsOptionsRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/projects`,
            method: 'OPTIONS',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     */
    async projectsOptions(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.projectsOptionsRaw(initOverrides);
    }

    /**
     */
    async projectsPutRaw(requestParameters: ProjectsPutRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.accessToken === null || requestParameters.accessToken === undefined) {
            throw new runtime.RequiredError('accessToken','Required parameter requestParameters.accessToken was null or undefined when calling projectsPut.');
        }

        if (requestParameters.putProjectsRequest === null || requestParameters.putProjectsRequest === undefined) {
            throw new runtime.RequiredError('putProjectsRequest','Required parameter requestParameters.putProjectsRequest was null or undefined when calling projectsPut.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (requestParameters.accessToken !== undefined && requestParameters.accessToken !== null) {
            headerParameters['access-token'] = String(requestParameters.accessToken);
        }

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // DevelopmentLabelHubBackendApiAuthorizerF478BBAE authentication
        }

        const response = await this.request({
            path: `/projects`,
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
            body: PutProjectsRequestToJSON(requestParameters.putProjectsRequest),
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     */
    async projectsPut(requestParameters: ProjectsPutRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.projectsPutRaw(requestParameters, initOverrides);
    }

    /**
     */
    async userinfoGetRaw(requestParameters: UserinfoGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<GetUserInfoResponse>> {
        if (requestParameters.accessToken === null || requestParameters.accessToken === undefined) {
            throw new runtime.RequiredError('accessToken','Required parameter requestParameters.accessToken was null or undefined when calling userinfoGet.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (requestParameters.accessToken !== undefined && requestParameters.accessToken !== null) {
            headerParameters['access-token'] = String(requestParameters.accessToken);
        }

        const response = await this.request({
            path: `/userinfo`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => GetUserInfoResponseFromJSON(jsonValue));
    }

    /**
     */
    async userinfoGet(requestParameters: UserinfoGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<GetUserInfoResponse> {
        const response = await this.userinfoGetRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async userinfoOptionsRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/userinfo`,
            method: 'OPTIONS',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     */
    async userinfoOptions(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.userinfoOptionsRaw(initOverrides);
    }

    /**
     */
    async userinfoPutRaw(requestParameters: UserinfoPutRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.accessToken === null || requestParameters.accessToken === undefined) {
            throw new runtime.RequiredError('accessToken','Required parameter requestParameters.accessToken was null or undefined when calling userinfoPut.');
        }

        if (requestParameters.putUserInfoRequest === null || requestParameters.putUserInfoRequest === undefined) {
            throw new runtime.RequiredError('putUserInfoRequest','Required parameter requestParameters.putUserInfoRequest was null or undefined when calling userinfoPut.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (requestParameters.accessToken !== undefined && requestParameters.accessToken !== null) {
            headerParameters['access-token'] = String(requestParameters.accessToken);
        }

        const response = await this.request({
            path: `/userinfo`,
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
            body: PutUserInfoRequestToJSON(requestParameters.putUserInfoRequest),
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     */
    async userinfoPut(requestParameters: UserinfoPutRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.userinfoPutRaw(requestParameters, initOverrides);
    }

}
