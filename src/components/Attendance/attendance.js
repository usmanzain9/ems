import app from "firebase/app";
import "firebase/firestore";

export var attData = [];

export function getData(docName) {
  attData = [];
  const promise = app
    .firestore()
    .collection("attendance")
    .doc(docName)
    .get()
    .then(doc => {
      if (doc.exists) {
        attData = doc.data();
      } else {
        attData = [];
      }
    });
  return promise;
}
