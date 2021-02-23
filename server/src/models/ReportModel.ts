import mongoose, { Model } from "mongoose";
import slug from "mongoose-slug-generator";
const Schema = mongoose.Schema;
import { IReport, IReportComment } from "helpers/types/Report.type";

const ReportSchema = new Schema(
  {
    court: String,
    suit_no: String,
    title: { type: String, text: true },
    summary: String,
    body: { type: String, text: true },
    date: Date,
    vol: String,
    year: String,
    likes: { type: Number, default: 0 },
    caseRef: { type: String, text: true },
    slug: { type: String, slug: "title" },
    comments: [{ type: Schema.Types.ObjectId, ref: "RepComment" }],
    judgesList: [{ type: Schema.Types.ObjectId, ref: "Judge" }],
    added_by: { type: Schema.Types.ObjectId, ref: "User" },
    updated_by: { type: Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

ReportSchema.index({ title: "text", caseRef: "text", vol: "text" });
ReportSchema.plugin(slug);

const RepCommentSchema = new Schema({
  content: String,
  author: { type: Schema.Types.ObjectId, ref: "User" },
  likes: { type: Number, default: 0 },
  approved: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  report: { type: Schema.Types.ObjectId, ref: "Report" },
});

export const Report: Model<IReport> = mongoose.model("Report", ReportSchema);
export const RepComment: Model<IReportComment> = mongoose.model(
  "RepComment",
  RepCommentSchema
);
