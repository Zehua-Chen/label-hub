/* tslint:disable */
/* eslint-disable */
/**
 * Api
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 2022-12-20T01:31:50Z
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
 * @interface GetPhotosRequest
 */
export interface GetPhotosRequest {
    /**
     * 
     * @type {Array<string>}
     * @memberof GetPhotosRequest
     */
    labels?: Array<string>;
}

/**
 * Check if a given object implements the GetPhotosRequest interface.
 */
export function instanceOfGetPhotosRequest(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function GetPhotosRequestFromJSON(json: any): GetPhotosRequest {
    return GetPhotosRequestFromJSONTyped(json, false);
}

export function GetPhotosRequestFromJSONTyped(json: any, ignoreDiscriminator: boolean): GetPhotosRequest {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'labels': !exists(json, 'labels') ? undefined : json['labels'],
    };
}

export function GetPhotosRequestToJSON(value?: GetPhotosRequest | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'labels': value.labels,
    };
}

