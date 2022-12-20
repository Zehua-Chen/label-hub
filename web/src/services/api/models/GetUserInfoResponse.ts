/* tslint:disable */
/* eslint-disable */
/**
 * Api
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 2022-12-20T17:21:20Z
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
/**
 * 
 * @export
 * @interface GetUserInfoResponse
 */
export interface GetUserInfoResponse {
    /**
     * 
     * @type {string}
     * @memberof GetUserInfoResponse
     */
    lastName?: string;
    /**
     * 
     * @type {string}
     * @memberof GetUserInfoResponse
     */
    id?: string;
    /**
     * 
     * @type {string}
     * @memberof GetUserInfoResponse
     */
    title?: string;
    /**
     * 
     * @type {string}
     * @memberof GetUserInfoResponse
     */
    firstName?: string;
    /**
     * 
     * @type {string}
     * @memberof GetUserInfoResponse
     */
    projectID?: string;
    /**
     * 
     * @type {string}
     * @memberof GetUserInfoResponse
     */
    email?: string;
    /**
     * 
     * @type {string}
     * @memberof GetUserInfoResponse
     */
    aboutme?: string;
}

/**
 * Check if a given object implements the GetUserInfoResponse interface.
 */
export function instanceOfGetUserInfoResponse(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function GetUserInfoResponseFromJSON(json: any): GetUserInfoResponse {
    return GetUserInfoResponseFromJSONTyped(json, false);
}

export function GetUserInfoResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): GetUserInfoResponse {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'lastName': !exists(json, 'last_name') ? undefined : json['last_name'],
        'id': !exists(json, 'id') ? undefined : json['id'],
        'title': !exists(json, 'title') ? undefined : json['title'],
        'firstName': !exists(json, 'first_name') ? undefined : json['first_name'],
        'projectID': !exists(json, 'projectID') ? undefined : json['projectID'],
        'email': !exists(json, 'email') ? undefined : json['email'],
        'aboutme': !exists(json, 'aboutme') ? undefined : json['aboutme'],
    };
}

export function GetUserInfoResponseToJSON(value?: GetUserInfoResponse | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'last_name': value.lastName,
        'id': value.id,
        'title': value.title,
        'first_name': value.firstName,
        'projectID': value.projectID,
        'email': value.email,
        'aboutme': value.aboutme,
    };
}

