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

export type Media = File | {
	name: string
	type: string
	path: string
	link: string
	size: number
}