/**
 * 能够存取 对象、数字等 类型的 localStorage 和 sessionStorage
 * Created by Vincent on 2017/1/20.
 */
class Storage {
  constructor(storageImpl, keyPrefix=''){
    this.storageImpl = storageImpl;
    this.keyPrefix = keyPrefix;
  }
  get length(){
    return this.storageImpl.length;
  }
  contains(key){
    return this.storageImpl.getItem(`${this.keyPrefix}${key}`) != null;
  }
  getItem(key){
    let itemString = this.storageImpl.getItem(`${this.keyPrefix}${key}`);
    if(!itemString)
      return;
    try{
      let itemObject = JSON.parse(itemString);
      return itemObject.data;
    }catch(e){
      warning(false, 'JSON 解析错误');
    }
  }
  setItem(key, data){
    let itemObject = {
      data
    };
    let itemString = JSON.stringify(itemObject);
    this.storageImpl.setItem(`${this.keyPrefix}${key}`, itemString);
  }
  removeItem(key){
    return this.storageImpl.removeItem(`${this.keyPrefix}${key}`);
  }
  clear(){
    this.storageImpl.clear();
  }
}
let defaultStorage = new Storage(localStorage);
defaultStorage.localStorage = localStorage;
defaultStorage.sessionStorage = new Storage(sessionStorage);
defaultStorage.createStorage = (storageImpl, keyPrefix)=>new Storage(storageImpl, keyPrefix);
module.exports = defaultStorage;
