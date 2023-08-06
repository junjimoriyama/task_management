/* firebaseの初期化の設定 */

// initializeApp関数import
import { initializeApp } from "firebase/app"
// firebaseデータベースの初期化取得関数
import { getFirestore } from "firebase/firestore";

// プロジェクト固有の情報
const firebaseConfig = {
  apiKey: "AIzaSyDtoObHJiRLQJ6mETSMOo6jzOytXEn8YeI",
  authDomain: "task-management-79df5.firebaseapp.com",
  projectId: "task-management-79df5",
  storageBucket: "task-management-79df5.appspot.com",
  messagingSenderId: "264966216087",
  appId: "1:264966216087:web:e0bb658cea89f902f60cd2"
};

// Firebaseアプリ初期化
const app = initializeApp(firebaseConfig)

// 個人の各設定
// 初期化したアプリのインスタンスを引数として渡し、Firestoreデータベースのインスタンスを取得
const db = getFirestore(app);
// データベースの初期化をエクスポート
export default db;
