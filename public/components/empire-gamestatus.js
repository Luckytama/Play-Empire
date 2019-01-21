import {html, PolymerElement} from 'https://unpkg.com/@polymer/polymer/polymer-element.js';

/**
 * `empire-gamestatus`
 *
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class EmpireGamestatus extends PolymerElement {
    static get template() {
        return html`
      <style>

      </style>
            <div class="row col-md-12">
                <p class="game_status">Game Status: [[ status ]]</p>
            </div>
    `;
    }

    static get properties() {
        return {
            status: {
                type: String,
                value: 'empire-gamestatus',
            },
        };
    }
}

window.customElements.define('empire-gamestatus', EmpireGamestatus);