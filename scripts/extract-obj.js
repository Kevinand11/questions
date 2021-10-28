const textract = require('textract')
const path = require('path')
const fs = require('fs')

const rawFolder = './questions/obj/raw'
const saveFolder = './questions/obj/save'
const specialFolder = './questions/obj/special'

const exists = fs.existsSync(rawFolder)
if (!exists) throw new Error(`Raw folder does not exist: ${rawFolder}`)

const files = fs.readdirSync(rawFolder).map(file => `${rawFolder}/${file}`)

files.forEach((file) => {
	const pathname = path.normalize(file).split('/')
	const filename = pathname[pathname.length - 1].split('.')[0]
	let [examType, subject, yearStr] = filename.split('-').map((n) => n.trim())
	examType = examType.toLowerCase()
	subject = subject.toLowerCase()

	const year = parseInt(yearStr)
	if (isNaN(year)) throw new Error('Year is not valid')

	textract.fromFileWithPath(file, { preserveLineBreaks: true, includeAltText: true }, function (error, text) {
		if (error) throw new Error(error)
		const [rawQuestions, rawAnswers] = text.split('xxxxxxxxxx')

		const answers = rawAnswers
			.trim()
			.split('\n')
			.map((answer) => answer.toLowerCase())

		const filteredQuestions = rawQuestions.split('\n')
			.reduce((acc, val) => {
				if (val) acc[acc.length - 1].push(val)
				else acc.push([])
				return acc
			}, [[]])
			.filter((val) => val.length > 0)

		if (answers.length !== filteredQuestions.length) throw new Error('Answers and Questions dont have equal lengths')

		const questions = filteredQuestions.map((question, i) => {
			question = question.map(q => q.trim())
			const isSpecial = !!question.find(q => q.includes('specialxy'))

			let [orderStr, ...questionBody] = question[0].split('.')
			questionBody = questionBody.join('.')
			const order = parseInt(orderStr)
			if (isNaN(order)) throw new Error('A question is missing its order')

			const a = (question.find((q) => q.startsWith('A.'))?.replace('A.', '') ?? '').trim()
			const b = (question.find((q) => q.startsWith('B.'))?.replace('B.', '') ?? '').trim()
			const c = (question.find((q) => q.startsWith('C.'))?.replace('C.', '') ?? '').trim()
			const d = (question.find((q) => q.startsWith('D.'))?.replace('D.', '') ?? '').trim()
			const e = (question.find((q) => q.startsWith('E.'))?.replace('E.', '') ?? '').trim()
			const answer = answers[i]

			return {
				isSpecial, a, b, c, d, e,
				question: questionBody, order, answer,
				year, subject, examType,
				questionMedia: [], aMedia: [], bMedia: [], cMedia: [], dMedia: [], eMedia: [],
				id: `objectives-${examType}-${subject}-${year}-${order}`
			}
		})

		const nonSpecial = questions.filter((q) => q.isSpecial === false).map((q) => {
			delete q.isSpecial
			return q
		})

		const special = questions.filter((q) => q.isSpecial === true).map(q => `Question ${q.order}`)

		fs.writeFileSync(`${saveFolder}/${examType}-${subject}-${year}.json`, JSON.stringify(nonSpecial, null, 4))
		fs.writeFileSync(`${specialFolder}/${examType}-${subject}-${year}.json`, JSON.stringify(special, null, 4))
	})

})