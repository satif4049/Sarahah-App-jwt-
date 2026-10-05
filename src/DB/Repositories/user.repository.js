import User from "../Models/user.js";
import BaseRepository from "./base.repositor.js";


export default class UserRepository extends BaseRepository{
      constructor(){
        super(User)
      }
}