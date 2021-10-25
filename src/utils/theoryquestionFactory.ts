// @ts-nocheck
import { isArrayOfX, isExtractedHTMLLongerThanX, isImage, isNumber, isString } from '@stranerd/validate'
import { BaseFactory } from './baseFactory'
import { answers, examTypes, Media, subjects, TheoryQuestionToModel, years } from '@/utils/questionModel'

type HasMedia = 'question' | 'answer'

export class TheoryQuestionFactory extends BaseFactory<TheoryQuestionToModel, TheoryQuestionToModel> {
	readonly rules = {
		examType: { required: true, rules: [isString] },
		subject: { required: true, rules: [isString] },
		year: { required: true, rules: [isNumber] },
		order: { required: true, rules: [isNumber] },
		answer: { required: true, rules: [isString, isExtractedHTMLLongerThanX(-1)] },
		question: { required: true, rules: [isString, isExtractedHTMLLongerThanX(-1)] },
		questionMedia: { required: true, rules: [isArrayOfX((com) => isImage(com).valid, 'images')] },
		answerMedia: { required: true, rules: [isArrayOfX((com) => isImage(com).valid, 'images')] }
	}

	reserved = ['subject', 'year', 'examType']

	constructor () {
		super({
			examType: examTypes[0], subject: subjects[0], year: years[0], order: 1,
			question: '', answer: answers[0], a: '', b: '', c: '', d: '', e: '',
			questionMedia: [], aMedia: [], bMedia: [], cMedia: [], dMedia: [], eMedia: []
		})
	}

	get examType () {
		return this.values.examType
	}

	set examType (value: string) {
		this.set('examType', value)
	}

	get subject () {
		return this.values.subject
	}

	set subject (value: string) {
		this.set('subject', value)
	}

	get year () {
		return this.values.year
	}

	set year (value: number) {
		this.set('year', value)
	}

	get order () {
		return this.values.order
	}

	set order (value: number) {
		this.set('order', value)
	}

	get question () {
		return this.values.question
	}

	set question (value: string) {
		this.set('question', value)
	}

	get answer () {
		return this.values.answer
	}

	set answer (value: string) {
		this.set('answer', value)
	}

	getMedia (key: HasMedia) {
		return this.values[`${key}Media`]
	}

	addMedia (key: HasMedia, value: Media) {
		this.set(`${key}Media`, [...this.values[`${key}Media`], value])
	}

	removeMedia (key: HasMedia, value: Media) {
		this.set(`${key}Media`, (this.values[`${key}Media`] as Media[])?.filter((doc) => doc.name !== value.name))
	}

	toModel = async () => {
		if (this.valid) {
			const keys = ['questionMedia', 'answerMedia'] as const
			await Promise.all(
				keys.map(async (key) => {
					const docs = await Promise.all(this.values[key].map(async (doc) => {
						if (doc instanceof File) return await this.uploadFile('pastQuestions/theory', doc)
						return doc
					}))
					this.set(key, docs)
				})
			)

			return { ...this.validValues }
		} else {
			throw new Error('Validation errors')
		}
	}
}
