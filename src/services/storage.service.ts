import { LocalUser } from "./../models/local_user";
import { Injectable } from "@angular/core";
import { STORAGE_KEYS } from "../config/storage_keys.config";

@Injectable()
export class StorageService {
  getLocalUser(): LocalUser {
    let usr = localStorage.getItem(STORAGE_KEYS.localUser);
    console.log("getLocalUser antes do IF" + usr);
    if (usr == null) {
      return null;
    } else {
      console.log(usr);
      return JSON.parse(usr);
    }
  }
  setLocalUser(obj: LocalUser) {
    if (obj == null) {
      console.log("no if do setLocalUser do storage.service  " + obj);
      localStorage.removeItem(STORAGE_KEYS.localUser);
    } else {
      localStorage.setItem(STORAGE_KEYS.localUser, JSON.stringify(obj));
      console.log(
        "no else do setItem do setLocalUser do storage.service  " + obj
      );
    }
  }
}
