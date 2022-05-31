import { html } from "../node_modules/lit-html/lit-html.js";

export function template(resultArray, tableName, tableColor, tableId){
    return html`
    <div class="wrappers" id=${tableId}>
        <h5>${tableName}</h5>
        <table class="table table-sm table-responsive table-striped">
            <thead>
                <tr style="color:white">
                    <th>Date</th>
                    <th>Channel</th>
                    <th>Description</th>
                </tr>
            </thead>
            <tbody>
            ${resultArray.map(x => html`
                <tr class="${tableColor}">
                    <td class="date">${x.getAttribute("time")}</td>
                    <td>${x.getAttribute("stream")}</td>                   
                    <td>${x.getAttribute("description")}</td>
                </tr>
            `)}
            </tbody>
        </table>
    </div>`
}