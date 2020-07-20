const axios = require('axios');
const parseString = require('xml2js').parseString;
const qs = require('qs');

var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1; 
var yyyy = today.getFullYear();
if(dd<10) 
{
    dd='0'+dd;
} 
if(mm<10) 
{
    mm='0'+mm;
} 
today = mm+'/'+dd+'/'+yyyy;

let currentTime = new Date().toLocaleTimeString('en-US', { hour: 'numeric', hour12: true, minute: 'numeric' });
let currentTimeSliced = currentTime.replace(' ', '')

let handler = function() {
var xmlBodyStr = `request=<?xml version="1.0"?>
<Trans>
<Header>
    <FmtType>ClientWeb</FmtType>
    <FmtVer>1.0.0</FmtVer>
    <Uid>A7FEDD8B-BF2C-4D63-917D-4C1130ABFE4E</Uid>
    <Client>73</Client>
    <ClientCode>2EC26589-258A-448E-A1DA-AA0F443C5152</ClientCode>
    <Location>1</Location>
    <Server>123</Server>
    <TransDate>${today}</TransDate>
    <TransTime>${currentTimeSliced}</TransTime>
    <POSSerial>12345</POSSerial>
</Header>
<Requests>
<SvInquiry>
<CardNbr>
    2073009300187576
</CardNbr>
</SvInquiry>
</Requests>
</Trans>`;

// console.log(xmlBodyStr)

var config = {
 headers: {'Content-Type': 'application/x-www-form-urlencoded'}
};
 axios.post('http://test.portal.custcon.com/Partner/ProcessXml', xmlBodyStr, config).then(res => {
    console.log(res.data)
}).catch(err => {
    err
    console.log('err')
});
};    


handler()


// console.log(today)


{/* <SvInquiry>
<CardNbr>
    2073009300187576
</CardNbr>
</SvInquiry>  */}