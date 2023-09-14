/* tslint:disable */
/* eslint-disable */
/**
 * W3S
 * All W3S APIs
 *
 * The version of the OpenAPI document: 1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


// May contain unused imports in some cases
// @ts-ignore
import { TokenResponse } from './token-response';

/**
 * 
 * @export
 * @interface Balance
 */
export interface Balance {
    /**
     * List of token balances for each token on the wallet(s).
     * @type {string}
     * @memberof Balance
     */
    'amount': string;
    /**
     * 
     * @type {TokenResponse}
     * @memberof Balance
     */
    'token': TokenResponse;
    /**
     * Last update date of the resource. ISO-8601 UTC date/time.
     * @type {string}
     * @memberof Balance
     */
    'updateDate': string;
}
