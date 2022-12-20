/* tslint:disable */
/* eslint-disable */
/**
 * Api
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 2022-12-20T00:26:39Z
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
 * @interface PutPhotoResponse
 */
export interface PutPhotoResponse {
    /**
     * 
     * @type {string}
     * @memberof PutPhotoResponse
     */
    message?: string;
}

/**
 * Check if a given object implements the PutPhotoResponse interface.
 */
export function instanceOfPutPhotoResponse(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function PutPhotoResponseFromJSON(json: any): PutPhotoResponse {
    return PutPhotoResponseFromJSONTyped(json, false);
}

export function PutPhotoResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): PutPhotoResponse {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'message': !exists(json, 'message') ? undefined : json['message'],
    };
}

export function PutPhotoResponseToJSON(value?: PutPhotoResponse | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'message': value.message,
    };
}

