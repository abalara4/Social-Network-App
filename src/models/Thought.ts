import { Schema, model, Types } from "mongoose";
import dateFormatter from "../utils/dateFormatter";

interface IReaction {
  reactionId: Types.ObjectId;
  reactionBody: string;
  username: string;
  createdAt: Date;
}

interface IThought {
  thoughtText: string;
  createdAt: Date;
  username: string;
  reactions: IReaction[];
}

const reactionSchema = new Schema<IReaction>(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now, // Use Date.now directly for default
      get: function(value: Date): string { // Use function keyword to maintain context
        return dateFormatter(value);
      },
    } as any, // Type assertion to bypass TypeScript error
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

const thoughtSchema = new Schema<IThought>(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: function(value: Date): string { // Use function keyword to maintain context
        return dateFormatter(value);
      },
    } as any, // Type assertion to bypass TypeScript error
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

const Thought = model<IThought>("Thought", thoughtSchema);
export default Thought;