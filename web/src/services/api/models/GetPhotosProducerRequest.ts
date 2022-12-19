/* tslint:disable */
/* eslint-disable */
/**
 * Api
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 2022-12-19T22:15:23Z
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
 * @interface GetPhotosProducerRequest
 */
export interface GetPhotosProducerRequest {
    /**
     * 
     * @type {string}
     * @memberof GetPhotosProducerRequest
     */
    filterLabel?: string;
    /**
     * 
     * @type {number}
     * @memberof GetPhotosProducerRequest
     */
    amountHigh?: number;
    /**
     * 
     * @type {string}
     * @memberof GetPhotosProducerRequest
     */
    idtoken?: string;
    /**
     * 
     * @type {string}
     * @memberof GetPhotosProducerRequest
     */
    filterMonth?: string;
    /**
     * 
     * @type {number}
     * @memberof GetPhotosProducerRequest
     */
    amountLow?: number;
}

/**
 * Check if a given object implements the GetPhotosProducerRequest interface.
 */
export function instanceOfGetPhotosProducerRequest(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function GetPhotosProducerRequestFromJSON(json: any): GetPhotosProducerRequest {
    return GetPhotosProducerRequestFromJSONTyped(json, false);
}

export function GetPhotosProducerRequestFromJSONTyped(json: any, ignoreDiscriminator: boolean): GetPhotosProducerRequest {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'filterLabel': !exists(json, 'filter_label') ? undefined : json['filter_label'],
        'amountHigh': !exists(json, 'amount_high') ? undefined : json['amount_high'],
        'idtoken': !exists(json, 'idtoken') ? undefined : json['idtoken'],
        'filterMonth': !exists(json, 'filter_month') ? undefined : json['filter_month'],
        'amountLow': !exists(json, 'amount_low') ? undefined : json['amount_low'],
    };
}

export function GetPhotosProducerRequestToJSON(value?: GetPhotosProducerRequest | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'filter_label': value.filterLabel,
        'amount_high': value.amountHigh,
        'idtoken': value.idtoken,
        'filter_month': value.filterMonth,
        'amount_low': value.amountLow,
    };
}

