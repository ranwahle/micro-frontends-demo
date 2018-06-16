import {MicroApp} from './model/micro-app';
import {AreaConfig} from './model/area-config';
import {FrontendRouter} from '../frontend-router';
import {EventManager} from './event-manager';

const anyWindow = window as any;

/**
 * This class configure micro apps
 */
export class MicroAppsManager {

    private areaConfigOptions: AreaConfig;
    private router : FrontendRouter;

    configuraArea(areaConfig: AreaConfig) {
        this.areaConfigOptions = areaConfig;
        this.router = FrontendRouter.getRouter();
    }

    initApps(microApps: MicroApp[]) {

        this.router.config({root: ''})
        microApps.forEach(app => {
            this.router.add(`${app.name}`, () => this.showFrame(app))
            this.createFrame(app);
        })
        this.router.add('', () => this.hideFrames())

        this.router.listen()

        anyWindow.microAppsEventsManager = new EventManager();
    }

    hideFrames() {
        const frames =  document.querySelectorAll('iframe.micro-app-frame');
        for (let index = 0; index < frames.length; index++) {

            frames[index].classList.remove('shown');
        }
    }

    showFrame(app: MicroApp) {
        console.log('Showing frame', app)
       this.hideFrames();
        document.querySelector(`#micro-app-frame-${app.name}`).classList.add('shown')
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