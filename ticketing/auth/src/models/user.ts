import mongoose from 'mongoose';
import { Password } from '../utilities/password';

// An interface that describes the properties
// that are required to create a new user
// needed this code specificaaly for typescript
interface UserAttrs {
  email: string;
  password: string;
}

// an interface that describs the properties that a User Model has
interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

// an interface that describes the properties that a User Document has
interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
}

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        // in mongoose id will be _id
        // it will add further add __V attribute(version key)
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.__v;
      },
    },
  }
);

// pre save hoot in mongoose
userSchema.pre('save', async function (done) {
  // hash password if only modified or while creating new user
  if (this.isModified('password')) {
    const hashed = await Password.toHash(this.get('password'));
    this.set('password', hashed);
  }
  done();
});

// any time we want to create new user we are going to call below method instead for new User
// this is for type check only
userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export { User };
