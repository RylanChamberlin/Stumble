const functions = require("firebase-functions");

const admin = require("firebase-admin");
admin.initializeApp();

const db = admin.firestore();


exports.addUpvote = functions.firestore
    .document("/messages/{messageID}/upvotes/{uid}")
    .onCreate((snap, context) => {
      return db
          .collection("messages")
          .doc(context.params.messageID)
          .update({
            voteCount: admin.firestore.FieldValue.increment(1),
          });
    });
exports.removeUpvote = functions.firestore
    .document("/messages/{messageID}/downvotes/{uid}")
    .onCreate((snap, context) => {
      return db
          .collection("messages")
          .doc(context.params.messageID)
          .update({
            voteCount: admin.firestore.FieldValue.increment(-1),
          });
    });

exports.addDownvote = functions.firestore
    .document("/messages/{messageID}/upvotes/{uid}")
    .onDelete((snap, context) => {
      return db
          .collection("messages")
          .doc(context.params.messageID)
          .update({
            voteCount: admin.firestore.FieldValue.increment(-1),
          });
    });

exports.removeDownvote = functions.firestore
    .document("/messages/{messageID}/downvotes/{uid}")
    .onDelete((snap, context) => {
      return db
          .collection("messages")
          .doc(context.params.messageID)
          .update({
            voteCount: admin.firestore.FieldValue.increment(+1),
          });
    });

exports.removeMessage = functions.firestore
    .document("/messages/{messageID}")
    .onUpdate((snap, context) => {
      const newValue = snap.after.data();
      const newFieldValue = newValue.field;
      const previousValue = snap.before.data();
      const previousFieldValue = previousValue.field;

      if (previousFieldValue!== newFieldValue) {
        console.log(newFieldValue);
      }
    });

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
