import { Schema, model, Document } from 'mongoose';

interface IUser extends Document {
    username: string;
    email: string;
    thoughts: Schema.Types.ObjectId[];
    friends: Schema.Types.ObjectId[];
}

const userSchema = new Schema<IUser>({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /.+\@.+\..+/,
    },
    thoughts: [{ type: Schema.Types.ObjectId, ref: 'Thought' }],
    friends: [{ type: Schema.Types.ObjectId, ref: 'User' }],
});

// Virtual for friend count
userSchema.virtual('friendCount').get(function(this: IUser) {
    return this.friends.length;
});

const User = model<IUser>('User', userSchema);
export default User;

