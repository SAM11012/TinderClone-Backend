const mongoose = require('mongoose')
const url = 'mongodb+srv://samyakmeshram:6Dx9Fz3WpI6JXJ0z@tinderui.hkvbf.mongodb.net/'


const connectDatabase = async ()=>{
    mongoose.connect(url)
}



module.exports = connectDatabase