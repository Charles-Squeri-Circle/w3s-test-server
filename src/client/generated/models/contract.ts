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
import { Blockchain } from './blockchain';
// May contain unused imports in some cases
// @ts-ignore
import { ModelContractInputType } from './model-contract-input-type';
// May contain unused imports in some cases
// @ts-ignore
import { ModelEvent } from './model-event';
// May contain unused imports in some cases
// @ts-ignore
import { ModelFunction } from './model-function';
// May contain unused imports in some cases
// @ts-ignore
import { ModelSolFile } from './model-sol-file';
// May contain unused imports in some cases
// @ts-ignore
import { ModelStatus } from './model-status';
// May contain unused imports in some cases
// @ts-ignore
import { ModelVerificationStatus } from './model-verification-status';

/**
 * 
 * @export
 * @interface Contract
 */
export interface Contract {
    /**
     * Unique system generated identifier of the resource.
     * @type {string}
     * @memberof Contract
     */
    'id'?: string;
    /**
     * The `id` of the Programmable Wallet that deployed this contract.
     * @type {string}
     * @memberof Contract
     */
    'deployerWalletID'?: string;
    /**
     * The id of the deployment transaction for this contract.
     * @type {string}
     * @memberof Contract
     */
    'deploymentTransactionId'?: string;
    /**
     * If this contract is a proxy, the contract ID of the implementation.
     * @type {string}
     * @memberof Contract
     */
    'implementationContractId'?: string;
    /**
     * The string value of the transaction hash.
     * @type {string}
     * @memberof Contract
     */
    'txHash'?: string;
    /**
     * The contract\'s ABI in a JSON stringified format.
     * @type {string}
     * @memberof Contract
     */
    'abiJson'?: string;
    /**
     * Archived is the updated archived setting of the contract. If true, the contract will not be visible in your dashboard.
     * @type {boolean}
     * @memberof Contract
     */
    'archived'?: boolean;
    /**
     * 
     * @type {Blockchain}
     * @memberof Contract
     */
    'blockchain'?: Blockchain;
    /**
     * Bytecode of the contract being deployed
     * @type {string}
     * @memberof Contract
     */
    'bytecode'?: string;
    /**
     * The on-chain address of this contract.
     * @type {string}
     * @memberof Contract
     */
    'contractAddress'?: string;
    /**
     * 
     * @type {ModelContractInputType}
     * @memberof Contract
     */
    'contractInputType'?: ModelContractInputType;
    /**
     * The address that created this contract, if deployed.
     * @type {string}
     * @memberof Contract
     */
    'deployerAddress'?: string;
    /**
     * The contract\'s name.
     * @type {string}
     * @memberof Contract
     */
    'name'?: string;
    /**
     * The description for a contract.
     * @type {string}
     * @memberof Contract
     */
    'description'?: string;
    /**
     * 
     * @type {ModelStatus}
     * @memberof Contract
     */
    'status'?: ModelStatus;
    /**
     * 
     * @type {ModelVerificationStatus}
     * @memberof Contract
     */
    'verificationStatus'?: ModelVerificationStatus;
    /**
     * The ipfs metadata link of the contract.
     * @type {string}
     * @memberof Contract
     */
    'metadataLink'?: string;
    /**
     * Last update date of the resource. ISO-8601 UTC date/time.
     * @type {string}
     * @memberof Contract
     */
    'updateDate'?: string;
    /**
     * Date and time the resource was created. ISO-8601 UTC date/time.
     * @type {string}
     * @memberof Contract
     */
    'createDate'?: string;
    /**
     * 
     * @type {Array<ModelSolFile>}
     * @memberof Contract
     */
    'sourceCode'?: Array<ModelSolFile>;
    /**
     * Functions supported by this contract. Parsed from abi_json.
     * @type {Array<ModelFunction>}
     * @memberof Contract
     */
    'functions'?: Array<ModelFunction>;
    /**
     * Events this contract can emit. Parsed from abi_json.
     * @type {Array<ModelEvent>}
     * @memberof Contract
     */
    'events'?: Array<ModelEvent>;
}


