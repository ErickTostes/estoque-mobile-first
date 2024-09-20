import { getFirestore, collection, addDoc, deleteDoc, doc, updateDoc, onSnapshot, getDoc } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword, deleteUser, updateProfile } from 'firebase/auth';
import { auth } from './firebase-config';

const db = getFirestore();

// Função para criar um novo usuário no Firestore
export const createUser = async (email, password, name) => {
  // Cria o usuário no Firebase Authentication
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  // Atualiza o perfil do usuário
  await updateProfile(user, { displayName: name });

  // Adiciona o usuário ao Firestore
  const usersCollection = collection(db, 'users');
  await addDoc(usersCollection, {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName,
  });
};

// Função para remover um usuário do Firestore
export const removeUser = async (userId) => {
  // Remove do Firestore
  const userDoc = doc(db, 'users', userId);
  await deleteDoc(userDoc);

  // Opcional: remover o usuário do Firebase Authentication
  const user = auth.currentUser; // Ou encontre o usuário de outra forma se necessário
  if (user && user.uid === userId) {
    await deleteUser(user);
  }
};

// Função para escutar as mudanças em tempo real na coleção de usuários
export const listenToUsers = (callback) => {
  const usersCollection = collection(db, 'users');
  return onSnapshot(usersCollection, (snapshot) => {
    const usersList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    callback(usersList);
  });
};

// Função para editar um usuário existente
export const editUser = async (userId, newName, newEmail) => {
  const userDoc = doc(db, 'users', userId);
  const userRef = await getDoc(userDoc);
  
  if (!userRef.exists()) return;

  const updatedData = {};
  if (newEmail) {
    updatedData.email = newEmail;
    const user = auth.currentUser;
    if (user && user.email === newEmail) {
      await user.updateEmail(newEmail);
    }
  }
  if (newName) {
    updatedData.displayName = newName;
    const user = auth.currentUser;
    if (user) {
      await updateProfile(user, { displayName: newName });
    }
  }

  await updateDoc(userDoc, updatedData);
};
