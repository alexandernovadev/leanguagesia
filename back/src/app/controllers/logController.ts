import { Request, Response } from "express";
import fs from "fs";
import path from "path";
import { parseAppLog } from "./helpers/parseLogs";

export const getLogs = (req: Request, res: Response) => {
  try {
    const logsPath = path.join(__dirname, "../../../logs");
    const errorLog = fs.readFileSync(
      path.join(logsPath, "errors.log"),
      "utf-8"
    );
    const appLog = fs.readFileSync(path.join(logsPath, "app.log"), "utf-8");

    // Parse app.log
    const formattedAppLog = parseAppLog(appLog);

    res.status(200).json({
      message: "Logs retrieved successfully",
      logs: {
        errorLog,
        appLog: formattedAppLog,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to retrieve logs", error: err });
  }
};
