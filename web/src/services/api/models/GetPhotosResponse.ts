/* tslint:disable */
/* eslint-disable */
/**
 * Api
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 2022-12-20T17:45:27Z
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
import type { GetPhotosResponseResultsInner } from './GetPhotosResponseResultsInner';
import {
    GetPhotosResponseResultsInnerFromJSON,
    GetPhotosResponseResultsInnerFromJSONTyped,
    GetPhotosResponseResultsInnerToJSON,
} from './GetPhotosResponseResultsInner';

/**
 * 
 * @export
 * @interface GetPhotosResponse
 */
export interface GetPhotosResponse {
    /**
     * 
     * @type {Array<GetPhotosResponseResultsInner>}
     * @memberof GetPhotosResponse
     */
    results?: Array<GetPhotosResponseResultsInner>;
}

/**
 * Check if a given object implements the GetPhotosResponse interface.
 */
export function instanceOfGetPhotosResponse(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function GetPhotosResponseFromJSON(json: any): GetPhotosResponse {
    return GetPhotosResponseFromJSONTyped(json, false);
}

export function GetPhotosResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): GetPhotosResponse {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'results': !exists(json, 'results') ? undefined : ((json['results'] as Array<any>).map(GetPhotosResponseResultsInnerFromJSON)),
    };
}

export function GetPhotosResponseToJSON(value?: GetPhotosResponse | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'results': value.results === undefined ? undefined : ((value.results as Array<any>).map(GetPhotosResponseResultsInnerToJSON)),
    };
}

