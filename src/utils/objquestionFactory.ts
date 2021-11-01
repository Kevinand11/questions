// @ts-nocheck
import {
	isArrayOfX,
	isExtractedHTMLLongerThanX,
	isImage,
	isLongerThanX,
	isNumber,
	isShorterThanX,
	isString
} from '@stranerd/validate'
import { BaseFactory } from './baseFactory'
import { answers, examTypes, Media, ObjQuestionToModel, subjects, years } from '@/utils/questionModel'

type HasMedia = 'question' | 'a' | 'b' | 'c' | 'd' | 'e' | 'explanation'

export class ObjQuestionFactory extends BaseFactory<ObjQuestionToModel, ObjQuestionToModel> {
	readonly rules = {
		examType: { required: true, rules: [isString] },
		subject: { required: true, rules: [isString] },
		year: { required: true, rules: [isNumber] },
		order: { required: true, rules: [isNumber] },
		answer: { required: true, rules: [isString, isLongerThanX(0), isShorterThanX(2)] },
		question: { required: true, rules: [isString, isExtractedHTMLLongerThanX(0)] },
		a: { required: true, rules: [isString, isExtractedHTMLLongerThanX(0)] },
		b: { required: true, rules: [isString, isExtractedHTMLLongerThanX(0)] },
		c: { required: true, rules: [isString, isExtractedHTMLLongerThanX(0)] },
		d: { required: true, rules: [isString, isExtractedHTMLLongerThanX(0)] },
		e: { required: false, rules: [isString, isExtractedHTMLLongerThanX(-1)] },
		explanation: { required: false, rules: [isString, isExtractedHTMLLongerThanX(-1)] },
		questionMedia: { required: true, rules: [isArrayOfX((com) => isImage(com).valid, 'images')] },
		aMedia: { required: true, rules: [isArrayOfX((com) => isImage(com).valid, 'images')] },
		bMedia: { required: true, rules: [isArrayOfX((com) => isImage(com).valid, 'images')] },
		cMedia: { required: true, rules: [isArrayOfX((com) => isImage(com).valid, 'images')] },
		dMedia: { required: true, rules: [isArrayOfX((com) => isImage(com).valid, 'images')] },
		eMedia: { required: true, rules: [isArrayOfX((com) => isImage(com).valid, 'images')] },
		explanationMedia: { required: true, rules: [isArrayOfX((com) => isImage(com).valid, 'images')] }
	}

	reserved = ['subject', 'year', 'examType']

	constructor () {
		super({
			examType: examTypes[0], subject: subjects[0], year: years[0], order: 1,
			question: '', answer: answers[0], a: '', b: '', c: '', d: '', e: '', explanation: '',
			questionMedia: [], aMedia: [], bMedia: [], cMedia: [], dMedia: [], eMedia: [], explanationMedia: []
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

	get a () {
		return this.values.a
	}

	set a (value: string) {
		this.set('a', value)
	}

	get b () {
		return this.values.b
	}

	set b (value: string) {
		this.set('b', value)
	}

	get c () {
		return this.values.c
	}

	set c (value: string) {
		this.set('c', value)
	}

	get d () {
		return this.values.d
	}

	set d (value: string) {
		this.set('d', value)
	}

	get e () {
		return this.values.e
	}

	set e (value: string) {
		this.set('e', value)
	}

	get explanation () {
		return this.values.explanation
	}

	set explanation (value: string) {
		this.set('explanation', value)
	}

	getMedia (key: HasMedia) {
		return this.values[`${key}Media`] ?? []
	}

	addMedia (key: HasMedia, value: Media) {
		this.set(`${key}Media`, [...this.values[`${key}Media`], value])
	}

	removeMedia (key: HasMedia, value: Media) {
		this.set(`${key}Media`, (this.values[`${key}Media`] as Media[])?.filter((doc) => doc.name !== value.name))
	}

	toModel = async () => {
		if (this.valid) {
			const keys = ['questionMedia', 'aMedia', 'bMedia', 'cMedia', 'dMedia', 'eMedia', 'explanationMedia'] as const
			await Promise.all(
				keys.map(async (key) => {
					const docs = await Promise.all(this.values[key].map(async (doc) => {
						if (doc instanceof File) return await this.uploadFile('pastQuestions/objectives', doc)
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
