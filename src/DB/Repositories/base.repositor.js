 import { isValidObjectId } from "mongoose";
 
 export default class BaseRepository {
   model;
   constructor(model) {
     this.model = model;
   }
   creatDocument(data = {}) {
     return this.model.create(data);
   }
   findDocument({options = {}}={}) {
     return this.model.find(options);
   }
   findOneDocument(filter = {}) {
     return this.model.findOne(filter);
   }
   findUserProfileByIdDocument(userId) {
      if (!isValidObjectId(userId)) throw new Error("User_ID Is Not Valid");
     return this.model.findById(userId);
   }
   saveUserDocument(){
    return this.model.save()
   }
 }
 