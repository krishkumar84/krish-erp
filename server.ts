import express, { Request, Response } from "express";
import axios from "axios";
import qs from "qs";
import dotenv from "dotenv";
import path from "path";
dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.get("/api/attendance", async (req: Request, res: Response) => {
  const data = qs.stringify({
    grant_type: "password",
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
  });

  const config = {
    method: "get",
    maxBodyLength: Infinity,
    url: process.env.URL,
    headers: {
        Authorization: process.env.AUTH_TOKEN,
        Cookie: process.env.COOKIE,
        "X-Wb": "1",
        Sessionid: process.env.SESSION_ID,
        "X-Contextid": process.env.X_CONTEXT_ID,
        "X-Userid": process.env.X_USER_ID,
        X_token: process.env.X_TOKEN,
        "X-Rx": process.env.X_RX,
    },
    data: data,
  };

  try {
    const response = await axios(config);

    const result = response.data;

    const harshAttendance = {
        Name : "Harsh",
        overallPercentage: result.stdSubAtdDetails.overallPercentage,
        overallPresent : result.stdSubAtdDetails.overallPresent,
        overallLecture : result.stdSubAtdDetails.overallLecture,
        Subject : result.stdSubAtdDetails.subjects.map((item : any) => {
          return {
            Name : item.name,
            PercentageAttendance : `${item.percentageAttendance} %`,
            TotalAttendance : item.totalLeactures,
            PresentAttendance : item.presentLeactures
          }
        }),
        attendanceData : result.attendanceData.reverse().map((item : any) => {
            return {
                Subject : item.subjectName,
                Absent: new Date(item.absentDate).toLocaleDateString()
            }
        }),
    }
    res.status(200).json(harshAttendance);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ message: "Failed to fetch data", error: error });
  }
});

app.get("/", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
