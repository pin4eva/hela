import * as express from "express";
import { IReport } from "helpers/types/Report.type";
import { Report } from "../models/ReportModel";
const router = express.Router();

router.get("/all", async (req, res) => {
  try {
    const reports = await Report.find(
      {},
      {
        judgement: 0,
        body: 0,
        appeal: 0,
        ratios: 0,
        cases_cited: 0,
        determination: 0,
        issues_of_law: 0,
      }
    )
      .limit(10)
      //   .skip(skip || 0)
      .sort({ createdAt: -1 })
      .populate("added_by");
    // reports = reports.splice(skip || 0, limit || 15);
    res.json(reports);
  } catch (error) {
    res.status(500).json(error);
  }
});

export { router as reportController };
