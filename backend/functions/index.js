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
exports.updateScore = functions.firestore
    .document("/messages/{messageID}")
    .onUpdate((change, context) => {
      const newValue = change.after.data();
      const voteCount = newValue.voteCount;
      const secondsSince = newValue.createdAt.seconds;
      const dateCreated = new Date(secondsSince*1000);
      const seconds = Math.floor((new Date() - dateCreated) / 1000);
      const interval = seconds / 3600;
      let score = 0;
      if (interval > 48) {
        score = 0;
      } else if (interval > 24) {
        score = voteCount;
      } else if (interval > 1) {
        score = voteCount * 2;
      } else {
        score = voteCount * 3;
      }
      return db
          .collection("messages")
          .doc(context.params.messageID)
          .update({
            score: score,
          });
    });

exports.updatePostCount = functions.firestore
    .document("/messages/{messageID}")
    .onCreate((snap, context) => {
      const newValue = snap.data();
      const placeID = newValue.placeID;
      return db
          .collection("bars")
          .doc(placeID)
          .update({
            postCount: admin.firestore.FieldValue.increment(1),
          });
    });

exports.updateTopPost24 = functions.pubsub
    .schedule("2 17 * * *")
    .timeZone("America/New_York")
    .onRun((context) => {
      let post;
      return db.collection("bars").get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          db.collection("messages")
              .where("placeID", "==", doc.id)
              .orderBy("score", "desc").limit(1).get()
              .then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                  // doc.data() is never undefined for query doc snapshots
                  console.log(doc.id, " => ");
                  post = doc.data();
                });

                doc.ref.update({
                  topPost: post.text,
                  postCount: 0,
                });
              });
        });
      });
    });
// deletes checks ins older then 3 hours and checks every 3 hours
exports.checkIns3 = functions.pubsub
    .schedule("0 */3 * * *")
    .onRun((context) => {
      let post;
      db.collection("users").orderBy("checkInTime").get()
          .then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
              doc.ref.update({
                topPost: post.text,
                postCount: 0,
              });
            });
          });
    });
