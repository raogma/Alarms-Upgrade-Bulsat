import { template } from './tables/STemplate.js';


export async function mainXML(){
	var args = [
		{
			'url': "https://alarms.dth.bulsat.com/s1/status",
			'tableName': 'BT-CM',
			'tableColor': 'MediumAquaMarine',
			'tableId': 's1',
			'docs': '',
		},
		{
			'url': "https://alarms.dth.bulsat.com/s2/status",
			'tableName': 'BT-MK',
			'tableColor': 'Olive',
			'tableId': 's2',
			'docs': '',
		},
		{
			'url': "https://alarms.dth.bulsat.com/s3/status",
			'tableName': 'Sources',
			'tableColor': 'Crimson',
			'tableId': 's3',
			'docs': '',
		},
		{
			'url': "https://alarms.dth.bulsat.com/s4/status",
			'tableName': 'BT-SAT',
			'tableColor': 'LightGreen',
			'tableId': 's4',
			'docs': '',
		},
		{
			'url': "https://alarms.dth.bulsat.com/s5/status",
			'tableName': 'SAT RECEIVERS',
			'tableColor': 'LightGrey',
			'tableId': 's5',
			'docs': '',
		},
		{
			'url': "https://alarms.dth.bulsat.com/s6/status",
			'tableName': 'ENC201',
			'tableColor': 'LightPink',
			'tableId': 's6',
			'docs': '',
		},
		{
			'url': "https://alarms.dth.bulsat.com/s7/status",
			'tableName': 'ENC202',
			'tableColor': 'DullPink',
			'tableId': 's7',
			'docs': '',
		},
	]
	
	var templatesArr = []
	
	async function fillArgsXML() {
		await Promise.all(args.map(async function(x, i) {
			var response = await fetch(x.url);
			if (response.status === 200){
				var strRes = await response.text();
				var xml = new window.DOMParser().parseFromString(strRes, 'text/xml');
				args[i]['docs'] = xml;
			}
		}))
	};
	
	async function getTestXML(){
		var response = await fetch('./testXML.xml');
		var strRes = await response.text();
		var xml = new window.DOMParser().parseFromString(strRes, 'text/xml');
		return xml;
	}
	
	
	function writeTableXML() {
		args.map(x => {			
			// var xml = await getTestXML(); // testing
			if (x.docs){
				var alarms = x.docs.getElementsByTagName("alarmLine");
				var filteredArr = [];
			
				for (var alarm of alarms) {
					var status = alarm.getAttribute("status"); 
					if (status && (alarm.getAttribute("type") !== "SYS")) {
						if (status === "Cleared" || status === 'Event') {continue}
						filteredArr.push(alarm);
					}
				}
				if(filteredArr.length > 0){
					templatesArr.push(template(filteredArr, x.tableName, x.tableColor, x.tableId)); // template needs testing on iteration
					filteredArr = [];
				}
			}
		})
	}
	await fillArgsXML()
	writeTableXML();

	return templatesArr;
}