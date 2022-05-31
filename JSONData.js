import { BCKtemplate } from "./tables/BACKUPTemplate.js";
import { MKtemplate } from "./tables/MKAlarmsTemplate.js";


export async function mainJSON(){
    var testMK = [
        {
            "serverId": "BS-DTH-ENC8",
            "severity": "critical",
            "date": "2022-02-28T12:47:03.648Z",
            "label": "Input video still image",
            "additionalInfo": "Input video still image for service=02 TR - (5.13) - Tiankov Folk;inputVideo=Video_01;sdt=Tiankov Folk",
            "serviceName": "02 TR - (5.13) - BTV",
        },
        {
            "serverId": "BS-DTH-ENC8",
            "severity": "minor",
            "date": "2022-02-28T12:47:03.648Z",
            "label": "Input video still image",
            "additionalInfo": "Input video still image for service=02 TR - (5.13) - Tiankov Folk;inputVideo=Video_01;sdt=Tiankov Folk",
            "serviceName": "02 TR - (5.13) - BTV",
        },
        {
            "serverId": "BS-DTH-ENC8",
            "severity": "minor",
            "date": "2022-02-28T12:47:03.648Z",
            "label": "Input video still image",
            "additionalInfo": "Input video still image for service=02 TR - (5.13) - Tiankov Folk;inputVideo=Video_01;sdt=Tiankov Folk",
            "serviceName": "02 TR - (5.13) - BTV",
        },
    ]
    
    var testBackups = [
        {
            'serviceName': "02 TR - (5.13) - Tiankov Folk",
            'serverID': 'ENC1234',
            'source0': 'source 0',
            'source1': 'source 1',
        },
        {
            'serviceName': "02 TR - (5.13) - BTV",
            'serverID': 'ENC1234',
            'source0': 'source 0',
            'source1': 'source 1',
        },
        {
            'serviceName': "02 TR - (5.13) - Tiankov Folk",
            'serverID': 'ENC1234',
            'source0': 'source 0',
            'source1': 'source 1',
        },
        {
            'serviceName': "02 TR - (5.13) - Tiankov Folk",
            'serverID': 'ENC1234',
            'source0': 'source 0',
            'source1': 'source 1',
        },
        {
            'serviceName': "02 TR - (5.13) - Tiankov Folk",
            'serverID': 'ENC1234',
            'source0': 'source 0',
            'source1': 'source 1',
        },
        {
            'serviceName': "02 TR - (5.13) - Tiankov Folk",
            'serverID': 'ENC1234',
            'source0': 'source 0',
            'source1': 'source 1',
        },
        {
            'serviceName': "02 TR - (5.13) - Tiankov Folk",
            'serverID': 'ENC1234',
            'source0': 'source 0',
            'source1': 'source 1',
        },
        {
            'serviceName': "02 TR - (5.13) - Tiankov Folk",
            'serverID': 'ENC1234',
            'source0': 'source 0',
            'source1': 'source 1',
        },
        {
            'serviceName': "02 TR - (5.13) - Tiankov Folk",
            'serverID': 'ENC1234',
            'source0': 'source 0',
            'source1': 'source 1',
        },
    ]

    var test2 = [
        {
            "alarmId": "alarm.capture.videoblackout",
            "objectId": "liveEncodings/9afee2e618684dfbbbff99874354b169/inputVideo/Video_01",
            "publisherId": "BS-DTH-ENC4",
            "serverId": "BS-DTH-ENC4",
            "severity": "minor",
            "date": "2022-03-06T12:35:27.264Z",
            "label": "Input video still image",
            "additionalInfo": "Input video still image for service=07 TR - (7.7) - Bulgaria 24;inputVideo=Video_01;sdt=Bulgaria 24",
            "processingType": "liveEncodings",
            "serviceId": "9afee2e618684dfbbbff99874354b169",
            "serviceName": "07 TR - (7.7) - Bulgaria 24",
            "failoverTrigger": false
        }
    ]
    
    var templatesArr = [];
    
    async function getJSON(url) {
        var response = await fetch(url);
        if (response.ok) {
            var resultArray = await response.json();
            return resultArray
        }
    }
    
    
    async function writeTableJSON(template, url) {
        // var response = url;
        var response = await getJSON(url);
        // visualize if needed
        if (response.length > 0) {
            templatesArr.push(template(response, formatTime));
        }
    }
    
    
    function formatTime(Timestamp) {
        var dt = new Date(Timestamp);
        var month = dt.getMonth() + 1;
        var day = dt.getDate();
        var hours = dt.getHours();
        var minutes = dt.getMinutes();
        var seconds = dt.getSeconds();
        if (month < 10) { month = '0' + month; };
        if (day < 10) { day = '0' + day; };
        if (hours < 10) { hours = '0' + hours; };
        if (minutes < 10) { minutes = '0' + minutes; };
        if (seconds < 10) { seconds = '0' + seconds; };
        return month + "." + day + " " + hours + ":" + minutes + ":" + seconds;
    };
    
    
    await writeTableJSON(MKtemplate, 'https://alarms.dth.bulsat.com/alarms/mk', 'dthalarms');
    writeTableJSON(BCKtemplate, 'https://alarms.dth.bulsat.com/enc_source_status', 'backupsTable');
    
    
    // await writeTableJSON(MKtemplate, testMK, 'dthalarms'); // testing
    // await writeTableJSON(BCKtemplate, testBackups, 'backupsTable'); // testing
    return templatesArr;
}
