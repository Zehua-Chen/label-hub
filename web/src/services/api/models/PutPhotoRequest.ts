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

import { exists, mapValues } from '../runtime';
/**
 * 
 * @export
 * @interface PutPhotoRequest
 */
export interface PutPhotoRequest {
    /**
     * 
     * @type {string}
     * @memberof PutPhotoRequest
     */
    file?: string;
    /**
     * 
     * @type {string}
     * @memberof PutPhotoRequest
     */
    filename?: string;
    /**
     * 
     * @type {string}
     * @memberof PutPhotoRequest
     */
    idToken?: string;
    /**
     * 
     * @type {Array<string>}
     * @memberof PutPhotoRequest
     */
    labels?: Array<string>;
}

/**
 * Check if a given object implements the PutPhotoRequest interface.
 */
export function instanceOfPutPhotoRequest(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function PutPhotoRequestFromJSON(json: any): PutPhotoRequest {
    return PutPhotoRequestFromJSONTyped(json, false);
}

export function PutPhotoRequestFromJSONTyped(json: any, ignoreDiscriminator: boolean): PutPhotoRequest {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'file': !exists(json, 'file') ? undefined : json['file'],
        'filename': !exists(json, 'filename') ? undefined : json['filename'],
        'idToken': !exists(json, 'id_token') ? undefined : json['id_token'],
        'labels': !exists(json, 'labels') ? undefined : json['labels'],
    };
}

export function PutPhotoRequestToJSON(value?: PutPhotoRequest | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'file': value.file,
        'filename': value.filename,
        'id_token': value.idToken,
        'labels': value.labels,
    };
}

