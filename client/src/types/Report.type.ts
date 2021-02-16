import { Document, ObjectId } from "mongoose";

export interface ReportInterface extends Document {
  court: string;
  suit_no: string;
  title: string;
  summary: string;
  body: string;
  date: Date;
  vol: string;
  year: string;
  likes?: number;
  caseRef?: string;
  slug?: string;
  comments?: Array<ObjectId> | Array<ReportCommentInterface>;
  judgesList?: Array<ObjectId>;
  added_by: ObjectId;
  updated_by?: ObjectId;
}

// export interface IReport extends Model<ReportCommentInterface> { };

export interface ReportCommentInterface {
  content: string;
  author: ObjectId;
  likes?: number;
  approved?: boolean;
  createdAt: Date;
  report: ObjectId;
}
