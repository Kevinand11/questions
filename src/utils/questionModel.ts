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

export const examTypes = ['utme', 'wassce']
export const subjects = ['accounts', 'biology', 'chemistry', 'civic', 'commerce', 'crk', 'economics', 'english', 'government', 'literature', 'mathematics', 'physics']
const startYear = 1988
const endYear = 2025
export const years = new Array(1 + endYear - startYear).fill(0).map((_, idx) => startYear + idx)
export const answers = ['a', 'b', 'c', 'd', 'e']