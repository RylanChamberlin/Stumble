const functions = require("firebase-functions");

const admin = require("firebase-admin");
admin.initializeApp();

const db = admin.firestore();


exports.setVote = functions.firestore
    .document("/messages/{messageID}/upvotes/{uid}")
    .onCreate((snap, context) => {
      const newValue = snap.data();
      const vote = newValue.isVote;
      // const previousValue = snap.before.data();
      // const previousFieldValue = previousValue.isVote;
      // console.log("the previous: " + previousFieldValue);
      if (vote) {
        return db
            .collection("messages")
            .doc(context.params.messageID)
            .update({
              voteCount: admin.firestore.FieldValue.increment(1),
            });
      } else {
        return db
            .collection("messages")
            .doc(context.params.messageID)
            .update({
              voteCount: admin.firestore.FieldValue.increment(-1),
            });
      }
    });
exports.updateVote = functions.firestore
    .document("/messages/{messageID}/upvotes/{uid}")
    .onUpdate((change, context) => {
      const newValue = change.after.data();
      const vote = newValue.isVote;
      // const previousValue = snap.before.data();
      // const previousFieldValue = previousValue.isVote;
      // console.log("the previous: " + previousFieldValue);
      if (vote) {
        return db
            .collection("messages")
            .doc(context.params.messageID)
            .update({
              voteCount: admin.firestore.FieldValue.increment(2),
            });
      } else {
        return db
            .collection("messages")
            .doc(context.params.messageID)
            .update({
              voteCount: admin.firestore.FieldValue.increment(-2),
            });
      }
    });

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
