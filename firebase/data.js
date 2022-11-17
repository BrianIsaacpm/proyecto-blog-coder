// import { collection, addDoc } from "firebase/firestore";
// import { db } from "./config";

class Data {
  // agregar datos de la agenda a DB
  async setDataContact(values) {
    try {
      debugger;
      const doc = await addDoc(collection(db, "citas"), values);
      console.log("Se a creado un documento", doc);
      return doc;
    } catch (error) {
      console.log("A ocurrido un error", error);
    }
  }
}

export default new Data();
