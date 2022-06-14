import React from 'react';
import { Document, Page, PDFViewer, StyleSheet, Text, View } from '@react-pdf/renderer';


const styles = StyleSheet.create({
    body: {
        paddingTop: 35,
        paddingBottom: 65,
        paddingHorizontal: 30
    },
    title: {
        fontSize: 24,
        paddingVertical: 10,
        textAlign: 'center'
    },
    name: {
        fontSize: 12,
        paddingVertical: 10,
        textAlign: 'center'
    },
    date: {
        fontSize: 14,
        textAlign: 'center'
    },
    table: {
        paddingVertical: 10
    },
    th: {
        fontSize: 14,
        fontFamily: 'Times-Bold'
    },
    tr: {
        fontSize: 14,
        fontFamily: 'Times-Roman'
    }
});


const RecordItemPDF = ({ checklist, recordedOnDate, user }) => {
    
    return (
        <PDFViewer height='100%'>
            <Document>
                <Page style={styles.body}>
                    <Text style={styles.title}>
                        Rickshaw Safety Checklist
                    </Text>
                    <Text style={styles.name}>
                        {user.name}
                    </Text>
                    <Text style={styles.date}>
                        {recordedOnDate}
                    </Text>
                    <View style={styles.table}>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ flex: 6.5 }}>
                                <Text style={styles.th}>Description</Text>
                            </View>
                            <View style={{ flex: 1.2 }}>
                                <Text style={styles.th}>Status</Text>
                            </View>
                            <View style={{ flex: 5 }}>
                                <Text style={styles.th}>Comments</Text>
                            </View>
                        </View>
                        {checklist.map((element, i) => 
                        <View style={{ flexDirection: 'row' }} key={i}>
                            <View style={{ flex: 6.5 }}>
                                <Text style={styles.tr}>{element.description}</Text>
                            </View>
                            <View style={{ flex: 1.2 }}>
                                <Text style={styles.tr}>{element.status}</Text>
                            </View>
                            <View style={{ flex: 5 }}>
                                <Text style={styles.tr}>{element.comments}</Text>
                            </View>
                        </View>
                        )}
                    </View>
                </Page>
            </Document>
        </PDFViewer>
    )
};

export default RecordItemPDF;