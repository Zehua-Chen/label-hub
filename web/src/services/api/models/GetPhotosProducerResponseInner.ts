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
 * @interface GetPhotosProducerResponseInner
 */
export interface GetPhotosProducerResponseInner {
    /**
     * 
     * @type {number}
     * @memberof GetPhotosProducerResponseInner
     */
    amount?: number;
    /**
     * 
     * @type {string}
     * @memberof GetPhotosProducerResponseInner
     */
    filename?: string;
    /**
     * 
     * @type {string}
     * @memberof GetPhotosProducerResponseInner
     */
    time?: string;
    /**
     * 
     * @type {Array<string>}
     * @memberof GetPhotosProducerResponseInner
     */
    tags?: Array<string>;
}

/**
 * Check if a given object implements the GetPhotosProducerResponseInner interface.
 */
export function instanceOfGetPhotosProducerResponseInner(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function GetPhotosProducerResponseInnerFromJSON(json: any): GetPhotosProducerResponseInner {
    return GetPhotosProducerResponseInnerFromJSONTyped(json, false);
}

export function GetPhotosProducerResponseInnerFromJSONTyped(json: any, ignoreDiscriminator: boolean): GetPhotosProducerResponseInner {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'amount': !exists(json, 'amount') ? undefined : json['amount'],
        'filename': !exists(json, 'filename') ? undefined : json['filename'],
        'time': !exists(json, 'time') ? undefined : json['time'],
        'tags': !exists(json, 'tags') ? undefined : json['tags'],
    };
}

export function GetPhotosProducerResponseInnerToJSON(value?: GetPhotosProducerResponseInner | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'amount': value.amount,
        'filename': value.filename,
        'time': value.time,
        'tags': value.tags,
    };
}

