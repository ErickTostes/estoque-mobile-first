import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs, getDoc, query, where, increment } from 'firebase/firestore';
import { db } from './firebase-config';

export const addProduct = async (name, quantity, price) => {
    try {
      const productsRef = collection(db, 'products');
      await addDoc(productsRef, { name, quantity, price });
    } catch (error) {
      console.error("Erro ao adicionar produto:", error);
      throw error;
    }
};

export const updateProduct = async (productId, name, quantity, price) => {
  const productRef = doc(db, 'products', productId);
  await updateDoc(productRef, { name, quantity, price });
};

export const removeProduct = async (productId) => {
  const productRef = doc(db, 'products', productId);
  await deleteDoc(productRef);
};

export const listProducts = async () => {
  const productsRef = collection(db, 'products');
  const snapshot = await getDocs(productsRef);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const updateStock = async (productId, quantity) => {
  const productRef = doc(db, 'products', productId);
  await updateDoc(productRef, { quantity: increment(quantity) }); 
};

export const getStockHistory = async (productId) => {
  return [];
};

export const fetchProductById = async (id) => {
  const productRef = doc(db, 'products', id);
  const docSnap = await getDoc(productRef);
  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() };
  } else {
    throw new Error('Produto não encontrado');
  }
};

export const generateReport = async (reportType) => {
  return [];
};
