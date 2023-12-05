import { getAuth } from "firebase/auth";
import { getFirestore, doc, getDoc, getDocs, collection } from "firebase/firestore";

const auth = getAuth();
const db = getFirestore();

export const getTaskDetails = async (taskId) => {
    const docRef = doc(db, "users", auth.currentUser.uid, "tasks", taskId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        return docSnap.data();
    } else {
        return null;
    }
}

export const getAllTasks = async () => {
    const tasks = [];
    const query = collection(db, "users", auth.currentUser.uid, "tasks");
    const querySnapshot = await getDocs(query);
    querySnapshot.forEach((doc) => {
        tasks.push({ ...doc.data(), id: doc.id });
    });
    return tasks;
}