// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getStorage, ref, listAll, getDownloadURL, getMetadata } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB20aJbQjIyV0TSrgiu95EV5eOOhuRa8aw",
  authDomain: "prueba-940b5.firebaseapp.com",
  databaseURL: "https://prueba-940b5-default-rtdb.firebaseio.com",
  projectId: "prueba-940b5",
  storageBucket: "prueba-940b5.appspot.com",
  messagingSenderId: "38318639911",
  appId: "1:38318639911:web:09a111e798cb36ab96f702"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig); //This is the main app of FIREBASE

// Lets get the storage
const storage1 = getStorage(app);    // Initialize Cloud Storage and get a reference to the service
console.log(storage1)
// const storage2 = getStorage(app, "gs://prueba-940b5.appspot.com/Profynus/public") //Storage where all public audios are.


async function listFilesInBucket(folderPath) {
  try {
    // Get the storage reference
    const storage = getStorage();
    
    // Create a reference to the specific folder
    const storageRef = ref(storage, folderPath);

    // List all items in the folder
    const filesList = await listAll(storageRef);

    // Process each file to get download URLs and metadata
    const filesInfo = await Promise.all(
      filesList.items.map(async (itemRef) => {
        // Get download URL
        const downloadURL = await getDownloadURL(itemRef);

        // Get metadata
        const metadata = await getMetadata(itemRef);

        return {
          name: itemRef.name,
          downloadURL,
          metadata: {
            contentType: metadata.contentType,
            size: metadata.size,
            timeCreated: metadata.timeCreated,
            updated: metadata.updated
          }
        };
      })
    );

    return filesInfo;
  } catch (error) {
    console.error("Error listing files:", error);
    return [];
  }
}

// Usage example
async function displayFiles() {
  const folderPath = "Profynus/public"; // Note the change here
  
  try {
    const files = await listFilesInBucket(folderPath);
    console.log("Files in the bucket:", files);
    
    // Optional: You can further process or display the files
    // files.forEach(file => {
    //   console.log(`
    //     File Name: ${file.name}
    //     Download URL: ${file.downloadURL}
    //     Content Type: ${file.metadata.contentType}
    //     Size: ${file.metadata.size} bytes
    //     Created: ${file.metadata.timeCreated}
    //     Updated: ${file.metadata.updated}
    //     `);
    //   });
    return files;
  } catch (error) {
    console.error("Error fetching files:", error);
  }
}

export { listFilesInBucket, displayFiles };
