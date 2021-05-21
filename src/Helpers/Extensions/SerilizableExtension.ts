import {serialize} from "typescript-json-serializer";
import * as hash from "js-sha256";

export {}
declare global {
  export interface Object {
    /**
     * Get json object
     */
    toJson(): object;

    /**
     * Get json string
     * @param pretty
     */
    toJsonString(pretty: boolean): string;

    /**
     * Get sha256 digest
     */
    sha256(): string;

    /**
     * Get sha224 digest
     */
    sha224(): string;

    /**
     * Check if equal to object
     * @param object
     */
    isEqual(object: object): boolean;

    /**
     * Get clean json
     * @param jsonObject
     * @param pretty
     */
    getCleanJson(jsonObject: any, pretty: boolean): string;
  }
}

/**
 * Get json object
 */
Object.prototype.toJson = function (this: object) {
  return serialize(this, true)
};

/**
 * Get json string
 * @param pretty
 */
Object.prototype.toJsonString = function (this: object, pretty: boolean = false) {
  return this.getCleanJson(serialize(this, true), pretty)
};

/**
 * Get sha256 digest
 */
Object.prototype.sha256 = function (this: object) {
  return hash.sha256(this.toJsonString(false))
};

/**
 * Get sha224 digest
 */
Object.prototype.sha224 = function (this: object) {
  return hash.sha224(this.toJsonString(false))
};

/**
 * Check if equal to object
 * @param object
 */
Object.prototype.isEqual = function (this: object, object: object) {
  return object.sha256() == this.sha256()
};

/**
 * Get clean json
 * @param jsonObject
 * @param pretty
 */
Object.prototype.getCleanJson = function (jsonObject: any, pretty: boolean) {
  const clone = JSON.parse(JSON.stringify(jsonObject));
  for (const prop in clone) {
    if (clone.hasOwnProperty(prop)) {
      if (clone[prop] == null) {
        delete clone[prop];
      }
    }

  }
  return pretty ? JSON.stringify(clone, Object.keys(clone).sort(), '\t') : JSON.stringify(clone, Object.keys(clone).sort());
};

