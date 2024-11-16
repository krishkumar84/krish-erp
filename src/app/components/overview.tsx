import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface OverviewProps {
  data: {
    overallPercentage: number
    overallPresent: number
    overallLecture: number
    Subject: Array<{
      Name: string
      PercentageAttendance: string
    }>
  }
}

export default function Overview({ data }: OverviewProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard title="Overall Attendance" value={`${data.overallPercentage}%`} />
        <StatCard title="Total Subjects" value={data.Subject.length.toString()} />
        <StatCard
          title="Present / Total Lectures"
          value={`${data.overallPresent} / ${data.overallLecture}`}
        />
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Subject-wise Attendance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {data.Subject.map((subject) => (
              <div key={subject.Name} className="flex items-center">
                <div className="w-1/4 truncate" title={subject.Name}>
                  {subject.Name}
                </div>
                <div className="w-2/4 h-2 bg-[#333333] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#0070f3] rounded-full"
                    style={{ width: subject.PercentageAttendance }}
                  ></div>
                </div>
                <div className="ml-4 w-16 text-right">{subject.PercentageAttendance}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function StatCard({ title, value }: { title: string; value: string }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
      </CardContent>
    </Card>
  )
}