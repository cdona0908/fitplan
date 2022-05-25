const { Schema, model } = require('mongoose');

const categorySchema = new Schema(
    {
        name: {
            type: String
        },
        id: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        }
    }
);

const Category = model('Category', categorySchema);

module.exports = Category;