import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import {Table, TableBody, TableHeader, DataTableCell, TableCell} from '@david.kucsai/react-pdf-table';
import { database, auth } from "../../firebase";

// Create styles
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
    console.log(courseName);
    var attendance = []
    database
        .ref('attendance/')
        .once('value')
        .then(snapshot => {
            snapshot.forEach((child) => {
                let dict = child.val()
                if (dict["course"] == courseName){
                  attendance.push(dict)
                }
            });
            console.log("data");
            console.log(attendance)
        });
    //console.log("data");
   // console.log(this.state.attendance);
    return attendance;
}

// Create Document Component
const AttendancePDF = ({data}) => (
  <Document>
    <Page size="A4" style={styles.page}>
    <Table data={data}>
            <TableHeader>
                <TableCell>
                    Moodle Account
                </TableCell>
                <TableCell>
                    Time
                </TableCell>
            </TableHeader>
            <TableBody>
                <DataTableCell getContent={(r) => r.moodle_account}/>
                <DataTableCell getContent={(r) => r.time}/>
            </TableBody>
        </Table>

    </Page>
  </Document>
);

export default AttendancePDF;