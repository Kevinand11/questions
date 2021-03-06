import { initializeApp } from 'firebase/app'
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage'
import { doc, getFirestore, setDoc } from 'firebase/firestore'
import { ObjQuestionToModel, TheoryQuestionToModel } from './questionModel'

const app = initializeApp({
	apiKey: 'AIzaSyCcVYQQOOhLrKYYbX5IXcf3ltwwZbHDutA',
	authDomain: 'stranerddevelopment.firebaseapp.com',
	projectId: 'stranerddevelopment',
	storageBucket: 'stranerddevelopment.appspot.com',
	messagingSenderId: '1060370867985',
	appId: '1:1060370867985:web:739c941e672d22aec34eb0',
	measurementId: 'G-M06FNQESJP'
})
export const storage = getStorage(app)
export const firestore = getFirestore(app)

export const uploadFile = async (path: string, file: File) => {
	try {
		path = `${path}/${Date.now()}_${file.name}`
		const myRef = ref(storage, path)
		await uploadBytes(myRef, file)
		const link = await getDownloadURL(myRef)
		return { name: file.name, path, link, type: file.type, size: file.size }
	} catch {
		throw new Error(`Error uploading ${file.name}`)
	}
}

export const storagePath = 'pastQuestions/list4'

export const saveQuestionToDatabase = async (data: TheoryQuestionToModel | ObjQuestionToModel, path: string, skipOrder = false) => {
	const time = Date.now()
	if (!skipOrder && data.order < 200) data.order = data.order + 200
	const id = `${path}-${data.examType}-${data.subject}-${data.year}-${data.order}`
	// @ts-ignore
	data.createdAt = time
	const docRef = doc(firestore, `${storagePath}/${path}/${id}`)
	await setDoc(docRef, data)
	return id
}