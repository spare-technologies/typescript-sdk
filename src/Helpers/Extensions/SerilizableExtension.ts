import {serialize} from "typescript-json-serializer";
import * as hash from "js-sha256";
const stringify = require('json-stable-stringify');

export {}
declare global {
  export interface Object {
    /**
     * Get json object
     */
    toJson(): object;

    /***
     * Get stable json
     */
    toStableJson(): string;

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


Object.prototype.toStableJson = function (this: object) {
  const ser = serialize(this, true);
  const json = removeNullProperties(ser);
  return stringify(json);
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

function removeNullProperties(obj: any) {
  Object.keys(obj).forEach(key => {
    let value = obj[key];
    let hasProperties = value && Object.keys(value).length > 0;
    if (value === null) {
      delete obj[key];
    }
    if (Array.isArray(value)) {
      obj[key] = value.filter(function (el: any) {
        removeNullProperties(value);
        return el !=null;
      });
      stringify(obj[key]);
    }
    else if ((typeof value !== "string") && hasProperties) {
      removeNullProperties(value);
    }
  });
  toString(obj);
  return obj;
}

function toString(o: any) {
  Object.keys(o).forEach(k => {
    if (typeof o[k] === 'object') {
      return toString(o[k]);
    }
    o[k] = '' + o[k];
  });

  return o;
}

