import React from 'react';
import { Document, Page, StyleSheet } from '@react-pdf/renderer';
import {Table, TableBody, TableHeader, DataTableCell, TableCell} from '@david.kucsai/react-pdf-table';
import { database } from "../../firebase";
import { format } from "date-fns";

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4',
    width: 60
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  }
});

const exportAttendance = (courseName) => {
    var attendance = [];

    database
      .ref('attendance/')
      .once('value')
      .then(snapshot => {
          snapshot.forEach((child) => {
              let dict = child.val()
              if (dict["course"] == courseName && dict["time"] == (new Date()).toString()){
                attendance.push(dict)
              }
          });
      });

    return attendance;
}

function getParsedDate(strDate){
  var date = new Date(strDate);

  var formattedDate = format(date, "MMMM do, yyyy HH:mm:ss");
  return formattedDate;
}


const AttendancePDF = ({data}) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Table data={data}>
          <TableHeader>
            <TableCell>
              Moodle Account
            </TableCell>
            <TableCell>
              Name
            </TableCell>
            <TableCell>
              Group
            </TableCell>
  
            <TableCell>
              Time
            </TableCell>
          </TableHeader>

          <TableBody>
            <DataTableCell getContent={(r) => r.moodle_account}/>
            <DataTableCell getContent={(r) => r.name}/>
            <DataTableCell getContent={(r) => r.group}/>
            <DataTableCell getContent={(r) => getParsedDate(r.time)}/>
          </TableBody>
        </Table>
    </Page>
  </Document>
);

export default AttendancePDF;