export const parseContent = (text: string, file: string, subject: string, examType: string, year: number) => {
	const indexofX = text.toLowerCase().indexOf('xxxxxxxxxx')
	if (indexofX < 0) throw new Error('10 x problem')

	const rawQuestions = text.slice(0, indexofX)
	const rawAnswers = text.slice(indexofX + 10)

	const answers = rawAnswers
		.trim()
		.split('\n')
		.map((answer) => answer.toLowerCase())

	const filteredQuestions = rawQuestions.split('\n')
		.reduce((acc, val) => {
			if (val) val = val.trim()
			if (val) acc[acc.length - 1].push(val)
			else acc.push([])
			return acc
		}, [[]] as string[][])
		.filter((val) => val.length > 0)

	console.log(answers.length)
	console.log(filteredQuestions.length)

	if (answers.length !== filteredQuestions.length) throw new Error('Answers and Questions dont have equal lengths')

	const questions = filteredQuestions.map((question, i) => {
		question = question.map(q => q.trim())
		const isSpecial = !!question.find(q => q.toLowerCase().includes('specialxy'))

		const aIndex = question.findIndex((q) => q.startsWith('A.'))
		const questionContent = question.slice(0, aIndex).join('\n')
		const dotIndex = questionContent.indexOf('.')
		const order = parseInt(questionContent.slice(0, dotIndex))
		const questionBody = questionContent.slice(dotIndex + 1).trim()
		if (isNaN(order)) throw new Error(`A question is missing its order in: ${file}`)

		const a = (question.find((q) => q.startsWith('A.'))?.replace('A.', '') ?? '').trim()
		const b = (question.find((q) => q.startsWith('B.'))?.replace('B.', '') ?? '').trim()
		const c = (question.find((q) => q.startsWith('C.'))?.replace('C.', '') ?? '').trim()
		const d = (question.find((q) => q.startsWith('D.'))?.replace('D.', '') ?? '').trim()
		const e = (question.find((q) => q.startsWith('E.'))?.replace('E.', '') ?? '').trim()

		if (!a) throw new Error(`Option A missing for no ${order}`)
		if (!b) throw new Error(`Option B missing for no ${order}`)
		if (!c) throw new Error(`Option C missing for no ${order}`)
		if (!d) throw new Error(`Option D missing for no ${order}`)

		const explanation = (question.find((q) => q.startsWith('Explanation.'))?.replace('Explanation.', '') ?? '').trim()
		const answer = answers[i]

		return {
			isSpecial, a, b, c, d, e, explanation,
			question: questionBody, order, answer,
			year, subject, examType,
			questionMedia: [], aMedia: [], bMedia: [], cMedia: [], dMedia: [], eMedia: [],
			id: `objectives-${examType}-${subject}-${year}-${order}`
		}
	})

	const nonSpecial = questions.filter((q) => !q.isSpecial).map((q) => {
		//@ts-ignore
		delete q.isSpecial
		return q
	})

	const special = questions.filter((q) => q.isSpecial).map(q => `Question ${q.order}`)

	return { special, nonSpecial }
}

export const getName = (name: string) => {
	let [examType, subject, yearStr] = name.split('-').map((n) => n.trim())
	examType = examType.toLowerCase()
	subject = subject.toLowerCase()

	const year = parseInt(yearStr)
	if (isNaN(year)) throw new Error(`Year is not valid for: ${name}`)

	return { examType, year, subject }
}