import {html} from '../node_modules/lit-html/lit-html.js'

export function BCKtemplate(resultArray){
    return html`
    <div class="wrappers" id="backupsTable">
        <h5>BACKUPS</h5>
        <table class="table table-sm table-responsive table-striped table-warning">
            <thead>
                <tr>
                    <th>CHAN</th>
                    <th>ENC</th>
                    <th>MAIN Source</th>
                    <th>BACKUP Source</th>
                </tr>
            </thead>
                
            <tbody>
                ${resultArray.map(x => html`
                <tr>
                    <td>${x.serviceName}</td>
                    <td>${x.serverID}</td>
                    <td>${x.source0}</td>
                    <td>${x.source1}</td>
                </tr>
                `)}
            </tbody>
        </table>
    </div>`
}