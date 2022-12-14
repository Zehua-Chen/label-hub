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
 * @interface GetIncomeResponse
 */
export interface GetIncomeResponse {
    /**
     * 
     * @type {number}
     * @memberof GetIncomeResponse
     */
    income?: number;
}

/**
 * Check if a given object implements the GetIncomeResponse interface.
 */
export function instanceOfGetIncomeResponse(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function GetIncomeResponseFromJSON(json: any): GetIncomeResponse {
    return GetIncomeResponseFromJSONTyped(json, false);
}

export function GetIncomeResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): GetIncomeResponse {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'income': !exists(json, 'income') ? undefined : json['income'],
    };
}

export function GetIncomeResponseToJSON(value?: GetIncomeResponse | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'income': value.income,
    };
}

