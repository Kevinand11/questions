export interface ObjQuestionToModel {
	examType: string
	subject: string
	year: number
	order: number
	question: string
	answer: string
	questionMedia: Media[]
	a: string
	aMedia: Media[]
	b: string
	bMedia: Media[]
	c: string
	cMedia: string[]
	d: string
	dMedia: string[]
	e: string
	eMedia: string[]
	explanation: string
	explanationMedia: string[]
}

export interface TheoryQuestionToModel {
	examType: string
	subject: string
	year: number
	order: number
	question: string
	answer: string
	questionMedia: Media[]
	answerMedia: Media[]
}

export type Media = File | {
	name: string
	type: string
	path: string
	link: string
	size: number
}

export const examTypes = ['jamb', 'waec', 'neco', 'gce', 'jupeb']
export const subjects = ['accounts', 'agriculture', 'biology', 'business studies', 'chemistry', 'civic', 'commerce', 'crk', 'economics', 'english', 'further mathematics', 'geography', 'government', 'history', 'igbo', 'irk', 'literature', 'mathematics', 'physics', 'visual arts', 'yoruba']
const startYear = 1978
const endYear = 2023
export const years = new Array(1 + endYear - startYear).fill(0).map((_, idx) => startYear + idx)
export const answers = ['a', 'b', 'c', 'd', 'e']
export const questionTypes = ['objectives', 'theory', 'practical']
