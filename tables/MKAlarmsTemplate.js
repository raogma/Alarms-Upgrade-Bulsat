import { html } from "../node_modules/lit-html/lit-html.js";

export function MKtemplate(resultArray, formatTime){
    return html`
    <div class="wrappers" id="dthalarms">
        <h5>CHANNELS</h5>
        <table class="table table-sm table-responsive table-striped">
            <thead>
                <tr class="table-sm ${resultArray.severity}" style="color: white">
                    <th>Date</th>
                    <th>Server</th>
                    <th>Service</th>
                    <th>Label</th>
                </tr>
            </thead>

            <tbody>
            ${resultArray.map(x => html`
                <tr class="${x.severity}">
                    <td class="date">${formatTime(x.date)}</td>
                    <td>${x.serverId}</td>
                    <td>${x.serviceName}</td>
                    <td>${x.label}</td>
                </tr>
            `)}
            </tbody>
        </table>
    </div>`
}