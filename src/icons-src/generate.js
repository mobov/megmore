/**
 * Created by nocoolyoyo on 2018/6/22.
 */
const path = require('path')
const fs = require('fs')
const sourceDir = './SVG/'
const outputDir = '../icons/'

String.prototype.getTags = function (name = 'svg'){
	const Regex = new RegExp(`<${name}(“[^”]*”|’[^’]*’|[^’”>])*>`, 'gi')
	return this.match(Regex)
}
String.prototype.getAttributes = function (name = 'height'){
	const Regex = new RegExp(`${name}="(.*?)"`, 'gi')
	return Regex.exec(this)[1]
}

let fileEntries = fs.readdirSync(path.resolve(__dirname, sourceDir))

fileEntries.forEach((fileName, index) => {
	let svgData = {}
	const name = fileName.split('.')[0]

	fs.readFile(path.resolve(__dirname, `${sourceDir + fileName}`), (err, data) => {
		const strSVG = data.toString().getTags('svg')[0]
		const strPaths = data.toString().getTags('path')

		svgData[name] = {
			paths: (()=>{
				let temp = []
				strPaths.forEach(path=>{
					temp.push(path.getAttributes('d'))
				})
				return temp
			})(),
			height: strSVG.getAttributes('height'),
			width: strSVG.getAttributes('width'),
			viewBox: strSVG.getAttributes('viewBox')
		}
		svgData = JSON.stringify(svgData, null, 1)
		let buffer = `import { MIcon } from '../'\n\nMIcon.register(${svgData})`
		fs.writeFile(path.resolve(__dirname, `${outputDir + name}.js`), buffer, (err) => {if (err) throw err})

	})
})