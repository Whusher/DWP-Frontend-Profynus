// //This is a representation of how to upload data .mp3 into firebase



// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getStorage } from "firebase/storage";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyCf8Wv6FP7xETsAaObsrNBDftxOd8mh1n4",
//   authDomain: "prueba-940b5.firebaseapp.com",
//   databaseURL: "https://prueba-940b5-default-rtdb.firebaseio.com",
//   projectId: "prueba-940b5",
//   storageBucket: "prueba-940b5.appspot.com",
//   messagingSenderId: "38318639911",
//   appId: "1:38318639911:web:fc7a6d6eb4e2211396f702"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

// const getStorageB = ()=>{
//     console.log(getStorage(app))
// }

// import { ref, uploadBytesResumable, getDownloadURL,deleteObject } from "firebase/storage";

// const storeBucket = getStorage();

// function uploadAudio(file, metadata, name) {
//   return new Promise((resolve, reject) => {
//     // Nuestra referencia al bucket raíz para imágenes
//     const storeReference = ref(storeBucket, 'gs://prueba-940b5.appspot.com/spAudios/' + name);
//     const uploadTask = uploadBytesResumable(storeReference, file, metadata);
//     // Escuchar para cambios de estado, errores y finalización de la subida.
//     uploadTask.on('state_changed',
//       (snapshot) => {
//         // Obtener el progreso de la tarea, incluyendo el número de bytes subidos y el total de bytes a ser subidos
//         const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//         console.log('Upload is ' + progress + '% done');
//         switch (snapshot.state) {
//           case 'paused':
//             console.log('Upload is paused');
//             break;
//           case 'running':
//             console.log('Upload is running');
//             break;
//         }
//       },
//       (error) => {
//         // Lista completa de códigos de error disponible en
//         // https://firebase.google.com/docs/storage/web/handle-errors
//         switch (error.code) {
//           case 'storage/unauthorized':
//             // El usuario no tiene permiso para acceder al objeto
//             reject(new Error('User doesn\'t have permission to access the object'));
//             break;
//           case 'storage/canceled':
//             // El usuario canceló la subida
//             reject(new Error('User canceled the upload'));
//             break;
//           case 'storage/unknown':
//             // Ocurrió un error desconocido, inspeccionar error.serverResponse
//             reject(new Error('Unknown error occurred, inspect error.serverResponse'));
//             break;
//           default:
//             reject(error);
//         }
//       },
//       () => {
//         // La subida se completó con éxito, ahora podemos obtener la URL de descarga
//         getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
//           console.log('File available at', downloadURL);
//           resolve(downloadURL);
//         }).catch((error) => {
//           reject(error);
//         });
//       }
//     );
//   });
// }

// export {uploadAudio, getStorageB}