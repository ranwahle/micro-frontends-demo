import {MicroApp} from './model/micro-app';
import {AreaConfig} from './model/area-config';
import {FrontendRouter} from '../frontend-router';
import {EventManager} from './event-manager';

const anyWindow = window: any;

/**
 * This class configure micro apps
 */
export class MicroAppsManager {

    private areaConfigOptions: AreaConfig;

    configuraArea(areaConfig: AreaConfig) {
        this.areaConfigOptions = areaConfig;
    }

    initApps(microApps: MicroApp[]) {
        const router = new FrontendRouter();
        microApps.forEach(app => {
            router.add(app.name, () => this.showFrame(app))
            this.createFrame(app);
        })
        anyWindow.microAppsEventsManager = new EventManager();
    }

    showFrame(app: MicroApp) {

    }

    createFrame(app: MicroApp) {
        if (!this.areaConfigOptions) {
            throw({message: 'please set area configuration by using configureArea method' })
        }
        const frameArea = document.querySelector(this.areaConfigOptions.frameAreaSelector);

        if (!frameArea) {
            const error = {message: `No element found by the selector "${this.areaConfigOptions.frameAreaSelector}"`};
            console.error('error init app', error)
            throw(error);
        }

        const frame = document.createElement('iframe');
        frame.id = `micro-app-frame-${app.name}`;
        frame.className = 'micro-app-frame';
        if (this.areaConfigOptions.frameContentFillingMethod === 'SourceUrl' ) {
            frame.src =  app.entryUrl;
                   } else {
            this.fetchContent(app, frame);
        }
        frameArea.appendChild(frame);


    }


    private fetchContent(app: MicroApp, frame) {
        fetch(app.entryUrl).then((response) => {
            response.text().then(content => {
                content = content.replace('<head>', `<head><base href="${app.entryUrl}">`)
                const frameDocument = frame.contentWindow.document;

                frameDocument.write(content)
                frameDocument.close();
            })
        }, err => {
            console.error(`Unable to fetch ${app.entryUrl}`, err)
        })
    }


}