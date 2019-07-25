import app from "firebase/app";
import "firebase/firestore";

export var empData = [];

export function getData() {
  empData = [];
  const promise = app
    .firestore()
    .collection("employees")
    .get()
    .then(query => {
      query.forEach(doc => {
        empData.push(doc.data());
      });
    });
  return promise;
}

export function deleteData(docName) {
  const promise = app
    .firestore()
    .collection("employees")
    .doc(docName)
    .delete();
  return promise;
}

export function setData(docName, dataObj) {
  const promise = app
    .firestore()
    .collection("employees")
    .doc(docName)
    .set(dataObj);
  return promise;
}

export function updateData(docName, dataObj) {
  const promise = app
    .firestore()
    .collection("employees")
    .doc(docName)
    .update(dataObj);
  return promise;
}
