let mongoose = require('mongoose');
let slugify = require('slugify');

let productSchema = new mongoose.Schema({
    name:{
        type:String,
        unique: true,
        required:true
    },
    price:{
        type:Number,
        required:true,
        min:0
    },description:{
        type:String,
        default:""
    },quantity:{
        type:Number,
        default:0,
        min:0
    },imgURL:{
        type:String,
        default:""
    },category:{
        type:mongoose.Types.ObjectId,
        ref:'category',
        required:true
    },slug: {
        type: String,
        unique: true
    },
    isDeleted:{
        type:Boolean,
        default:false
    }
},{
    timestamps:true
})

// Tạo slug tự động từ tên sản phẩm
productSchema.pre('save', function(next) {
    if (this.isModified('name')) {
        this.slug = slugify(this.name, { lower: true, strict: true });
    }
    next();
});

module.exports = mongoose.model('product',productSchema);