import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

interface Absence {
  Subject: string
  Absent: string
}

interface AbsencesProps {
  absences: Absence[]
}

export default function Absences({ absences }: AbsencesProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Absences</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Subject</TableHead>
              <TableHead>Absent Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {absences.map((absence, index) => (
              <TableRow key={index}>
                <TableCell>{absence.Subject}</TableCell>
                <TableCell>{absence.Absent}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}