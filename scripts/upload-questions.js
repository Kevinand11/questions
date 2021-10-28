const admin = require('firebase-admin')
const serviceAccount = require('./service.json')
const fs = require('fs')

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount)
})

const saveObjs = async () => {
	const folder = './questions/obj/save'
	const files = fs.readdirSync(folder).map(file => `${folder}/${file}`)

	files.map(async (file) => {
		const content = fs.readFileSync(file).toString()
		const questions = JSON.parse(content)
		await Promise.all(
			questions.map(async (q) => {
				const id = q.id
				delete q.id
				q.createdAt = Date.now()
				await admin.firestore().collection('pastQuestions/list/objectives').doc(id).set(q)
			})
		)
	})
}

saveObjs()