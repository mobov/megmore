/**
 * Created by nocoolyoyo on 2018/6/22.
 */
const path = require('path')
const fs = require('fs')
const icons = require('./selection.json')
const output = '../../components/icon/paths.ts'

let source = icons.icons
let data = {}

source.forEach(item => {
	data[item.properties.name] = item.icon.paths[0]
})
data = `export default ${JSON.stringify(data, null, 1)}`

fs.writeFileSync(path.resolve(__dirname, output), data)
