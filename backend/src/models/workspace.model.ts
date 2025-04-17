import mongoose, { Document } from "mongoose";
import { generateInviteCode } from "../utils/uuid";
import { Schema } from "mongoose";

export interface WorkspaceDocument extends Document {
    name: string;
    description: string;
    owner: mongoose.Types.ObjectId;
    inviteCode: string;
    createdAt: string;
    updatedAt: string;
}

const workspaceSchema = new Schema<WorkspaceDocument>(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            required: false,
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        inviteCode: {
            type: String,
            required: true,
            unique: true,
            default: generateInviteCode,
        },
    },
    {
        timestamps: true,
    }
);

workspaceSchema.methods.resetInviteCode = function () {
    this.inviteCode = generateInviteCode();
};

const WorkspaceModel = mongoose.model<WorkspaceDocument>(
    "Workspace",
    workspaceSchema
);

export default WorkspaceModel;
