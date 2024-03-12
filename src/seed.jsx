import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { config } from "./lib/firebase";

async function initializeFirebase() {
  const firebaseApp = initializeApp(config);
  const firestore = getFirestore(firebaseApp);

  return { firebaseApp, firestore };
}

export async function seedDatabase() {
  const { firestore } = await initializeFirebase();

  const users = [
    {
      userId: "FQir5gc3B3NaOUwdlMYCpkgXw9J3",
      username: "karl",
      fullName: "Karl Hadwen",
      emailAddress: "karlhadwen@gmail.com",
      following: ["2"],
      followers: ["2", "3", "4"],
      dateCreated: Date.now(),
    },
    {
      userId: "2",
      username: "raphael",
      fullName: "Raffaello Sanzio da Urbino",
      emailAddress: "raphael@sanzio.com",
      following: [],
      followers: ["FQir5gc3B3NaOUwdlMYCpkgXw9J3"],
      dateCreated: Date.now(),
    },
    {
      userId: "3",
      username: "dali",
      fullName: "Salvador Dalí",
      emailAddress: "salvador@dali.com",
      following: [],
      followers: ["FQir5gc3B3NaOUwdlMYCpkgXw9J3"],
      dateCreated: Date.now(),
    },
    {
      userId: "4",
      username: "orwell",
      fullName: "George Orwell",
      emailAddress: "george@orwell.com",
      following: [],
      followers: ["FQir5gc3B3NaOUwdlMYCpkgXw9J3"],
      dateCreated: Date.now(),
    },
  ];

  for (let k = 0; k < users.length; k++) {
    await addDoc(collection(firestore, "users"), users[k]);
  }

  for (let i = 1; i <= 5; ++i) {
    await addDoc(collection(firestore, "photos"), {
      photoId: i,
      userId: "2",
      imageSrc: `/images/users/raphael/${i}.jpg`,
      caption: "Saint George and the Dragon",
      likes: [],
      comments: [
        {
          displayName: "dali",
          comment: "Love this place, looks like my animal farm!",
        },
        {
          displayName: "orwell",
          comment: "Would you mind if I used this picture?",
        },
      ],
      userLatitude: "40.7128°",
      userLongitude: "74.0060°",
      dateCreated: Date.now(),
    });
  }
}
