import express, { Request, Response } from "express";
import axios from "axios";
import qs from "qs";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = 3000;

app.get("/", async (req: Request, res: Response) => {
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
        overallPercentage: result.stdSubAtdDetails.overallPercentage,
        overallPresent : result.stdSubAtdDetails.overallPresent,
        overallLecture : result.stdSubAtdDetails.overallLecture,
        // attendanceData : result.attendanceData.map((item : any) => {
        //     return {
        //         Subject : item.subjectName,
        //         isAbsent : item.isAbsent === true && item.isAbsent
        //     }
        // })
    }
    res.status(200).json(harshAttendance);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ message: "Failed to fetch data", error: error });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
