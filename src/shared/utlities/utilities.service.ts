import { Injectable } from "@angular/core";

export enum ComponentCode {
    PAGINATOR = 'pagination',
    TABLE = 'table',
    REFRESH_BTN = 'refresh-btn',
    LOADING_BTN = 'loading-btn',
}

@Injectable({
    providedIn: 'root'
})

export class UtilitiesService {

    fetchAppropriateStyles(component: ComponentCode) {
        switch (component) {
            case ComponentCode.PAGINATOR: return this.getPaginatorStyles();
            case ComponentCode.TABLE: return this.getTableStyles();
            case ComponentCode.REFRESH_BTN: return this.getRefreshBtnStyles();
            case ComponentCode.LOADING_BTN: return this.getLoadingBtnStyles()
        }
    }

    private getRefreshBtnStyles() {
        return { 'width': '4.25rem', 'aspect-ratio': '1', 'border-radius': '0.6rem' };
    }

    private getTableStyles() {
        return {
            'display': 'flex',
            'flex-direction': 'column',
            'justify-content': 'flex-start',
            'align-item': 'center',
            'gap': '0.8rem',
            'height': '100%',
            'overflow': 'auto',
        };
    }

    private getPaginatorStyles() {
        return {
            'height': 'auto',
            'padding': '0.5rem 1.25rem',
            'gap': '0.8rem',
        }
    }

    private getLoadingBtnStyles() {
        return { 'padding': '0.5rem 0.75rem', 'font-size': '1.6rem', 'display': 'flex', 'gap': '1.2rem', 'justify-content': 'center', 'align-items': 'center', 'cursor': 'pointer' }
    }
}
