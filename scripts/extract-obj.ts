import { getName } from './parseContent'

const textract = require('textract')
const path = require('path')
const fs = require('fs')
const { parseContent } = require('./parseContent')

const rawFolder = './questions/obj/raw'
const saveFolder = './questions/obj/save'
const specialFolder = './questions/obj/special'

const exists = fs.existsSync(rawFolder)
if (!exists) throw new Error(`Raw folder does not exist: ${rawFolder}`)

const files = fs.readdirSync(rawFolder).map((file: string) => `${rawFolder}/${file}`)

files.forEach((file: string) => {
	const pathname = path.normalize(file).split('/')
	const filename = pathname[pathname.length - 1].split('.')[0]
	const { examType, subject, year } = getName(filename)

	textract.fromFileWithPath(file, { preserveLineBreaks: true, includeAltText: true }, function (error: string, text: string) {
		if (error) throw new Error(error)
		
		try {
			const { special, nonSpecial } = parseContent(text, file, subject, examType, year)

			if (nonSpecial.length) fs.writeFileSync(`${saveFolder}/${examType}-${subject}-${year}.json`, JSON.stringify(nonSpecial, null, 4))
			if (special.length) fs.writeFileSync(`${specialFolder}/${examType}-${subject}-${year}.txt`, special.map((q: any) => `Question ${q.order}`).join('\n'))
		} catch (e) {
			console.log(e.message)
		}
	})

})
