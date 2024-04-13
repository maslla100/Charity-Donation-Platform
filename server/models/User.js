const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    address: {
        type: String,
    },
    donations: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Donation',
        },
    ]
}, { timestamps: true });

// Hash password before saving
userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        const saltRounds = process.env.BCRYPT_SALT_ROUNDS || 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }
    next();
});

const User = model('User', userSchema);
module.exports = User;
