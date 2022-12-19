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
 * @interface GetIncomeRequest
 */
export interface GetIncomeRequest {
    /**
     * 
     * @type {string}
     * @memberof GetIncomeRequest
     */
    idtoken?: string;
}

/**
 * Check if a given object implements the GetIncomeRequest interface.
 */
export function instanceOfGetIncomeRequest(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function GetIncomeRequestFromJSON(json: any): GetIncomeRequest {
    return GetIncomeRequestFromJSONTyped(json, false);
}

export function GetIncomeRequestFromJSONTyped(json: any, ignoreDiscriminator: boolean): GetIncomeRequest {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'idtoken': !exists(json, 'idtoken') ? undefined : json['idtoken'],
    };
}

export function GetIncomeRequestToJSON(value?: GetIncomeRequest | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'idtoken': value.idtoken,
    };
}

