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

export function setData(uid, amount) {
  const promise = app
    .firestore()
    .collection("employees")
    .doc(uid)
    .update({ loan: amount });

  return promise;
}
